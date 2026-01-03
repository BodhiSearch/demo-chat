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

### Notes

- Tailwind v4 significantly simpler than v3 (fewer dependencies, zero config)
- Vite's non-interactive mode has limitations when targeting existing directories
- Total setup time: ~2 minutes including manual edits
