# Changelog

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

### Notes

- Tailwind v4 significantly simpler than v3 (fewer dependencies, zero config)
- Vite's non-interactive mode has limitations when targeting existing directories
- SPA 404 hack is necessary workaround until GitHub Pages supports custom headers
- Total setup time: ~2 minutes including manual edits
