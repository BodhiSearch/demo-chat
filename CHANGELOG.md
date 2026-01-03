# Changelog

## 2026-01-03 - CI Workflow Restructure

### CI Workflow

**Created:** `.github/workflows/ci.yml`

**Purpose:** Main CI pipeline running all checks before deployment

**Permissions:**
- `contents: write` - Required for repository_dispatch trigger

**Pipeline Steps:**
1. Checkout → Setup Node → npm ci
2. Lint (ESLint + Prettier)
3. Build (tsc -b && vite build)
4. Typecheck (tsc --noEmit)
5. Unit tests (vitest run)
6. E2E tests (Playwright headless)
7. Trigger deploy (only on main push)

**Caching:**
- npm dependencies via `actions/setup-node@v4`
- Playwright browsers via `actions/cache@v4` with version key

**Triggers:**
- Push to main
- Pull requests to main
- Manual dispatch with optional ref (branch/tag/commit)

**Deploy Trigger:**
- Uses `repository_dispatch` event type `deploy-pages`
- Passes commit SHA via `client-payload`
- Only triggers on successful main branch push

### Deploy Workflow Changes

**Modified:** `.github/workflows/deploy-pages.yml`

**Changes:**
1. **Removed** automatic deployment on push to main
2. **Added** `repository_dispatch` trigger (auto from CI)
3. **Added** `workflow_dispatch` with ref input (manual deploy)
4. **Updated** checkout to handle both trigger types

**Checkout Logic:**
```yaml
ref: ${{ github.event.inputs.ref || github.event.client_payload.sha || 'main' }}
```
- `inputs.ref`: Manual dispatch with specific ref
- `client_payload.sha`: Auto from CI with commit SHA
- `'main'`: Fallback default

**New Workflow:**
```
Push to main → ci.yml runs → All checks pass → Triggers deploy-pages.yml → Deploy
```

**Manual Deploy:**
```bash
gh workflow run deploy-pages.yml --ref <branch/tag/commit>
```

---

## 2026-01-03 - Project Bootstrap

### Vite + React + TypeScript Setup

**Command Used:**
```bash
npm create vite@latest . -- --template react-ts --no-rolldown
```

**Experience:**
- Used `.` to scaffold in existing directory
- Despite `--no-rolldown` flag, went into interactive mode
- Required manual selection: "Ignore files and continue"
- Required manual selection: "Install with npm and start now? No"
- **Issue:** No fully non-interactive mode when scaffolding in existing directory
- **Workaround:** Could scaffold in subdirectory then move files, or accept interactive prompts

**Result:** Successfully scaffolded React + TypeScript project with Vite

---

### Tailwind CSS v4 Setup

**Commands:**
```bash
npm install -D tailwindcss @tailwindcss/vite
```

**Manual Changes:**
1. Updated `vite.config.ts`:
   - Added `import tailwindcss from '@tailwindcss/vite'`
   - Added `tailwindcss()` to plugins array

2. Replaced `src/index.css`:
   - Removed all default Vite styles
   - Added single line: `@import "tailwindcss";`

**Key Differences from v3:**
- No `postcss.config.js` needed
- No `tailwind.config.js` needed (for basic setup)
- No `@tailwind` directives - just `@import "tailwindcss"`
- Simpler integration via Vite plugin

**Result:** Tailwind CSS v4 configured with first-party Vite plugin

---

### Base Path Configuration

**File:** `vite.config.ts`

**Changes:**
- Add `base: '/demo-chat/'` to defineConfig for GitHub Pages subpath deployment
- This ensures all asset paths prefixed correctly for `https://[org].github.io/demo-chat/`

**Config structure:**
```typescript
export default defineConfig({
  base: '/demo-chat/',  // Add this for GitHub Pages
  plugins: [react(), tailwindcss()],
})
```

---

### Repository Setup

**Create and configure GitHub repository:**
```bash
# Create public repo in organization
gh repo create BodhiSearch/demo-chat --public

# Add remote
git remote add origin git@github.com:BodhiSearch/demo-chat.git
```

---

### GitHub Pages Deployment

#### Infrastructure Setup

**1. Create GitHub Actions workflow** - `.github/workflows/deploy-pages.yml`
- Trigger: push to main, workflow_dispatch
- Permissions: `contents: read`, `pages: write`, `id-token: write`
- Job 1 (build): checkout → setup-node@v4 (node 22, npm cache) → npm ci → npm build → upload-pages-artifact@v3 (path: ./dist)
- Job 2 (deploy): needs build → deploy-pages@v4 → environment: github-pages

**2. Enable GitHub Pages via CLI:**
```bash
gh api -X POST "/repos/BodhiSearch/demo-chat/pages" -f build_type=workflow
```
- Alternative: Settings → Pages → Source: GitHub Actions
- Use POST to create (not PUT to update)
- Confirms with `html_url` and `build_type: workflow`

#### SPA 404 Hack (rafgraph/spa-github-pages)

**Problem:** Direct navigation to client routes returns 404 (no server-side routing)

**Solution:** Two-step redirect via query string encoding

**3. Create `public/404.html`:**
- Script encodes current path as query string
- Set `pathSegmentsToKeep = 1` (accounts for `/demo-chat/` base)
- Redirect: `/demo-chat/callback` → `/demo-chat/?/callback`
- Source: https://github.com/rafgraph/spa-github-pages

**4. Modify `index.html`:**
- Add script in `<head>` before React loads
- Check if `location.search[1] === '/'` (encoded redirect)
- Decode query string, restore original path via `history.replaceState()`
- React then handles route normally

