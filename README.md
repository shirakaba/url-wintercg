# URL implementation for WinterCG

[![npm status](https://img.shields.io/npm/v/url-wintercg.svg)](https://npm.im/url-wintercg)

A polyfill for WHATWG [URL](https://url.spec.whatwg.org/#url-parsing) and related APIs:

- [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL)
- [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

This package is a [Node-API](https://nodejs.org/api/n-api.html)-based module that wraps the [Ada](https://github.com/ada-url/ada) native implementation of URL, so can be used in any JavaScript engine or runtime that supports Node-API.

To clarify, this project is not affiliated with [WinterCG](https://wintercg.org) (i.e. is not an official work). It merely implements part of the WinterCG [Common Minimum API](https://github.com/wintercg/proposal-common-minimum-api) proposal.

## Installation

Install this npm package as follows:

```sh
npm install url-wintercg
```

## Usage

### As a polyfill

Run this polyfill in your app's entrypoint file so that it fills in the APIs as early as possible in the app lifecycle.

```js
import { polyfill } from "url-wintercg";

polyfill(globalThis);

// All implemented APIs will now be available in global scope

const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);
console.log(params);
```

And for TypeScript typings, add the `DOM` lib in `tsconfig.json`:

```js
{
  "compilerOptions": {
    "lib": ["DOM"],
    // ...
  }
}
```

### As a module

Here, we import from the npm package each time we want to use an API, rather than polyfilling globally.

```js
import { Event, EventTarget } from "url-wintercg";

const url = new URL("https://example.com?foo=1&bar=2");
const params = new URLSearchParams(url.search);
console.log(params);
```

Some limited TypeScript typings will be inferred from the library's JavaScript source code, but if you'd rather use the `lib.dom.d.ts` typings built into TypeScript (which I would recommend), then:

1. Add the `DOM` lib in `tsconfig.json`:

   ```js
   {
     "compilerOptions": {
       "lib": ["DOM"],
       // ...
     }
   }
   ```

2. Do this little dance:

   ```ts
   import {
     URL as URLImpl,
     URLSearchParams as URLSearchParamsImpl,
   } from "url-wintercg";

   // Redeclare the implementation using the types from lib.dom.d.ts
   const URL = URLImpl as unknown as URL;
   const URLSearchParams = URLSearchParamsImpl as unknown as URLSearchParams;

   const url = new URL("https://example.com?foo=1&bar=2");
   const params = new URLSearchParams(url.search);
   console.log(params);
   ```

### Via a bundler

This is my best-effort attempt to document usage with a bundler. These instructions are **untested**, so please open a PR if you find they need tweaking!

In all cases, you can set up TypeScript typings via adding the `DOM` lib to your `tsconfig.json`:

```js
{
  "compilerOptions": {
    "lib": ["DOM"],
    // ...
  }
}
```

Below, I'll describe for each bundler how to integrate this package into your bundle.

#### Webpack 5

This configuration ensures that all the implemented APIs are available from global scope:

```js
const webpackConfig = {
  plugins: [
    new webpack.ProvidePlugin({
      URL: ["url-wintercg", "URL"],
      URLSearchParams: ["url-wintercg", "URLSearchParams"],
    }),
  ],
};
```

## Prerequisites

Your JS engine/runtime must support:

- [process.dlopen()](https://nodejs.org/docs/latest/api/process.html#processdlopenmodule-filename-flags) (if using ESM)
- [require()](https://nodejs.org/api/modules.html#requireid) (if using CommonJS)
- [Node-API](https://nodejs.org/api/n-api.html)

## Resources

- https://github.com/nodejs/node-addon-api/tree/main/doc
- https://github.com/nodejs/node-addon-examples/tree/main
- http://nodejs.github.io/node-addon-examples/getting-started/first
- https://nodejs.org/api/n-api.html
- https://github.com/nodejs/node/blob/main/lib/internal/url.js
