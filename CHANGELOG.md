# Changelog

## 2026-01-04 - shadcn/ui Setup

### shadcn/ui Integration (Tailwind v4)

**Prerequisites configured:**
1. Path aliases for `@/*` imports
   - Updated `tsconfig.json` - Added `baseUrl` and `paths`
   - Updated `tsconfig.app.json` - Added `baseUrl` and `paths`
   - Updated `vite.config.ts` - Added `resolve.alias` for `@`

**Installation commands:**
```bash
npx shadcn@latest init --yes --defaults
npx shadcn@latest add button --yes
```

**Files created:**
- `components.json` - shadcn configuration (new-york style, neutral base color, OKLCH colors)
- `src/lib/utils.ts` - Utility functions (cn helper for class merging)
- `src/components/ui/button.tsx` - Button component with variants

**Files modified:**
- `src/index.css` - CSS variables added by shadcn init
  - Added `tw-animate-css` import (Tailwind v4 animation plugin)
  - Added `@custom-variant dark` directive
  - Added `@theme inline` block with CSS variable mappings
  - Added `:root` with OKLCH color definitions
  - Added `.dark` theme with OKLCH dark mode colors
  - Added `@layer base` for border and background defaults
- `src/App.tsx` - Counter button replaced with shadcn Button component
- `eslint.config.js` - Disabled `react-refresh/only-export-components` for shadcn ui components

**Dependencies added:**
- `@radix-ui/react-slot` (^1.2.4)
- `class-variance-authority` (^0.7.1)
- `clsx` (^2.1.1)
- `lucide-react` (^0.562.0)
- `tailwind-merge` (^3.4.0)

**Key features:**
- shadcn v3.6.2 with native Tailwind v4 support
- OKLCH color system (modern replacement for HSL)
- new-york style (default for new projects)
- tw-animate-css (Tailwind v4 animation library, replaces tailwindcss-animate)
- CSS variables with dark mode support
- Icon library: lucide-react

**References:**
- [shadcn/ui Vite Installation](https://ui.shadcn.com/docs/installation/vite)
- [shadcn/ui Tailwind v4 Guide](https://ui.shadcn.com/docs/tailwind-v4)

---

## 2026-01-03 - Repository Quality Practices

### GitHub Templates

**Created:**
- `.github/ISSUE_TEMPLATE/bug_report.yml` - Structured bug report template
- `.github/ISSUE_TEMPLATE/feature_request.yml` - Feature request template
- `.github/ISSUE_TEMPLATE/config.yml` - Issue template configuration (disables blank issues)
- `.github/PULL_REQUEST_TEMPLATE.md` - Comprehensive PR template

**Benefits:**
- Consistent issue/PR submissions
- Reduces triage time for maintainers
- Guides contributors to provide useful information
- Professional contribution workflow

### Code Quality

**Created `.editorconfig`:**
- Basic editor settings (indentation, encoding, line endings)
- Works alongside Prettier for cross-platform consistency
- Prevents line-ending conflicts (LF enforced)
- Auto-parsed by Prettier (no config duplication)

**Settings:**
- `charset = utf-8`
- `end_of_line = lf`
- `indent_style = space`
- `indent_size = 2`

### Dependency Management

**Created `.github/dependabot.yml`:**
- Automated weekly dependency updates (Mondays)
- Separate groups for dev and production dependencies
- GitHub Actions updates included
- Max 10 npm PRs, 5 Actions PRs

**Configuration:**
- npm ecosystem: weekly updates, grouped by type (dev/prod)
- GitHub Actions: weekly updates, version pinning

### Documentation

**Created `LICENSE` (MIT):**
- Standard MIT license for open source projects
- Copyright: 2026 BodhiSearch

**Created `.github/SECURITY.md`:**
- Security vulnerability reporting policy
- GitHub Security Advisories preferred method
- 48-hour acknowledgment, 90-day fix timeline
- Responsible disclosure process

**Created `CONTRIBUTING.md`:**
- Comprehensive contribution guidelines
- Development workflow and setup instructions
- **Conventional Commits** documentation (not enforced via hooks)
- Available scripts reference
- Code style guidelines
- Testing guidelines
- PR process checklist

**Updated `README.md`:**
- Added CI, License, and Deploy badges
- Comprehensive feature list
- Quick start guide
- Available scripts documentation (dev, quality, testing)
- Project structure tree
- Configuration guidance
- CI/CD pipeline explanation
- Links to CONTRIBUTING.md and SECURITY.md

### Conventional Commits (Documentation Only)

**Format:** `<type>(<scope>): <subject>`

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Test updates
- `chore`: Build/tooling changes

**Note:** Not enforced via git hooks (non-opinionated approach)

### Files Added

| File | Purpose |
|------|---------|
| `.github/ISSUE_TEMPLATE/bug_report.yml` | Bug report template |
| `.github/ISSUE_TEMPLATE/feature_request.yml` | Feature request template |
| `.github/ISSUE_TEMPLATE/config.yml` | Template configuration |
| `.github/PULL_REQUEST_TEMPLATE.md` | PR template |
| `.editorconfig` | Editor consistency |
| `.github/dependabot.yml` | Dependency automation |
| `LICENSE` | MIT license |
| `.github/SECURITY.md` | Security policy |
| `CONTRIBUTING.md` | Contribution guide |

**Total:** 9 new files for quality practices

### Why These Practices?

**Tier 1 (Included):**
- Zero runtime overhead
- Industry-standard best practices
- Improves collaboration and code quality
- Non-opinionated (no enforcement via hooks)
- Low maintenance burden
- Professional appearance

**Not Included:**
- Git hooks (opinionated enforcement)
- Advanced analysis tools (CodeQL, SonarCloud) - can add later
- Knip, Renovate - optional, can add when needed

---

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
