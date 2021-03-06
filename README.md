# PostCSS font-family Correction

[![npm version](https://img.shields.io/npm/v/postcss-font-family-correction.svg)](https://www.npmjs.com/package/postcss-font-family-correction)

A [PostCSS] plugin to correct `font-family` values.

[PostCSS]: https://github.com/postcss/postcss

```css
.regular {
  font-family: PingFangSC-Regular;
}

.medium {
  font-family: PingFangSC-Medium;
}

.semibold {
  font-family: PingFangSC-Semibold;
}
```

will be processed to:

```css
.regular {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 400;
}

.medium {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 500;
}

.semibold {
  font-family: 'PingFang SC', sans-serif;
  font-weight: 600;
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-font-family-correction
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-font-family-correction'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

## Options

- `mappings`: `font-family` mappings
- `preserveComments`: Preserve ignore comments
- `clearFontFamily`: Clear `font-family` property
- `overwriteFontWeight`: Overwrite existing `font-weight` property

Example:

```js
module.exports = {
  plugins: [
    require('postcss-font-family-correction')({
      mappings: {},
      preserveComments: true,
      clearFontFamily: false,
      overwriteFontWeight: false,
    }),
  ]
}
```

### `mappings`

Object format:

```js
postcss([
  require('postcss-font-family-correction')({
    mappings: {
      'PingFangSC-Regular': {
        fontFamily: 'PingFang SC',
        fontWeight: 400
      },
      'PingFangSC-Medium': {
        fontFamily: 'PingFang SC',
        fontWeight: 500
      },
      'PingFangSC-Semibold': {
        fontFamily: 'PingFang SC',
        fontWeight: 600
      }
    }
  })
]);
```

Array format:

```js
postcss([
  require('postcss-font-family-correction')({
    mappings: {
      'PingFangSC-Regular': ['PingFang SC', 400],
      'PingFangSC-Medium': ['PingFang SC', 500],
      'PingFangSC-Semibold': ['PingFang SC', 600]
    }
  })
]);
```

### `preserveComments`

```css
.regular {
  /* font-family-correction-ignore-next */
  font-family: PingFangSC-Regular;
}

.medium {
  font-family: PingFangSC-Medium;
}

.semibold {
  font-family: PingFangSC-Semibold; /* font-family-correction-ignore */
}
```
