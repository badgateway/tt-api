# ⏳ Unnamed Time Tracking API ⌛️

A project to track work on projects for clients.

## 📦 Getting started

### Requirements Overview

The following are required to run this project:

- Node & NPM installed, package dependencies installed `npm i`.
- [Authenticated your local NPM with github packages](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-with-a-personal-access-token) for access to private Badgateway github packages.
- MySQL database set up and running.

### Gaining Access to Private Badgateway Github Packages

If `npm i` first gave you an error, you might need to get access to our Github
packages first.

Follow the steps here:

1. Go to your Github Settings > Developer Settings > Personal Access Tokens
2. Generate yourself a new one, give it read/write packages permissions. (save the PAT, cant be found again)
3. Navigate to your home directory, find or create a `.npmrc` file, add the following line
   `//npm.pkg.github.com/:_authToken=[your-recently-generated-PAT]`

Now when running 'npm i' the node modules will be downloaded.

### Setting Up The Database

Create a mysql database for this project. We're using "tt" as an identifier here often, shortform for "time tracking". Set the database user password `your_password` to your own appropriate password.
```
mysql> CREATE DATABASE tt;
mysql> CREATE USER 'tt' IDENTIFIED BY 'your_password';
mysql> GRANT SELECT, REFERENCES, INSERT, UPDATE, DELETE, ALTER, CREATE, DROP ON tt.* TO 'tt';
mysql> FLUSH PRIVILEGES;
```

Run `cp .env.defaults .env` to set up your configuration. Update `.env` with the database username and password you set up.

Populate the database using knex, which should add tables automatically.
```bash
$ npx knex --knexfile src/knexfile.ts migrate:latest
```

This should populate your database with the required tables.

### Configure OAuth2

After a12n-server is running, and you have confirmed you can log in, you'll need to add an 'app' principal and OAuth 2 credentials. The easiest way to do this is by opening:

http://localhost:8531/app/new?nickname=tt-api&url=http://localhost:8901/&clientId=tt-api&allowedGrantTypes=authorization_code,client_credentials,refresh_token&redirectUris=http://localhost:8901/_browser-auth

At the end of this process, this will give you a 'client secret'. Copy this secret and add it to your `.env` file in the OAUTH2_CLIENT_SECRET value.

Now that the app has been created, give it `*admin` privileges.
```json
{
  "*": [
    "admin"
  ]
}
```

## 🎬 Running
From the root directory, initiate the project with `make start-dev` (make sure the deps are installed).

The API server can be browsed at http://localhost:8901/.
