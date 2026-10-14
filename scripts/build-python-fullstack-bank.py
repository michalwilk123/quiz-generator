"""Build the requested Polish Python PG fullstack curriculum from reviewed banks."""
import copy
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PYTHON = "Python"
ARCH = "DDD, design i architektura"
FRAMEWORKS = "Frameworki i biblioteki Python"
FRONTEND = "React i TypeScript"
EXTRAS = "Bazy danych i technologie dodatkowe"
weights = {PYTHON: 30, ARCH: 25, FRAMEWORKS: 20, FRONTEND: 15, EXTRAS: 10}
questions = []
backend = json.loads((ROOT / "src/quizes/python2.json").read_text())["quiz_elements"]
for original in backend:
    if original["type"] == "long_open":
        continue
    q = copy.deepcopy(original)
    section = q["section"]
    if section.startswith("Python —"):
        group = PYTHON
    elif section in {"DDD", "Clean Architecture", "Architektura heksagonalna", "Wzorce projektowe"}:
        group = ARCH
    elif section in {"Django i DRF", "Django Admin", "Wagtail"}:
        group = FRAMEWORKS
    elif section == "Wdrożenia i testowanie" and any(
        token in q["question"] for token in ["pytest", "billing.py", "DRF.", "Django 5.2"]
    ):
        group = FRAMEWORKS
    elif section == "Code review i współpraca" and "Architectural Decision Record" in q["question"]:
        group = ARCH
    else:
        group = EXTRAS
    q["section"] = group
    questions.append(q)
original_bank = json.loads((ROOT / "src/quizes/python.json").read_text())
for original in original_bank["quiz_elements"]:
    if original.get("section") == "React i JavaScript":
        q = copy.deepcopy(original)
        q["section"] = FRONTEND
        questions.append(q)

# Public interview prompts, translated and adapted to the app's choice format.
# The wrong alternatives and technical explanations are our editorial additions.
TS_DOCS = "https://www.typescriptlang.org/docs/handbook/"
GFE = "https://github.com/greatfrontend/top-reactjs-interview-questions"
READY = "https://github.com/readytodev-pro/frontend-interview-questions"
TS_LIST = "https://github.com/aershov24/typescript-interview-questions/blob/master/README.md"
TS_DEV = "https://github.com/Devinterview-io/typescript-interview-questions"
TS_SENIOR = "https://www.greatfrontend.com/blog/typescript-interview-questions-for-senior-frontend-developers"

# Add provenance only for topics actually located in the public lists.
for q in questions:
    family = q["family"]
    stem = q["question"]
    if q["section"] == FRONTEND:
        q["interview_sources"] = [READY] if family == "python-223" else [GFE]
    elif family == "python2-core-035":
        q["interview_sources"] = [
            "https://coderpad.io/interview-questions/python-interview-questions/",
            "https://github.com/Devinterview-io/python-interview-questions",
        ]
    elif family == "python2-core-033":
        q["interview_sources"] = ["https://coderpad.io/interview-questions/python-interview-questions/"]
    elif family == "python2-core-086":
        q["interview_sources"] = ["https://github.com/chernysh/python-interview-questions"]
    elif family == "python2-core-053":
        q["interview_sources"] = ["https://github.com/chernysh/python-interview-questions", "https://github.com/Devinterview-io/python-interview-questions"]
    elif family == "python2-core-099":
        q["interview_sources"] = ["https://coderpad.io/interview-questions/python-interview-questions/"]
    elif q["section"] == FRAMEWORKS and any(token in stem for token in ["QuerySet", "middleware", "N+1", "ManyToManyField"]):
        q["interview_sources"] = ["https://github.com/Devinterview-io/django-interview-questions"]
    elif family in {"python2-ops-001", "python2-ops-007", "python2-ops-008", "python2-ops-012", "python2-ops-015"}:
        q["interview_sources"] = ["https://coderpad.io/interview-questions/postgresql-interview-questions/"]
    elif q["section"] == FRAMEWORKS and "FastAPI. Do czego służy Depends" in stem:
        q["interview_sources"] = ["https://github.com/AliRezaei-Code/FastAPI-interview-questions"]
    elif family in {"python2-web-033", "python2-web-034", "python2-web-037", "python2-web-038", "python2-arch-003"}:
        q["interview_sources"] = ["https://github.com/Devinterview-io/domain-driven-design-interview-questions"]


