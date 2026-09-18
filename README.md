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

The Polish **Programowanie python - politechnika gdanska** bank adds 201 explained questions and two presets: six untimed questions for learning, or 30 questions in 20 minutes for verification. The interface is Polish. Existing ISP/ZSBD presets and question banks remain available. See [bank notes](docs/python-bank.md) for content, sources, open design tasks, and the optional diversity metadata.

## Attempts

Questions are drawn without repetition within an attempt and shuffled. Retrying draws again; questions may overlap with a previous attempt. Progress is saved in the current browser. Refreshing restores the attempt, including its original deadline. A new device or browser starts a new attempt.

The timer is off by default. When enabled, it allows at most 30 minutes and keeps running while the page is closed. Expiry locks answers; results are revealed only when requested. Equal question weights, automatic written-answer matching, and strict choice scoring without penalties are the defaults. Grading and pagination can be changed in configuration. Text matching is a heuristic; optional self-assessment is available when wording does not capture correctness.

## Deployment

The app uses hash routes and the `/quiz-generator/` Vite base for GitHub Pages. To deploy, select **GitHub Actions** in the repository's **Settings → Pages**, then manually run **Deploy to GitHub Pages** from the Actions tab. The workflow tests, builds, and uploads `dist`; installing dependencies never changes Git branches or publishes anything.

For a different hosting path, change `base` in `vite.config.ts` before building.
