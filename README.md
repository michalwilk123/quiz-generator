# Quiz generator

A small exam-practice app with a navy background, teal accents, and a mobile-first layout. React, TypeScript, Vite, and Tailwind CSS; no backend or accounts.

## Development

Use Bun 1.3.6+ and Node.js 24 LTS (minimum 22.12, for the Vite/test toolchain).

```sh
bun install --frozen-lockfile
bun run dev
```

Open the local URL printed by Vite. `bun run test` runs the core tests; `bun run build` checks TypeScript and builds `dist`; `bun run preview` serves that production build locally.

Browser checks use Chromium with a mobile viewport:

```sh
bunx playwright install chromium
bun run test:browser
```

Every push and pull request runs a clean dependency install, core tests (including question-bank validation), and the production build in GitHub Actions. Browser tests run locally.

## Questions and prepared exams

Edit the existing JSON banks in `src/quizes/` and register banks in `src/quiz_config.ts`. Each bank represents one subject. Keep its `urlName` stable: links refer to that ID, so adding or removing questions does not change the configuration URL. Questions keep the existing `question`, `type`, answer fields, and optional `scale` format. `scale` is used only when question weighting is enabled.

Prepared exams live in `src/prepared_exams.ts`. The initial ISP and ZSBD presets each draw five questions with no timer. Their links follow the latest configuration in that file. The configuration page can mix existing banks using relative weights and generates a single versioned, URL-safe configuration value. Custom links preserve settings and draw fresh questions; they do not encode a fixed question selection. Keep referenced bank IDs available for old links to keep working.

## Python practice bank

The Polish **Programowanie python - politechnika gdanska** bank contains 264 explained questions, including React, browser JavaScript, and AWS and two presets: six untimed questions for learning, or 30 questions in 20 minutes for verification. The interface is Polish. Existing ISP/ZSBD presets and question banks remain available. See [bank notes](docs/python-bank.md) for content, sources, open design tasks, and the optional diversity metadata.

The separate **Programowanie python - politechnika gdanska 2** bank matches the invitation's Python/backend scope: 215 matching questions retained and 73 added (288 total). It has **Nauka 2** and **Weryfikacja 2** presets with the same settings as their originals. Detailed Python sections keep roughly half the sampled questions on Python and concurrency, while the remaining sections cover the broader invitation. The original bank and links remain available. The matching second report lives in `job-seek-dashboard/public/materialy/python-egzamin2.html`.

## AWS Certified Cloud Practitioner (CLF-C02)

The English AWS question bank has 250 original questions with explanations for every answer option and links to AWS documentation. It follows the current CLF-C02 blueprint and public AWS question style. Two presets are available on the home page:

- **Study** (`#/exam/aws-clf-c02-study`): 20 questions without a timer; an explicit “I don’t know” option; explanations and sources after finishing.
- **Exam Demo** (`#/exam/aws-clf-c02-demo`): 50 scored questions, 90 minutes, one question per page; 12 Cloud Concepts, 15 Security and Compliance, 17 Cloud Technology and Services, and 6 Billing, Pricing, and Support questions. All selected answers must match the key to earn one point; no guessing penalty.

The official exam has 65 questions, including 15 unscored experimental items. The demo omits those items as requested and retains the official 90-minute limit, so its pace is more generous than the full exam. Results show raw accuracy and performance by domain, without claiming equivalence to AWS's scaled passing score. Retrying draws a fresh selection; questions can overlap between attempts. To study the full bank, choose only AWS in configuration and set the question count to 250.

See [research and authoring notes](docs/aws-clf-c02.md) for sources, style rules, coverage, and maintenance details.

## Python PG fullstack proportions

**Python PG — Fullstack** (`#/exam/python-pg-fullstack`) draws 40 questions in 30 minutes with the requested priorities: 12 Python (30%), 10 DDD/design/architecture (25%), 8 Django/DRF/FastAPI and Python libraries (20%), 6 React/TypeScript (15%), and 4 databases/other technologies (10%). These counts hold on every draw. The dedicated senior bank contains 94 curated scenarios, replacing definitions and implausible alternatives with concurrency, transaction, failure, performance and UI-state decisions. Related public interview-topic sources are shown separately from technical documentation after submission; this is not a claim that every scenario was asked verbatim in an interview. See [curriculum notes](docs/python-fullstack.md). Rebuild this bank with `python3 scripts/build-python-fullstack-bank.py` after changes to its source banks or `scripts/python-fullstack-senior.json`.

## Attempts

Questions are drawn without repetition within an attempt and shuffled. Retrying draws again; questions may overlap with a previous attempt. After submission, the score and all questions, answers, and explanations appear on one page, even for a paginated quiz. Refreshing preserves this complete review. Progress is saved in the current browser. Refreshing restores the attempt, including its original deadline. A new device or browser starts a new attempt.

The timer is off by default. When enabled, it allows at most 90 minutes and keeps running while the page is closed. Expiry locks answers; results are revealed only when requested. Equal question weights, automatic written-answer matching, and strict choice scoring without penalties are the defaults. Grading and pagination can be changed in configuration. Text matching is a heuristic; optional self-assessment is available when wording does not capture correctness.

## Deployment

The app uses hash routes and the `/quiz-generator/` Vite base for GitHub Pages. To deploy, select **GitHub Actions** in the repository's **Settings → Pages**, then manually run **Deploy to GitHub Pages** from the Actions tab. The workflow tests, builds, and uploads `dist`; installing dependencies never changes Git branches or publishes anything.

For a different hosting path, change `base` in `vite.config.ts` before building.
