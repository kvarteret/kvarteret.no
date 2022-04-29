This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

1. Install nodejs

	This will vary depending on your system. Here are a few common systems:

	Ubuntu: ```sudo apt-get install nodejs```
	
	Fedora ```sudo dnf install nodejs```

	windows: [Download link](https://nodejs.org/dist/v16.15.0/node-v16.15.0-x86.msi)

	MacOS: [Download link](https://nodejs.org/dist/v16.15.0/node-v16.15.0.pkg)

2. Install yarn

This installs yarn globally

```sh
npm i -g yarn
```

3. Run the localhost server

Be in the root-folder of the repo and run:

```bash
npm install
```

followed by:

```bash
npm run dev
# or
yarn dev
```

4. (Optional)

You might get an error from just the above command. if so, this might help:

```bash
npm install --legacy-peer-deps
```

If this runs successfully, you can repeat step 3.

## Viewing the live localhost server

Open [http://localhost:3000](http://localhost:3000) to access blifrivillig.no and [http://localhost:3001](http://localhost:3001) to access kvarteret.no with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
