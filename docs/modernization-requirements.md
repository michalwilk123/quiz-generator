# Quiz Generator modernization

## Agreed requirements

- Improve the existing React application incrementally; preserve repository-managed question files and static hosting.
- Mobile is the primary device; interface language is English.
- Preserve navy background, muted light text, teal accents, and straightforward question presentation. Migrate Chakra styling to Tailwind and accessible native controls. Keep a smaller credits footer.
- Minimal functional UI. No decorative pills, dashboards, or pass thresholds.
- Home lists prepared exams with titles, descriptions, and Start actions. Prepared configurations are defined in a TypeScript file. The full configuration editor is accessed separately.
- Prepared exam links use stable IDs and follow the latest repository configuration.
- Custom links encode a versioned configuration in one URL value rather than numerous option parameters. They contain settings and stable subject IDs, never question indexes or a sampled question set. Changes to question counts/content must not invalidate configuration links.
- Each new attempt samples fresh questions. Mix subjects by relative weights/probabilities; exact per-subject counts are unnecessary. Question count is explicit.
- Timer is off by default. Typical timed sessions last 5–10 minutes; enabling the timer initially selects 10 minutes. Duration has a hard maximum of 30 minutes.
- Header and prominent timer remain visible while scrolling.
- Support all-question scrolling, one question at a time, and paginated layouts. Default to automatic pagination with fewer open questions per page and no more than 20 questions per page.
- Allow skipping, returning to earlier pages, and editing answers before finishing or expiry.
- Expiry freezes all answers without revealing correctness. Keep navigation available and allow the user to open the results/end section explicitly.
- Automatically preserve the current attempt and its original deadline across refresh/closing the page. Time continues while absent. A new attempt is distinct from restoring one.
- Written-answer grading is configurable, including model-answer self-assessment and existing text matching.
- Choice scoring defaults to strict correctness without penalties; partial credit and wrong-answer penalties are optional configuration.
- No pass/fail threshold.
- Ask Claude Code to challenge requirements before implementation.

## Interview clarifications (override earlier proposals)

- Each quiz file represents one subject. No new `subject` field, subject taxonomy, or invented quiz content. An explicitly configured exam can mix existing quiz files by weight. Unrelated quizzes remain separate otherwise.
- Preserve all three existing quiz files and their availability, including `st`. Initial prepared configurations are only for ISP and ZSBD; they reference existing content.
- Timer is OFF by default. Optional countdown has a hard maximum of 30 minutes. Enabling the timer initially selects 10 minutes.
- Questions carry equal points by default; using their existing individual point weights is optional.
- Selecting a prepared exam immediately opens the attempt. No preview/start interstitial by default.
- Keep navigation simple. No mark-for-review feature or jump-to-unanswered control.
- Preserve the current simple, clear results presentation. Add subtle animation and confetti for a fully graded perfect score, respecting reduced-motion preferences.
- Retry draws a fresh random sample using the same configuration and shuffles question order. No same-question retry option requested.
- Keep the sticky header especially compact on mobile; timer should remain prominent when enabled.
- ISP and ZSBD presets contain five questions each. Written answers retain automatic matching by default, with modest normalization/partial-score improvements and optional self-assessment.
- Replace full-width question separators with whitespace and clearer numbering. Use larger answer tap areas, subtle teal selected states, and restrained borders for text fields.
- Keep implementation small: static React app, existing files, native controls, no backend or speculative architecture.

## Implementation defaults

- Automatic page capacity: 10 choice questions, 5 short answers, or 2 long answers, combined proportionally for mixed pages. This is a design heuristic, not a scientifically established optimum.
- Previous/Next and plain page/answered counts; no large question-navigation grid by default.
- Prepared links immediately open the quiz; a timer, if configured, starts with the loaded attempt.
- Never repeat a question within an attempt. Reallocate sampling weights when a selected subject is exhausted. If total eligible questions are insufficient, explain the available count before starting. If a subject ID is removed, report the missing subject rather than silently changing the exam.
- Existing question content may change between attempts, but a saved in-progress attempt preserves its sampled content and answer key.
- Choice default: strict scoring, no penalty. Advanced configuration offers partial credit and an explicit penalty value if enabled.
- Written default: automatic text matching, with normalized exact matching for short answers and text similarity for long answers. Make clear that similarity does not assess semantic correctness. Manual grading is optional.
- Results show automatic score and any pending self-assessment separately, plus answers/model answers. No overall final percentage while manual grading is incomplete.
- New attempt draws a fresh sample, clears answers, and starts a fresh deadline. No editing a finished attempt.
- One resumable attempt stored locally. Starting another immediately replaces it without confirmation.
- Configuration editor groups subject mix, question count and duration first; layout and grading sit in an expandable section. A copy-link action exports the configuration.
- Keep existing question schemas compatible and retain the existing optional scale field for weighted scoring. No question IDs or extra metadata are needed.

## Research and limits

- Bradbury (2016), https://pubmed.ncbi.nlm.nih.gov/28145268/: review finds no solid primary evidence for a universal 10–15 minute attention limit.
- Szpunar, Khan & Schacter (2013), https://doi.org/10.1073/pnas.1221764110: two experiments found that testing interspersed with online lectures improved attention and learning. This does not establish an optimal standalone exam duration or questions-per-page count.
- Pagination limits should be treated as adjustable usability choices, not educational claims.

## Engineering checks

- Modernize supported React/Vite/TypeScript dependencies, adopt one package manager and lockfile, remove unsafe Git-changing install lifecycle behavior.
- Separate immutable question banks, configuration, attempt answers, answer locking, and result revelation.
- Derive countdown from absolute deadline; centrally reject late writes, including after backgrounding. Locking controls must not reveal answer keys.
- Validate configuration links and question banks. Preserve existing bank identifiers and handle malformed/obsolete links clearly.
- Check sampling, grading, expiry, restore, URL round trips, and no premature answer revelation with focused tests.
- Verify mobile overflow, sticky timer/header, keyboard-accessible controls, pagination, submission, and results in a browser.

## Claude Code challenge and disposition

Claude Code reviewed this document and the existing source on 2026-09-18.

- Accepted: a single questions-per-page control can expose Auto, 1, 5, 10, 20, and All without separate layout switches. Persist page boundaries with the attempt.
- Accepted: answer locking must not prevent self-assessment after finishing. Self-assessment changes grades only, never submitted answers.
- Accepted: existing bank `urlName` values provide stable subject identifiers; question IDs are not necessary for configuration links or self-contained attempt snapshots.
- Accepted: one versioned saved attempt object and a central deadline guard suffice; avoid an elaborate persistence architecture.
- Rejected: removing configurable grading because current banks are mostly long answers. User explicitly wants configurable grading and future certification/recruitment question banks. Keep this out of the normal exam-start flow.
- Rejected: treating the current banks as proof that cross-subject exams are not useful. Subject mixing is an explicit user requirement; each existing quiz file defines one mixing unit.
- Rejected: silently discarding settings from old links. Decode supported legacy options deliberately or explain incompatibility.
- Resolved: keep `st` selectable in configuration; initial prepared exams cover ISP and ZSBD only.
- Resolved: equal weight by default, existing point scales optional.
- Resolved: timer off by default, optional countdown up to 30 minutes.
- Implementation should proceed in tooling, core behavior, then UI stages, with focused verification at each stage.
