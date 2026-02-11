# Kvarteret Astro proof of concept

## Quickstart:

1. `cd` into the `kvarteret-astro` folder
2. Add a `.env.local` file in this folder with the following content (use the tokens from the .env.local file in the old kvarteret project. Keep in mind DIRECTUS_STATIC_TOKEN has been renamed from CMS_TOKEN):

```
PUBLIC_DIRECTUS_URL=https://cms.kvarteret.no
DIRECTUS_STATIC_TOKEN=<token>
CRESCAT_TOKEN=<token>
STUDENTBERGEN_TOKEN=<token>
```

3. Run `npm install` to install dependencies
4. Run `npm run dev` to start the development server
5. Open your browser and go to `localhost:4321` to see the site

## Features:

- [ ] Fetches events from Student Bergen
- [x] Fetches events from Directus CMS
- [ ] Support english language
- [ ] Renders all pages from Directus CMS

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
│   └── components/
│       └── <React, Vue, Svelte, Preact, Astro components>
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

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
