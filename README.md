# Mercado Libre Challenge

Full application with client side and server side to provide a list of products using Razzle and React for SSR (Server side rendering provide SEO capabilities explained [here](https://medium.com/walmartlabs/the-benefits-of-server-side-rendering-over-client-side-rendering-5d07ff2cefe8)).


## Stack


**Front-end**

- [React](https://facebook.github.io/react/)
- [React Router](https://reacttraining.com/react-router/)
- [Redux](http://redux.js.org/)
- [Redux Thunk](https://github.com/gaearon/redux-thunk)
- [Axios](https://github.com/mzabriskie/axios)
- [Sass](http://sass-lang.com/)

**Back-end**

- [Express](http://expressjs.com/pt-br/)
- [Razzle](https://github.com/jaredpalmer/razzle)
- [Requestify](http://ranm8.github.io/requestify/)

## How to use

Install:

```bash
yarn install
```

Run development:

```bash
yarn start
```

To run in production mode:

```bash
yarn build
yarn start:prod
```

*Live on http://localhost:3000.*

## Docker

This application is configured to use docker compose for scalability purpose and scripts was add on package.json to be easy to use.

**Development**

```bash
yarn docker:build 
yarn docker:up
```
*Live on http://localhost:3000.*


**Production**

```bash
yarn docker-prod:build 
yarn docker-prod:up
```
*Live on http://localhost:3000 by default.*

The port is configured in .env file on root.
If you want to change, only edit the variables for production mode:

```env
RAZZLE_URL_API=http://localhost:3000/api
RAZZLE_PORT_API=3000
```

**Docker compose commands**

If you prefer to use docker cli instead of yarn (npm) scripts then run:

**Development**

```bash
docker-compose build
docker-compose up
```

**Production**

```bash
docker-compose -f docker-compose.production.yml build
docker-compose -f docker-compose.production.yml up
```