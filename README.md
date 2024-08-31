# Fraught

Project links: 
* [Itch (play the game here!)](https://mapsandapps.itch.io/fraught)
* [Vercel deploy](https://fraught-git-main-mapsandapps-projects.vercel.app/)
* [Vercel admin](https://vercel.com/mapsandapps-projects/fraught)
* [Stackblitz](https://stackblitz.com/~/github.com/mapsandapps/fraught)
* [GitHub](https://github.com/mapsandapps/fraught)

Created for [Eggjam #23](https://itch.io/jam/eggjam-23). The theme of the jam is 'Fighting Words 🥊'. This game doesn't actually match the theme, but I did come up with the idea because of the theme. Hopefully that's good enough.

It has a very different tone from any game I've made before. It's too early to see if this is a trend or a one-off.

I originally planned to make this in Twine, but then my time & programming commitments changed, and I decided to do the fastest thing possible which (for me) was building it in React.

I'm using a StackBlitz starter.

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Assets

Assets (e.g. images) can go either in `src/assets` or in `public`.

```html
<div>
  <a href="https://vitejs.dev" target="_blank">
    <img src={viteLogo} className="logo" alt="Vite logo" />
  </a>
  <a href="https://react.dev" target="_blank">
    <img src={reactLogo} className="logo react" alt="React logo" />
  </a>
</div>
```

```ts
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
```

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
