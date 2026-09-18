// Only code fences and inline code are supported. Content is rendered as text,
// never HTML, so question files cannot inject markup or scripts.
export default function QuestionText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(```[^\n]*\n[\s\S]*?```)/g).map((part, index) => {
        if (part.startsWith("```")) {
          const code = part
            .slice(part.indexOf("\n") + 1, -3)
            .replace(/\n$/, "");
          return (
            <pre
              key={index}
              className="question-code"
              tabIndex={0}
              aria-label="Fragment kodu"
            >
              <code>{code}</code>
            </pre>
          );
        }
        if (!part.trim()) return null;
        return (
          <p key={index} className="whitespace-pre-wrap">
            {part
              .trim()
              .split(/(`[^`\n]+`)/g)
              .map((chunk, i) =>
                chunk.startsWith("`") && chunk.endsWith("`") ? (
                  <code key={i}>{chunk.slice(1, -1)}</code>
                ) : (
                  chunk
                ),
              )}
          </p>
        );
      })}
    </>
  );
}
