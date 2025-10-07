# 📥 Pull Request

## Description

- Briefly describe the changes in this PR.
- Link to any related issue or task.

---

## ✅ Checklist (Development Standards)

- [ ] Code follows [Project Playbook](./Project_Playbook.md) standards
- [ ] Feature/component placed in correct folder (`src/features`, `src/components`, `src/lib`, etc.)
- [ ] Naming conventions respected (PascalCase for components, camelCase for hooks)
- [ ] Tailwind classes follow design tokens (no ad‑hoc colors unless defined in `tailwind.config.js`)
- [ ] Supabase calls wrapped in typed helpers (`lib/supabaseClient.ts` or `lib/api.ts`)
- [ ] Accessibility verified (keyboard nav, ARIA roles, color contrast)
- [ ] Responsive design tested across breakpoints

---

## 🧪 Testing

- [ ] Unit tests added/updated
- [ ] Integration tests for Supabase flows (auth, storage)
- [ ] E2E tests for critical paths (login, upload, dashboard)
- [ ] Lighthouse audit run (Performance, Accessibility, Best Practices ≥ 90)

---

## 📄 Documentation

- [ ] `README.md` updated if setup/deploy steps changed
- [ ] `CHANGELOG.md` updated (if release‑worthy) (see the playbook)
- [ ] ADR added/updated if architectural decision was made

---

## 🚀 Deployment

- [ ] Verified preview build on Vercel
- [ ] Smoke tests pass in staging
- [ ] Rollback plan considered (if migration or risky change)
