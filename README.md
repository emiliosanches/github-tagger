# Github Tagger

This app allows you to add tags to your starred repositories, and filter them by those tags.

## Usage

You can access the application by clicking [here](https://githubtagger.emiliosanches.com.br/), or running it locally (follow [local installation guide](#installation-guide)).

- Click on "Login with GitHub, authorize the app, and then a list of your repositories will be shown.
- From this page, you can use the input at the top of the page to filter your repositories by their tags (partial names works too).
- Click on a repository of the list to open a dialog where you can manage (add/remove) its tags

## Installation Guide

1. Create a OAuth App in GitHub following [this tutorial from GitHub](https://docs.github.com/pt/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) and store the Client ID and the Client Secret.
   1.1 The Authorization Callback URL is the URL that the user will be sent to after authorizing the app. For this project, it should be the URL for the LoginCallback page (localhost or externally hosted). You can change it later.

2. Clone the repository running `git clone https://github.com/emiliosanches/github-tagger.git` in your terminal

3. Preferably, you should have yarn installed to setup the project (since the applications have yarn.lock, you may experience dependencies version mismatch if using npm)
   2.1. To install yarn, run `npm i -g yarn` or download the installer from https://classic.yarnpkg.com/lang/en/docs/install
   2.2. If you still want to use npm instead of yarn, you can use the corresponding commands:

   - `yarn` or `yarn install` -> `npm install`
   - `yarn <custom-command>` -> `npm run <custom-command>` (example: `yarn dev` -> `npm run dev`)

4. Follow the instructions below to run the frontend and backend apps:

### Backend

1. In your terminal, open the `server` folder inside the cloned repository (`cd server`)
2. Create a .env file at this folder containing the following:

```env
PORT=<The port to run your app, optional, default will be 3000>
GITHUB_CLIENT_ID=<The Client ID you stored earlier>
GITHUB_CLIENT_SECRET=<The Client Secret you stored earlier>
DATABASE_URL=<The connection URL for your database, ex: postgresql://user:p4ssw0rd@localhost:5432/dbname>
```

3. Run `yarn` to install the dependencies from package.json
4. Run `yarn prisma generate` to generate the prisma client (https://www.prisma.io/docs/orm/prisma-client/setup-and-configuration/generating-prisma-client)
5. Run `yarn start:dev` to run the application in development mode
6. If you want to get a production build (transpiled JS files), run `yarn tsc`

### Frontend

1. In your terminal, open the `web` folder inside the cloned repository (`cd web`)
2. Create a .env file at this folder containing:

```env
VITE_CLIENT_ID=<The Client ID you stored earlier>
VITE_REDIRECT_URI=<The URL that you've set as the Authorization Callback URL of your OAuth app earlier>
VITE_API_BASE_URL=<The root URL of your backend application>
```

3. Run `yarn` to install the dependencies from package.json
4. Run `yarn dev` to run the application in development mode
5. If you want to get a production build (static HTML + JS files), run `yarn build`
