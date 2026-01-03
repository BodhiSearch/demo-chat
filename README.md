# demo-chat

[![CI](https://github.com/BodhiSearch/demo-chat/actions/workflows/ci.yml/badge.svg)](https://github.com/BodhiSearch/demo-chat/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Deploy](https://github.com/BodhiSearch/demo-chat/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/BodhiSearch/demo-chat/actions/workflows/deploy-pages.yml)

A modern, production-ready React + TypeScript starter template with comprehensive tooling and best practices.

🚀 **[Live Demo](https://bodhisearch.github.io/demo-chat/)**

## Features

### Core Stack
- ⚡ **[Vite 7](https://vite.dev/)** - Next generation frontend tooling
- ⚛️ **[React 19](https://react.dev/)** - Latest React with modern patterns
- 📘 **[TypeScript](https://www.typescriptlang.org/)** - Strict mode enabled
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS with Vite plugin

### Code Quality
- 🔍 **ESLint 9** - Flat config with TypeScript support
- 💅 **Prettier** - Integrated with ESLint for consistent formatting
- 📝 **EditorConfig** - Cross-platform editor consistency
- 🎯 **Strict TypeScript** - Maximum type safety

### Testing
- ✅ **[Vitest](https://vitest.dev/)** - Fast unit testing with React Testing Library
- 🎭 **[Playwright](https://playwright.dev/)** - End-to-end testing with Chromium

### CI/CD
- 🔄 **GitHub Actions** - Automated CI pipeline (lint → build → typecheck → test → e2e)
- 📦 **GitHub Pages** - Automated deployment with SPA routing
- 🤖 **Dependabot** - Automated dependency updates
- 🔐 **Security** - Automated security scanning and policy

### Developer Experience
- 📋 **Issue/PR Templates** - Structured contribution workflow
- 📖 **Contributing Guide** - Conventional commits documentation
- 🔒 **Security Policy** - Responsible disclosure guidelines
- 📄 **MIT License** - Open source friendly

## Quick Start

### Prerequisites

- **Node.js**: 22.x or later
- **npm**: 10.x or later

### Installation

```bash
# Clone the repository
git clone https://github.com/BodhiSearch/demo-chat.git
cd demo-chat

# Install dependencies
npm ci

# Start development server
npm run dev
```

Visit [http://localhost:5173/demo-chat/](http://localhost:5173/demo-chat/)

## Available Scripts

### Development

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build for production (dist/) |
| `npm run preview` | Preview production build locally |

### Code Quality

| Script | Description |
|--------|-------------|
| `npm run lint` | Check ESLint + Prettier (fails on issues) |
| `npm run lint:fix` | Auto-fix ESLint + Prettier issues |
| `npm run typecheck` | TypeScript type checking (tsc --noEmit) |
| `npm run check` | Run lint + typecheck (pre-commit recommended) |
| `npm run check:fix` | Run lint:fix + typecheck |

### Testing

| Script | Description |
|--------|-------------|
| `npm run test` | Run unit tests once (Vitest) |
| `npm run test:watch` | Run unit tests in watch mode |
| `npm run test:coverage` | Run unit tests with coverage report |
| `npm run test:e2e` | Run e2e tests in headed mode (Playwright) |
| `npm run test:e2e:ui` | Run e2e tests in UI mode |
| `npm run ci:test:e2e` | Run e2e tests headless (for CI) |

## Project Structure

```
demo-chat/
├── .github/
│   ├── ISSUE_TEMPLATE/       # Issue templates (bug, feature)
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   ├── workflows/            # GitHub Actions
│   │   ├── ci.yml           # Main CI pipeline
│   │   └── deploy-pages.yml # GitHub Pages deployment
│   ├── dependabot.yml        # Dependency updates config
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md           # Security policy
├── e2e/                      # Playwright e2e tests
├── public/                   # Static assets
│   └── 404.html             # SPA routing fallback
├── src/                      # Application source
│   ├── test/                # Test utilities
│   │   └── setup.ts         # Vitest setup
│   ├── App.tsx
│   ├── main.tsx
│   └── *.test.tsx           # Unit tests
├── .editorconfig             # Editor consistency
├── .prettierrc               # Prettier config
├── CHANGELOG.md              # Version history
├── CONTRIBUTING.md           # Contribution guidelines
├── LICENSE                   # MIT License
├── eslint.config.js          # ESLint flat config
├── playwright.config.ts      # Playwright config
├── tsconfig.json             # TypeScript config
└── vite.config.ts            # Vite + Vitest config
```

## Configuration

### Base Path

This template is configured for GitHub Pages deployment with base path `/demo-chat/`. To change:

```typescript
// vite.config.ts
export default defineConfig({
  base: '/your-repo-name/',  // Update this
  // ...
});
```

### Tailwind CSS v4

Tailwind v4 uses a simplified setup:
- No `tailwind.config.js` needed (basic setup)
- No `postcss.config.js` needed
- Single import: `@import "tailwindcss";` in `src/index.css`

See [Tailwind CSS v4 docs](https://tailwindcss.com/docs/v4-beta) for customization.

## CI/CD Pipeline

### CI Workflow (`.github/workflows/ci.yml`)

Runs on every push to `main` and pull requests:

```
Checkout → npm ci → Lint → Build → Typecheck → Unit Tests → E2E Tests → Deploy
```

**Caching:**
- npm dependencies (setup-node)
- Playwright browsers (versioned key)

### Deploy Workflow (`.github/workflows/deploy-pages.yml`)

Triggered automatically by CI on successful `main` push, or manually via:

```bash
gh workflow run deploy-pages.yml --ref main
```

## Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Development setup
- Code quality guidelines
- Commit message conventions
- Pull request process

## Security

See [SECURITY.md](./.github/SECURITY.md) for our security policy and how to report vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with [Vite](https://vite.dev/)
- Powered by [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Tested with [Vitest](https://vitest.dev/) and [Playwright](https://playwright.dev/)

---

**Created as a starter template for modern React applications** ✨