**Flow:**
1. User visits `/demo-chat/callback`
2. GitHub serves 404.html (no file exists)
3. 404.html encodes → redirects to `/?/callback`
4. index.html decodes → `replaceState` to `/callback`
5. React loads with correct route

#### Deploy

```bash
git push origin main  # Triggers workflow
gh run watch          # Monitor deployment
```

**Live URL:** `https://bodhisearch.github.io/demo-chat/`

**References:**
- [rafgraph/spa-github-pages](https://github.com/rafgraph/spa-github-pages)
- [S(GH)PA Hack - Smashing Magazine](https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/)
- [GitHub Pages REST API](https://docs.github.com/en/rest/pages/pages)

---

### Linting & Type Checking Configuration

**Dependencies installed:**
```bash
npm install -D prettier eslint-plugin-prettier eslint-config-prettier
```

**Files created:**
1. `.prettierrc` - Prettier configuration (tab: 2, width: 100, single quotes)
2. `.prettierignore` - Ignore dist, node_modules, markdown files

**Files modified:**
1. `eslint.config.js` - Added `eslint-plugin-prettier/recommended` integration
2. `package.json` - Added lint, typecheck, and combined check scripts

**NPM Scripts:**
| Script | Command | Purpose |
|--------|---------|---------|
| `lint` | `eslint . --max-warnings 0` | Check ESLint + Prettier, fail on issues |
| `lint:fix` | `eslint . --fix` | Auto-fix ESLint + Prettier issues |
| `typecheck` | `tsc --noEmit` | TypeScript type checking only |
| `check` | `npm run lint && npm run typecheck` | Run both checks |
| `check:fix` | `npm run lint:fix && npm run typecheck` | Fix lint, then typecheck |

**Prettier settings:**
- `printWidth: 100` (line width)
- `tabWidth: 2` (spaces per indent)
- `singleQuote: true` (prefer single quotes)
- `trailingComma: "es5"`
- `arrowParens: "avoid"`

**Integration approach:**
- Uses `eslint-plugin-prettier/recommended` (flat config compatible)
- Runs Prettier as ESLint rule
- Disables conflicting ESLint rules automatically

**References:**
- [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)

---

### Playwright E2E Testing

**Dependencies installed:**
```bash
npm install -D @playwright/test@1.56.0 playwright@1.56.0 cross-env
npx playwright install chromium
```

**Files created:**
1. `playwright.config.ts` - Playwright configuration (testDir: e2e, CI-aware timeouts)
2. `e2e/placeholder.spec.ts` - Placeholder test verifying landing page

**Files modified:**
1. `package.json` - Added test:e2e scripts and dependencies
2. `.gitignore` - Added Playwright artifacts (test-results, playwright-report, etc.)

**NPM Scripts:**
| Script | Command | Purpose |
|--------|---------|---------|
| `test:e2e` | `playwright test --headed` | Run e2e tests in headed mode |
| `test:e2e:ui` | `playwright test --ui` | Interactive UI mode |
| `ci:test:e2e` | `cross-env CI=true playwright test` | Run e2e tests in CI (headless) |

**Configuration highlights:**
- Test directory: `./e2e`
- Base URL: `http://localhost:5173/demo-chat/`
- Browser: Chromium only (Desktop Chrome)
- WebServer: Starts Vite dev server automatically
- CI mode: 2 retries, 60s timeout, headless
- Local mode: No retries, 30s timeout, headed by default

**Placeholder test:**
- Verifies "Vite + React" heading present
- Confirms #root element visible
- Validates app launches successfully

**References:**
- Sibling project pattern: `setup-modal-test-app/playwright.config.ts`
- [Playwright Vite React setup](https://dev.to/juan_deto/configure-vitest-msw-and-playwright-in-a-react-project-with-vite-and-ts-part-3-32pe)

---

### Vitest Unit Testing

**Dependencies installed:**
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @testing-library/user-event
```

**Files created:**
1. `src/test/setup.ts` - Test setup importing jest-dom matchers
2. `src/App.test.tsx` - Placeholder tests for App component

**Files modified:**
1. `vite.config.ts` - Added test configuration block with jsdom environment
2. `package.json` - Added test scripts and dependencies
3. `tsconfig.app.json` - Added "vitest/globals" to types array

**NPM Scripts:**
| Script | Command | Purpose |
|--------|---------|---------|
| `test` | `vitest run` | Run tests once (default) |
| `test:watch` | `vitest` | Run tests in watch mode |
| `test:coverage` | `vitest run --coverage` | Run with coverage report |

**Configuration highlights:**
- Test framework: Vitest with React Testing Library
- Environment: jsdom for DOM simulation
- Global test functions: describe, test, expect
- Setup file: `src/test/setup.ts` for jest-dom matchers
- Test pattern: `src/**/*.{test,spec}.{ts,tsx}`

**Placeholder tests:**
- Verifies App component renders
- Checks "Vite + React" heading present
- Validates DOM structure

Test verified: 2 passed (79ms)

---

### Notes

- Tailwind v4 significantly simpler than v3 (fewer dependencies, zero config)
- Vite's non-interactive mode has limitations when targeting existing directories
- SPA 404 hack is necessary workaround until GitHub Pages supports custom headers
- ESLint 9 flat config with Prettier integration follows 2025 best practices
- No `typecheck:fix` - TypeScript errors require manual fixes
- Playwright 1.56.0 matches sibling project versions for consistency
- E2E tests in `e2e/` folder, headed by default for development
- Vitest for unit tests, Playwright for e2e - complementary testing strategy
- Total setup time: ~2 minutes including manual edits