def interview(stem, options, correct, explanation, documentation, evidence):
    questions.append({
        "question": stem, "type": "one_choice", "answers": options,
        "correct_answer": options[correct], "explanation": explanation,
        "sources": [documentation], "interview_sources": evidence,
        "section": FRONTEND, "family": f"python-fullstack-interview-ts-{len(questions) - 296:02}",
        "origin": "variant", "difficulty": "medium",
    })

interview("TypeScript a JavaScript: co przede wszystkim dodaje TypeScript?",
    ["Statyczną kontrolę typów, która pomaga wykrywać błędy przed uruchomieniem.", "Automatyczną walidację każdej odpowiedzi API w runtime.", "Obowiązkowy nowy silnik przeglądarki do uruchamiania JavaScript.", "Automatyczną zamianę aplikacji synchronicznej na asynchroniczną."], 0,
    "TypeScript rozszerza JavaScript o analizę typów. Adnotacje typów nie zastępują walidacji danych podczas działania aplikacji.", TS_DOCS + "typescript-in-5-minutes.html",
    [TS_DEV, TS_LIST])
interview("TypeScript. Czym różnią się interface i alias type?",
    ["Tylko interface może opisywać pola obiektu.", "Interface wspiera scalanie deklaracji, a type może bezpośrednio definiować np. unię typów.", "Type waliduje JSON w runtime, a interface nie.", "Interface jest zawsze emitowany jako klasa JavaScript."], 1,
    "Oba mogą opisywać strukturę obiektu. Interface może być rozszerzany i scalany; alias type pozwala również nazwać unię. Żaden nie jest walidatorem runtime.", TS_DOCS + "2/everyday-types.html",
    [TS_LIST + "#q33-what-is-the-difference-between-interface-vs-type-statements-", READY + "#what-is-the-difference-between-interface-and-type"])
interview("TypeScript. Jaka jest różnica między any a unknown?",
    ["unknown jest aliasem string.", "any wymaga sprawdzenia typeof przed każdym użyciem, a unknown nie.", "any omija kontrolę typu, a unknown wymaga zawężenia lub asercji przed użyciem jako konkretnego typu.", "unknown automatycznie waliduje schemat wszystkich obiektów."], 2,
    "Oba mogą przyjąć różne wartości, ale unknown ogranicza ich używanie bez ustalenia typu. Asercja nie sprawdza prawdziwej struktury danych w runtime.", TS_DOCS + "2/functions.html",
    [READY + "#what-is-unknown-vs-any", "https://github.com/crisdux/paracetamol.ts"])
interview("TypeScript. Do czego służą typy generyczne (generics)?",
    ["Do przekształcenia każdego argumentu w string.", "Do zwalniania kompilatora z kontroli wszystkich typów.", "Do walidacji schematu JSON bez dodatkowego kodu.", "Do tworzenia wielokrotnie używalnych funkcji i typów z zachowaniem zależności między typami."], 3,
    "Parametry typów pozwalają wyrazić np. związek wejścia i wyniku funkcji. Nie są konwersją danych ani walidacją runtime.", TS_DOCS + "2/generics.html",
    [READY + "#what-are-generics", TS_LIST])
