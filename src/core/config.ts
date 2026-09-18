export const QUESTION_TYPES = [
  "short_open",
  "long_open",
  "multi_choice",
  "one_choice",
] as const;
export type QuestionType = (typeof QUESTION_TYPES)[number];
export interface ExamConfig {
  version: 1;
  subjects: { id: string; weight: number }[];
  questionCount: number | "all";
  durationMinutes: number | null;
  pageSize: "auto" | "all" | 1 | 5 | 10 | 20;
  questionTypes: QuestionType[];
  choiceScoring: "strict" | "partial";
  wrongAnswerPenalty: number;
  writtenGrading: "automatic" | "manual";
  useQuestionWeights: boolean;
}
export function defaultConfig(subjectId = "isp"): ExamConfig {
  return {
    version: 1,
    subjects: [{ id: subjectId, weight: 1 }],
    questionCount: 5,
    durationMinutes: null,
    pageSize: "auto",
    questionTypes: [...QUESTION_TYPES],
    choiceScoring: "strict",
    wrongAnswerPenalty: 0,
    writtenGrading: "automatic",
    useQuestionWeights: false,
  };
}
export function validateConfig(value: unknown): ExamConfig {
  const c = value as ExamConfig;
  if (!c || c.version !== 1)
    throw new Error("Ta wersja konfiguracji testu nie jest obsługiwana.");
  if (
    !Array.isArray(c.subjects) ||
    !c.subjects.length ||
    c.subjects.some(
      (s) =>
        !s ||
        typeof s.id !== "string" ||
        !s.id ||
        !Number.isFinite(s.weight) ||
        s.weight <= 0,
    ) ||
    new Set(c.subjects.map((s) => s.id)).size !== c.subjects.length
  )
    throw new Error("Wybierz przynajmniej jeden quiz z dodatnią wagą.");
  if (
    c.questionCount !== "all" &&
    (!Number.isInteger(c.questionCount) ||
      c.questionCount < 1 ||
      c.questionCount > 10000)
  )
    throw new Error("Wybierz od 1 do 10 000 pytań.");
  if (
    c.durationMinutes !== null &&
    (!Number.isFinite(c.durationMinutes) ||
      c.durationMinutes < 1 ||
      c.durationMinutes > 30)
  )
    throw new Error("Limit czasu musi wynosić od 1 do 30 minut.");
  if (!["auto", "all", 1, 5, 10, 20].includes(c.pageSize))
    throw new Error("Nieprawidłowa liczba pytań na stronie.");
  if (
    !Array.isArray(c.questionTypes) ||
    !c.questionTypes.length ||
    c.questionTypes.some((t) => !QUESTION_TYPES.includes(t))
  )
    throw new Error("Wybierz przynajmniej jeden rodzaj pytań.");
  if (
    !["strict", "partial"].includes(c.choiceScoring) ||
    !["automatic", "manual"].includes(c.writtenGrading) ||
    typeof c.useQuestionWeights !== "boolean" ||
    !Number.isFinite(c.wrongAnswerPenalty) ||
    c.wrongAnswerPenalty < 0 ||
    c.wrongAnswerPenalty > 1
  )
    throw new Error("Nieprawidłowe ustawienia oceniania.");
  return structuredClone(c);
}
// Short keys keep a single shareable value compact; v1 never stores bank indexes or question counts from the files.
export function encodeConfig(config: ExamConfig): string {
  const c = validateConfig(config);
  const compact = [
    1,
    c.subjects.map((s) => [s.id, s.weight]),
    c.questionCount,
    c.durationMinutes,
    c.pageSize,
    c.questionTypes.map((t) => QUESTION_TYPES.indexOf(t)),
    c.choiceScoring === "partial" ? 1 : 0,
    c.wrongAnswerPenalty,
    c.writtenGrading === "manual" ? 1 : 0,
    c.useQuestionWeights ? 1 : 0,
  ];
  const bytes = new TextEncoder().encode(JSON.stringify(compact));
  return btoa(Array.from(bytes, (b) => String.fromCharCode(b)).join(""))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function decodeConfig(encoded: string): ExamConfig {
  try {
    if (encoded.length > 20000 || !/^[\w-]+$/.test(encoded)) throw new Error();
    const raw = encoded.replace(/-/g, "+").replace(/_/g, "/");
    const x = JSON.parse(
      new TextDecoder().decode(
        Uint8Array.from(atob(raw), (c) => c.charCodeAt(0)),
      ),
    );
    if (
      !Array.isArray(x) ||
      x.length !== 10 ||
      ![0, 1].includes(x[6]) ||
      ![0, 1].includes(x[8]) ||
      ![0, 1].includes(x[9])
    )
      throw new Error();
    return validateConfig({
      version: x[0],
      subjects: x[1].map(([id, weight]: [string, number]) => ({ id, weight })),
      questionCount: x[2],
      durationMinutes: x[3],
      pageSize: x[4],
      questionTypes: x[5].map((i: number) => QUESTION_TYPES[i]),
      choiceScoring: x[6] ? "partial" : "strict",
      wrongAnswerPenalty: x[7],
      writtenGrading: x[8] ? "manual" : "automatic",
      useQuestionWeights: !!x[9],
    });
  } catch {
    throw new Error(
      "Link konfiguracji jest nieprawidłowy lub używa nieobsługiwanej wersji.",
    );
  }
}
export function decodeLegacyConfig(
  subjectId: string,
  params: URLSearchParams,
): { config: ExamConfig; warnings: string[] } {
  const config = defaultConfig(subjectId);
  const warnings = [
    "Ten starszy link losuje teraz nowe pytania i automatycznie zapisuje postęp.",
  ];
  const options = params.getAll("conf");
  if (options.some((v) => !/^[0-7]$/.test(v)))
    throw new Error("Ten starszy link zawiera nieobsługiwane opcje.");
  const types = params.getAll("qtype");
  if (types.some((v) => !/^[0-3]$/.test(v)))
    throw new Error("Ten starszy link zawiera nieobsługiwane rodzaje pytań.");
  if (types.length)
    config.questionTypes = types.map((v) => QUESTION_TYPES[Number(v)]);
  const amount = params.get("amount");
  config.questionCount = !amount || amount === "All" ? "all" : Number(amount);
  config.choiceScoring = options.includes("3") ? "partial" : "strict";
  config.useQuestionWeights = true;
  config.pageSize = "all";
  if (options.includes("5"))
    warnings.push(
      "Dawny licznik upływu czasu zastąpiono opcjonalnym odliczaniem. Ten importowany test nie ma limitu czasu.",
    );
  warnings.push(
    "Odpowiedzi pisemne są teraz porównywane po normalizacji tekstu; długie odpowiedzi mogą otrzymać punkty częściowe za podobieństwo.",
  );
  return { config: validateConfig(config), warnings };
}
