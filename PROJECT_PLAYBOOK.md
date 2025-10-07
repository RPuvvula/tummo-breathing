---
# 📘 Project Playbook

A living guide for development, deployment, and maintenance of this project.
Adapt and extend as needed.
---

## 1. Project Overview

- **Tech Stack**: React + Vite + TailwindCSS + Supabase (Auth + Storage)
- **Purpose**: Breathing app
- **Environments**:
  - Local: `localhost:5173`
  - Staging: [staging URL]
  - Production: [prod URL]

---

## 2. Development Standards

### Code Organization

- Feature‑based folder structure (`src/features/auth`, `src/features/dashboard`)
- Reusable UI in `src/components`
- Supabase client + API wrappers in `src/lib`
- Types in `src/types`
- Absolute imports via `@/` alias

### React & Styling

- Components: `PascalCase`
- Hooks: `camelCase` (`useAuth`)
- Tailwind for styling; extract patterns with `clsx` or `@apply`
- Accessibility: keyboard nav, ARIA roles, color contrast

### State & Data

- Supabase queries wrapped in typed helpers
- React Query for caching and async state
- Auth state in `AuthContext`

---

## 3. Workflow Standards

### Branching

- `main` = always deployable
- Feature branches: `feature/xyz`, `fix/abc`
- Rebase/squash before merging

### Commits & Automated Releases

Our versioning and changelog generation are fully automated using `standard-version`, driven by the **Conventional Commits** specification. Adhering to this is mandatory for all commits.

- **Commit Format**:

  - `feat`: A new feature (bumps **minor** version, e.g., 1.2.0 -> 1.3.0).
  - `fix`: A bug fix (bumps **patch** version, e.g., 1.2.0 -> 1.2.1).
  - `docs`, `style`, `refactor`, `test`, `chore`: Other changes (do not trigger a release but appear in changelog).
  - **Breaking Changes**: Add `!` after the type (e.g., `feat!:`) or a `BREAKING CHANGE:` footer to the commit message. This bumps the **major** version (e.g., 1.2.0 -> 2.0.0).

- **Release Workflow**:
  When ready to release, from the `main` branch:
  1.  Run `npm run release`. This command automatically:
      - Determines the new version based on your commits.
      - Updates `package.json` with the new version.
      - Updates `CHANGELOG.md` with a detailed list of changes.
      - Creates a new git commit and tag (e.g., `v1.3.0`).
  2.  Push the release to the remote: `git push --follow-tags origin main`.

### CI/CD

- Lint, type‑check, test on push
- Auto‑deploy `main` to staging
- Manual approval for production

### Self‑Review

- Open PRs for your own work
- Review diffs before merging
- Document reasoning in PR description

---

## 4. Deployment Checklist

- Code reviewed and tests green
- Env vars set securely
- Supabase migrations tested
- Backups verified
- Monitoring dashboards live
- Smoke tests pass in staging
- Rollback plan documented

---

## 5. Testing Strategy

- Unit tests: critical logic (auth, storage)
- Integration tests: Supabase workflows
- E2E tests: core flows (login, upload, dashboard)
- Lighthouse audits for performance & accessibility

---

## 6. Documentation

- `README.md`: setup, scripts, deploy steps
- `CHANGELOG.md`: updated per release
- `DEPLOYMENT_CHECKLIST.md`: pre‑flight steps
- ADRs: record major architectural decisions

---

## 7. Maintenance & Productivity

- Kanban board for tasks (GitHub Projects/Trello)
- Batch chores (deps, refactors) into maintenance sprints
- Automate backups, linting, changelogs
- Timebox features to avoid endless polishing

---

## 8. Post‑Deployment Verification

- Smoke tests pass in production
- Logs monitored for anomalies
- Metrics stable (latency, error rate)
- Rollback tested if needed
- Docs updated

---

⚡ **Note for Solo Devs**:  
This playbook is your “future‑you insurance.” Keep it lean, but consistent. Every project starts with the same backbone, and you evolve it as you learn.

---
