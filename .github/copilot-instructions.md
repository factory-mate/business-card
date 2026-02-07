# Copilot instructions — business-card (慧友名片)

Purpose: give AI coding agents the minimal, actionable knowledge needed to be productive in this repo.

## Quick facts ✅

- Framework: Taro (React) v4 + TypeScript + Sass + TailwindCSS
- Main entry: `src/` (pages: `src/pages/*`, components: `src/components/*`, APIs: `src/api/*`)
- Build targets: multiple (weapp, h5, alipay, tt, rn, qq, jd). Scripts in `package.json` (e.g. `npm run dev:h5`, `npm run dev:weapp`).
- Type alias: `@/*` -> `./src/*` (see `tsconfig.json`)

## Start / build / dev 🛠️

- Install: use your package manager (repo includes `pnpm-lock.yaml`) — e.g. `pnpm install` or `npm install`.
- Dev: `npm run dev:<target>` (examples: `dev:h5`, `dev:weapp`). These run `taro build --type <target> --watch` via the scripts in `package.json`.
- Build: `npm run build:<target>` (produces `dist/` or H5 assets).
- Note: Taro runner is configured in `config/index.ts` (vite runner + tailwind postcss integration).

## Architecture & conventions 🧭

- Multi-platform mobile web/mini-program app built with Taro. Pages follow Taro convention: `src/pages/<name>/index.tsx` with `definePageConfig(...)` at top.
- UI: mix of `@tarojs/components` and `taro-ui` (`AtButton`, `AtInput`, `AtImagePicker`, etc.). H5 builds include `taro-ui` via `esnextModules` in config.
- Styling: Tailwind utilities are used inline (`className="p-2 text-sm"`); `tailwind.config.js` has `preflight: false` (no global reset). `src/app.scss` imports Tailwind directives.
- State & lifecycle: pages commonly use React hooks + Taro lifecycle helpers (e.g. `Taro.useLoad(...)`) and navigation helpers (`Taro.navigateTo`, `Taro.switchTab`).

## APIs & network patterns 🔗

- All API calls go through `src/api/request.ts`:
  - Uses `API_DOMAIN_PREFIX = 'https://huiyoucloud.com:8099'`.
  - Adds `authorization` header: `Bearer ${Taro.getStorageSync('token')}` — token stored under key `token`.
  - Expected response shape: `{ msg, success, data }`. Non-200 or `success === false` => shows toast and rejects.
  - On 401/403: clears `token` and `user` storage and redirects to `/pages/login/index`.
- File uploads: `src/api/files.ts` uses `Taro.uploadFile` to `${API_DOMAIN_PREFIX}/api/sys_File/Add`. See `FilesAPI.upload` and `FileType` enum usage.
- Example usage: `UsersAPI.getAllInfo(userId)` (see `src/api/users.ts`) and `FilesAPI.upload({ file, fileType })` used in `src/pages/edit/index.tsx`.

## Project-specific patterns & gotchas ⚠️

- `definePageConfig(...)` is required for page metadata (title, share settings) in each page file.
- `Taro.getStorageSync('user')` is often used to read `UserId` for API requests (see `src/pages/edit/index.tsx`).
- `weapp-tailwindcss` plugin converts rem→rpx for mini-program builds. This behavior is enabled in `config/index.ts` and disabled for non-mini targets.
- CSS Modules are disabled by default (see `config/index.ts`), so most styles are global/tailwind utility classes.
- No dedicated test runner configured in `package.json` (no `test` script present).

## Tooling & quality 👀

- Dev dependencies include `eslint`, `prettier`, `stylelint`, and `cspell` (configs referenced via `@bit-ocean/*`). There are no repo-level `lint` scripts defined; run linters with your usual `npx`/IDE tooling.
- TypeScript: `strictNullChecks` is enabled. Prefer explicit interfaces in `src/api/*` (e.g. `UserVo`).

## Files & references to inspect 🔎

- Root: `package.json` (scripts), `tsconfig.json` (paths/alias), `tailwind.config.js` (styling)
- Build config: `config/index.ts`, `config/dev.ts`, `config/prod.ts`
- Network: `src/api/request.ts`, `src/api/files.ts`, `src/api/users.ts`
- Pages: example: `src/pages/edit/index.tsx` (form, file uploads, navigation)
- Components: `src/components/*` and `src/components/index.ts`

## When to ask for clarification ❓

- If an API endpoint's behavior isn't clear, prefer to inspect `src/api/*` helpers and `request.ts` first.
- If a build fails for a target, check `TARO_ENV` (scripts pass `--type`) and `config/index.ts`'s platform-specific options.

---

If anything here is unclear or you want me to add more examples (e.g. a short PR checklist or common refactor patterns), tell me which area to expand and I'll update the instructions.