interview("TypeScript. Co oznacza unia typów, np. string | number?",
    ["Wartość może należeć do jednego z typów składowych.", "Wartość musi jednocześnie mieć wszystkie właściwości obu typów.", "Obie wartości są automatycznie sklejane w string.", "Typ ma jedną stałą wartość wybraną przez kompilator."], 0,
    "Unia opisuje alternatywy typów. Przed operacją wymagającą konkretnego typu często trzeba zawęzić unię.", TS_DOCS + "2/everyday-types.html",
    [READY + "#what-is-a-union-type", "https://github.com/crisdux/paracetamol.ts"])
interview("TypeScript. Na czym polega unia dyskryminowana używana do modelowania stanów UI?",
    ["Na zastąpieniu wszystkich pól typem any.", "Na rozróżnieniu wariantów wspólnym polem o różnych wartościach literalnych, np. status.", "Na przechowywaniu wszystkich wariantów równocześnie w jednej tablicy.", "Na automatycznej walidacji odpowiedzi serwera przez samą deklarację typu."], 1,
    "Pole status lub kind pozwala zawęzić wariant i bezpiecznie używać jego pól. Typowa reprezentacja oddziela stan ładowania, sukces i błąd.", TS_DOCS + "2/narrowing.html",
    [TS_SENIOR, READY + "#what-is-a-union-type"])
interview("TypeScript. Do czego służą utility types takie jak Partial, Pick i Omit?",
    ["Do modyfikacji danych w bazie bez zapytania SQL.", "Do automatycznego usuwania właściwości obiektów w runtime.", "Do budowania nowych typów na podstawie istniejących, np. wyboru lub pomijania pól.", "Do zastąpienia kompilacji TypeScript testami jednostkowymi."], 2,
    "Partial oznacza pola jako opcjonalne, Pick wybiera wskazane właściwości, a Omit je pomija. Są to operacje na typach, a nie na obiektach w runtime.", TS_DOCS + "utility-types.html",
    [READY + "#what-are-utility-types", TS_SENIOR])
interview("TypeScript. Co oznacza wnioskowanie typu (type inference)?",
    ["Sprawdzenie struktury danych pobranych z API podczas działania programu.", "Zamianę wszystkich niezadeklarowanych typów na any.", "Generowanie dokumentacji OpenAPI na podstawie nazwy zmiennej.", "Ustalenie typu przez kompilator na podstawie wartości i kontekstu bez jawnej adnotacji."], 3,
    "Kompilator może wywnioskować typ z inicjalizacji lub użycia. Brak jawnej adnotacji nie oznacza wyłączenia kontroli typów.", TS_DOCS + "typescript-in-5-minutes.html",
    [TS_DEV + "#8-what-does-type-inference-mean-in-the-context-of-typescript", TS_LIST])

# Curated senior scenarios replace the selected families only in this bank.
# Keep the original Python/Python 2 banks and stable family identities intact.
curation = json.loads((ROOT / "scripts/python-fullstack-senior.json").read_text())
selected = curation["selected_families"]
overrides = curation["overrides"]
by_family = {q["family"]: q for q in questions}
assert len(selected) == len(set(selected)), "Duplicate curated families"
assert set(overrides) == set(selected), "Every selected family needs a reviewed scenario"
assert set(selected) <= set(by_family), "Unknown curated family"
questions = []
for family in selected:
    q = by_family[family]
    # Remove answer fields left over from the original question type.
    for field in ("correct_answer", "correct_answers"):
        q.pop(field, None)
    q.update(overrides[family])
    assert q["correct_answer"] in q["answers"]
    assert len(q["answers"]) == len(set(q["answers"])) == 4
    questions.append(q)

bank = {"name": "Programowanie Python PG — Fullstack (Senior)", "section_weights": weights, "quiz_elements": questions}
assert len({q['question'] for q in questions}) == len(questions)
assert len({q['family'] for q in questions}) == len(questions)
(ROOT / "src/quizes/python-fullstack.json").write_text(json.dumps(bank, ensure_ascii=False, indent=2) + "\n")
if __name__ == "__main__":
    from collections import Counter
    print(len(questions), dict(Counter(q['section'] for q in questions)))
