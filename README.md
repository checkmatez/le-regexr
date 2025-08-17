# Last Epoch Stash Search Builder

A web application for building complex stash search strings for Last Epoch using an intuitive interface.

🌐 **Live Demo:** [https://maksim-s.github.io/le-regexr/](https://maksim-s.github.io/le-regexr/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Automatic Deployment

- **Trigger:** Push to `master` or `main` branch
- **Workflow:** `.github/workflows/deploy.yml`
- **Target:** GitHub Pages at `https://maksim-s.github.io/le-regexr/`

### Manual Deployment Setup

To set up GitHub Pages deployment for your own fork:

1. Go to your repository's Settings → Pages
2. Set Source to "GitHub Actions"
3. Push to master/main branch to trigger deployment

The workflow will automatically:

- Install dependencies
- Build the project
- Deploy to GitHub Pages

## 🛠️ Technology Stack

- **Framework:** Astro
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages
- **CI/CD:** GitHub Actions

## 👀 Want to learn more?

Feel free to check [Astro documentation](https://docs.astro.build) or [Last Epoch documentation](https://lastepoch.com).
