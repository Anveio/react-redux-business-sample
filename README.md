[![Build Status](https://travis-ci.org/Anveio/stripe-react-fullstack.svg?branch=master)](https://travis-ci.org/Anveio/stripe-react-fullstack)

# Stripe React-Redux Starter Kit

This is an example fullstack application for processing card payments via Stripe. The client application is built with React, Redux, and TypeScript and sends requests to the API server which is built with Express and connects to a MongoDB database.

### Client-side features

- Fast single page app built with TypeScript, React, and Redux
- User signup
- User authentication via JWT.
- Client-side routing with React Router v4.
- Payment with Stripe-styled checkout button.

### Server-side features

- Generates simple JSON responses to requests to be used by the client.
- User signups saved in MongoDB.
- Card payment processing.
- Server-side validation of user signup & login.
- Can be deployed anywhere, independent of the client.

Includes user signup/authentication with JWT and payment authorization with Stripe on the server.

# Running it locally

The steps below will outline how to get the client and server running in development mode on your local machine.

## Running the client

Running the client bundle in development is done with the `run` script in the `client` folder.

```shell
cd client
npm start
```

This will open a tab in your OS's default browser with the client application on `localhost:3000`.

### Create a `variables.env`

In order to run the server locally, you'll need to configure some environment variables and set up a MongoDB database. First, create a `variables.env` in the `server`folder.

**It's important that the file end in `.env` so that it's ignored by git as specified in `.gitignore` and so that it's read by the server when running locally. Make sure you don't upload its contents to a repo somewhere because it will contain sensitive information.**

```shell
touch server/variables.env
cat server/variables.template.txt >> server/variables.env
```

The above commands will create a file called `variables.env` in the server folder and copy the contents of `server/variables.template.txt` into it.

### Configuring the development server

Three pieces of information are required to configure the server in development:

1.  A JWT secret.
2.  A Stripe API secret key.
3.  The URI of a MongoDB database to use in development.

To knock out step #1, open the `variables.env` file you just created. you can set any string as `JWT_SECRET` [but Auth0 recommends that it's at least 64 characters (512 bits)](https://auth0.com/blog/brute-forcing-hs256-is-possible-the-importance-of-using-strong-keys-to-sign-jwts), but the longer the better.

For step #2 you'll need a Stripe account. Login to your stripe account and navigate to [your dashboard and click on the "API keys" tab.](https://dashboard.stripe.com/account/apikeys)

Copy the token for the "Publishable key" and paste it as the value of `STRIPE_PUBLISHABLE_TEST_KEY` in the file located at `client/src/constants/index.ts`. Click to reveal the "Secret key", copy it, and paste it as the value for `STRIPE_SECRET_TEST` in the `variables.env` file for the server.

<figure>
<img src="https://i.imgur.com/ABGHIUP.png">
<figcaption>The "Publishable key" will live on the client, the "Secret key" will live on the server.</figcaption>
</figure>

Next, you'll need to configure the Mongo URI of the development database. To set up a development database, there are two options: hosting locally or using a hosted solution. To use a locally hosted database, make sure you have MongoDB installed on your local machine.

```shell
sudo apt-get update
sudo apt-get install mongodb
sudo mongod
```

If the `mongod` command errors because it can't find a `/data/db/` directory, you'll have to make the directory yourself.

```
sudo mkdir /data/db
sudo mongod
```

With MongoDB running locally, set `DEV_DATABASE` to `mongodb://localhost`.

A good alternative to hosting locally, even for development, is to use a hosted solution. Follow the steps in the <a href="#create-a-production-database">create a production database</a> section but paste the Mongo URI from Mlab as the value for `DEV_DATABASE` in your `variables.env` file.

## Deploying

The code in the `client` folder and and the code in the `server` folder can be deployed completely independent of each other. This guide will contain instructions for deploying the client to Netlify, a static hosting site, and deploying the server to Heroku.

To get started, fork this repo (or clone it and create a new repo under your GitHub account).

### Deploying the client to Netlify

Netlify is free and deploys work through Git. Log into Netlify, click the "New site from Git" button, connect your GitHub account, and select the repo you just created.

The build command for the client is the `build-client` script located in the `package.json` at the project root. The assets Netlify should server to users are located in the `client/build` folder. Use these to fill in the "Build command" and "Publish directory" inputs in Netlify's deploy settings UI.

<figure>
<img src="https://i.imgur.com/KYunrA5.png">
<figcaption>Build command should be "build-client" and publish directory should be "client/build" </figcaption>
</figure>

The site should successfully deploy under a URL that looks like this `https:example-name-12345.netlify.com` (not a real website). Take note of the the frontend's URL since you'll need it to set up CORS on the server. If you have a custom domain you'd like to use instead, [Netlify makes that easy](https://www.netlify.com/docs/custom-domains/) and you can use that custom domain for the next step.

Take note that, although the site may be live, you won't be able to create an account on it as the API server is not yet deployed and the client isn't configured to send requests to the correct URL.

### Create a production database

To use a database in a production environment, hosting locally won't be an option. A good free database hosting provider I recommend is [Mlab](https://mlab.com/home). After creating an account and logging in, click the "Create new" button under "Mongo DB Deployments". After that, select the "Sandbox" plan type to keep things free. If you choose to change your mind, you can upgrade to a paid plan later.

<figure>
<img src="https://i.imgur.com/tfCM5Lx.png">
<figcaption>Select the "Sandbox" option under Plan Type.</figcaption>
</figure>

After your database is created you'll need to secure it with a username and password by clicking the "Create user" button. Copy the MongoDB URI displayed by Mlab, replacing `<dbuser>` and `<dbpassword>` with the actual username and password you created and save it for the next step.

<figure>
<img src="https://i.imgur.com/yTlLgl7.png">
<figcaption>Copy the MongoDB URI in the fourth line. Replace dbuser and dbpassword with the database's actual username password.</figcaption>
</figure>

### Deploying the server to Heroku

Since Netlify is only for serving static assets, we can't use it to host the API server running Express. For that there are many options, but I'll be outlining the steps to host it for free on Heroku. First, you'll need to [install the Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli#standalone-installation). If you've already done this, skip this step.

```shell
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

Like Netlify, Heroku deployments work via Git. If you've configured the URL of the frontend in `server/constants/frontend.js` first commit your changes.

```shell
git commit -am "Configure correct frontend URL."
```

To deploy, at the project root run the following commands:

```shell
git remote rm heroku
heroku create
```

`git remote rm heroku` will destroy the heroku remote that already exists if you've cloned or forked this repository.

`heroku create` will deploy an empty application to Heroku and create a remote in your local git repository to push to trigger a deploy. You may need to enter your Heroku credentials for this command to work.

After you've created an empty application with `heroku create`, you'll need to copy over some ofthe environment variables in your `variables.env` file you created during <a href="#configuring-the-production-server">the steps to configure the server locally</a>. Open the [apps dashboard](https://dashboard.heroku.com/apps) while logged into Heroku. Select the app you just created and navigate to the "Settings" tab. Click the "Reveal Config Vars" button and enter the appropriate values for the following variables:

- JWT_SECRET should be the same as it is in your `variables.env` file.
- STRIPE_SECRET_TEST should be the same as it is in your `variables.env`.
- PROD_DATABASE should be used instead of DEV_DATABASE. Enter in the Mongo URI of the production database you made on Mlab.

Now you're ready to deploy the server. `git push heroku master` will deploy the application to Heroku. Take note of the URL you just pushed to. You'll need it for the next step.

### Configuring the front end.

The front end needs one more piece of information before it's ready:

1.  The URL of the website you deployed to Heroku

You can configure this in the file located at `client/src/constants/index`.

`PRODUCTION_API_HOSTNAME` should equal the name of the website you deployed to Heroku. Make sure to remove the "https://" at the beginning.

Double check to make sure you've configured `STRIPE_PUBLISHABLE_TEST_KEY` as was done in <a href="#configuring-the-production-server">a previous step where you logged into the Stripe developer dashboard.</a>

## Future deploys

With everything set up, whenever you make a change, first commit that change and you'll have two options:

`git push`

Will trigger a redeploy of the client to Netlify. Or:

`git push heroku master`

Will trigger a redploy of the API server to Heroku. Execute both commands to update both.
