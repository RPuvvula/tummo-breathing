# Repo-starter-kit
Repository Template for new Repos. This is just a template for new repos.
- Use the template for new repos
When creating a new repository, instead of starting from scratch, choose “Use this template” from the template repo’s page.
You’ll get a fresh repo with the same directory structure and files, but with a separate commit history (unlike forking).

# 🚀 Project Name

A full-stack starter template using React (Vite + TypeScript), FastAPI backend, and Supabase for auth and data.

## 🧰 Tech Stack
- Frontend: React + Vite + TypeScript
- Backend: FastAPI + Uvicorn
- Database: Supabase (PostgreSQL)
- Deployment: Vercel (frontend), Railway/Fly.io (backend)

## ⚙️ Setup

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
npm run test

# Backend
pytest
```

## ⚙️ Linting & Code Quality

This project uses [ESLint](https://eslint.org/) for identifying and reporting on patterns in JavaScript/TypeScript, and [Prettier](https://prettier.io/) for enforcing consistent code style. A robust linting setup is crucial for maintaining code quality and consistency.

### Running Lint Checks

We have two primary scripts configured in `package.json` for linting:

1.  **Check for errors:**
    This command will scan the entire project for linting and formatting errors. It's configured to fail if any warnings or errors are found, making it ideal for use in CI/CD pipelines.

    ```bash
    npm run lint
    ```

2.  **Automatically fix errors:**
    This command will attempt to automatically fix as many linting and formatting errors as it can. Run this locally to quickly clean up your code.

    ```bash
    npm run lint:fix
    ```

### IDE Integration (Recommended)

The most efficient way to handle linting is to get real-time feedback in your code editor.

1.  **Install the Extension:** Install the official [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for Visual Studio Code.
2.  **Enable Format on Save:** To have ESLint (and Prettier) automatically fix your code every time you save, add the following to your VS Code `settings.json` file:

    ```json
    {
      "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit"
      },
      "editor.formatOnSave": true
    }
    ```

### Automated Workflow (Best Practices)

To guarantee that no lint errors make it into the codebase, we recommend a fully automated workflow:

1.  **Pre-commit Hooks:** By using a tool like [Husky](https://typicode.github.io/husky/) with [lint-staged](https://github.com/okonet/lint-staged), you can configure a script to automatically run `npm run lint:fix` on only the files you've staged for commit. If the linter finds an error it can't fix, the commit is blocked. This is the single most effective way to maintain a clean codebase.

2.  **Continuous Integration (CI):** The `npm run lint` command should be a required step in your CI pipeline (e.g., GitHub Actions). This acts as a final safety net to catch any errors that might have slipped past the local checks before a pull request can be merged.

📦 Deployment
Frontend: Push to main triggers Vercel deploy

Backend: GitHub Actions deploy to Railway

---

## Releasing and Changelog Management

This project uses **[standard-version](https://github.com/conventional-changelog/standard-version)** to automate versioning and changelog generation. This process relies on commit messages adhering to the **[Conventional Commits specification](https://www.conventionalcommits.org/)**.

### Conventional Commits

Your commit messages must be formatted as follows:

```
<type>[optional scope]: <description>
```

Common types include:

- `feat`: A new feature. (Results in a `minor` version bump).
- `fix`: A bug fix. (Results in a `patch` version bump).
- `chore`: Changes to the build process or auxiliary tools.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `perf`: A code change that improves performance.
- `test`: Adding missing tests or correcting existing tests.

**Example Commits:**

```bash
git commit -m "feat(auth): add google oauth as a login option"
git commit -m "fix(upload): correct file type validation for PDFs"
git commit -m "docs(readme): update setup instructions"
```

### How to Create a New Release

1.  Ensure all your desired changes have been committed to your main branch using the Conventional Commits format.

2.  Run the release script:

    ```bash
    npm run release
    ```

    This command will automatically:

    - Analyze your commits since the last release.
    - Determine the new version number (patch, minor, or major).
    - Update the version in `package.json`.
    - Update `CHANGELOG.md` with all the new `feat` and `fix` commits.
    - Create a new commit with these changes.
    - Create a new Git tag with the new version number.

3.  Push the new commit and tag to the remote repository:

    ```bash
    git push --follow-tags origin main
    ```

This process ensures that your changelog is always accurate and directly tied to the code changes in the repository.

---

✅ .env.example
```env
# Frontend
VITE_SUPABASE_URL=https://xyz.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Backend
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://user:pass@host:port/dbname
```

🛡️ Environment Variables
See .env.example for required keys.

🤝 Contributing
- **[Developer Guide](./CONTRIBUTING.md)**
- **[Audio Format Best Practices](./AUDIOFORMATS.md)**
