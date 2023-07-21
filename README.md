<p align="center"><img src="./public/logo.png" alt="Logo" width="300" height="300"></p>
<h1 align="center">Glam</h1>
<h4 align="center">A cosmetics e-commerce store built using next js, sanity and typescript.</h4>

# Features

- [x] Modern and responsive UI.
- [x] Integration of payment system (stripe).
- [x] CMS for managing products (sanity).
- [x] Persistent cart over multiple sessions.
- [x] Editable cart.
- [x] Product categories and filters.
- [x] Notification toasts.
- [x] [Youtube Demo](https://youtu.be/zVBGZrwLYt0)

# Demo

![Demo](./public/demo.gif)


# Setup

```bash
$ git clone https://github.com/FallenDeity/Glam
$ cd Glam
$ npm install
```

# Build

```bash
$ npm run build
```

Internally calls for next to build the project.

# Test

```bash
$ npm run test
```

Internally calls for mocha to run the tests.

# Run

```bash
$ npm run dev
```

Internally calls for next to run the project in development mode.

# Others

- `npm run lint` - Runs eslint on the project.
- `npm run lint:fix` - Runs eslint on the project and fixes the errors.
- `npm run prettier` - Runs prettier on the project.
- `npm run prettier:fix` - Runs prettier on the project and fixes the errors.

> **Note**  
> Few more commands are available in `package.json` under `scripts` section.
