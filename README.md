# Macadamia Nuts 🐿 🌰 😋

[![code style prettier](https://img.shields.io/badge/code_style-prettier-FF69A4.svg)](https://prettier.io/) [![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![typescript](https://user-images.githubusercontent.com/15273233/40872275-a61d4660-669f-11e8-8edf-860f1947759f.png)](https://www.typescriptlang.org/)

## What 👋

A [Google Chrome](https://www.google.com/chrome/) experiment to simulate _3D_ aesthetics within a browser's traditional DOM environment.

## Why 🤷‍♀️

This is a fun investigation into some lesser-used browser features that when composed with simple math sequences can yield visually interesting results.

## Demo 🕹

### ➡️ **[You can try the interactive demo here!](https://devonchurch.github.io/macadamia-nuts/)** ⬅️

---

![macadamia-nuts-demo](https://user-images.githubusercontent.com/15273233/79106113-f8895300-7dc5-11ea-9225-5f9f5fed45c5.gif)

## How 💡

The _3D_ system is built around [CSS Perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective), [CSS Filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter) and [CSS Blend Modes](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode).

### [CSS Perspective](https://developer.mozilla.org/en-US/docs/Web/CSS/perspective)

Allows the interactive manipulation of our `<svg />` icons on the _**z-axis**_. This is the foundation for creating the _3D_ _"feel"_. The perspective offset is based on the users' pointer position and has a _min_/_max_ threshold to ensure the `<svg />` icon is always legible.

```scss
.perspective {
  perspective: 80rem;

  .icon {
    transform: rotateY(...) rotateX(...);
  }
}
```

### [CSS Filters](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)

The solution for giving the `<svg />` icon depth. Specifically using `filter: drop-shadow(...)` to layer up a convincing _**z-axis**_ surface. Using [Styled Components](https://styled-components.com/) allowed the multiple `drop-shadow` layers to be rendered at run time with an incrementing offset.

```scss
// prettier-ignore
.icon {
  filter: 
    drop-shadow(...) 
    drop-shadow(...) 
    drop-shadow(...) 
    drop-shadow(...)
    drop-shadow(...) 
    drop-shadow(...) 
    drop-shadow(...) 
    drop-shadow(...)
    drop-shadow(...) 
    drop-shadow(...);
}
```

### [CSS Blend Modes](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)

Created a lighting solution that would _blend_ into a scene dynamically against the various different icon color pallets. I opted for a `multiply` function to bring our the _dark_ and _light_ areas with realistic intensities.

The lights focus is based on the users' pointer position, effectively lighting the part of the `<svg />` icon that is closest to the users in the _z-axis_.

```scss
.lighting {
  background: radial-gradient(...);
  mix-blend-mode: multiply;
}
```

## Installation 🤖

- Clone this repository

  ```
  git clone https://github.com/devonChurch/macadamia-nuts.git && cd macadamia-nuts
  ```

- Install project dependencies

  ```
  nvm use && npm i
  ```

- Start a development server on [Port 3000](http://localhost:3000/)

  ```
  npm start
  ```

## Deployment 🏁

- Create a _Production_ build

  ```
  nvm run build
  ```

- Deploy the application to `gh-pages`

  ```
  nvm run deploy
  ```

## License 📜

MIT
