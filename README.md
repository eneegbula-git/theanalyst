# Ene Egbula – Business Analyst Portfolio

A static portfolio website built with plain HTML, CSS and JavaScript. No React, Next.js, npm, Node.js or build step. Entry page: `index.html`.

## Upload to GitHub
1. Create a new repository on github.com (e.g. `portfolio`).
2. Click **Add file → Upload files** and drag in **everything inside this folder** (not the folder itself), keeping the `assets` folder structure.
3. Check `index.html` is in the repository root (top level).
4. Click **Commit changes**.

## Enable GitHub Pages
Repository **Settings → Pages → Build and deployment → Deploy from a branch → Branch: main → Folder: / (root) → Save.**
After a minute your site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`. GitHub Pages uses `index.html` as the entry page.

## Where to update your information
Almost all content is in **`assets/js/data.js`**. Open it on GitHub (pencil icon) and edit the text inside the quotes.

| What | Where in `data.js` |
|---|---|
| Name, title, tagline, bio, location | `portfolioData` |
| Email, phone, LinkedIn, GitHub | `portfolioData` |
| Resume file path / button text | `resume`, `resumeText` |
| Formspree endpoint | `formspreeEndpoint` |
| Skills | `competencies` |
| Experience | `experience` (copy a block `{ ... }` to add a job) |
| Projects | `projects` (copy a block to add a project) |

Search for `[` in `data.js` to find placeholders such as `[Insert actual Excel dataset and source]` and replace them with real details. Page titles and SEO tags are at the top of `index.html`.

## Images
Put files in `assets/images/`. The profile photo is `profile.jpg`. Project images are `project-01.jpg` to `project-05.jpg` (matching the `image:` line of each project). If an image is missing, a plain category tile is shown instead. Favicon: replace `favicon.ico` in the root.

## Resume
Put your PDF in `assets/documents/` and keep the name `resume.pdf` (or change `resume:` in `data.js`). Avoid apostrophes and spaces in file names.

## Projects and case studies
Each project in `data.js` has a card and a pop-up case study (Problem → Objective → Approach → Analysis → Findings → Recommendations → Outcome → Impact). Add links in `document`, `github` and `dashboard`; empty ones are hidden. Findings are labelled "to be verified" until you confirm them.

## Colours and fonts
Top of `assets/css/style.css`: `--accent` (main colour), `--bg`, `--text` etc. for light mode; the `[data-theme=dark]` block is dark mode. Fonts: `--sans` and `--serif` (Google Fonts are loaded in `index.html`).

## Contact form
Uses Formspree (`https://formspree.io/f/mzeeaopo`). Confirm your email under your Formspree form settings. No private keys are used.
