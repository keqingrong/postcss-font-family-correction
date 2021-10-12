const defaluts = require('./defaluts');
const { normalizeMappings } = require('./utils');

const ignoreNextComment = 'font-family-correction-ignore-next';
const ignoreComment = 'font-family-correction-ignore';

/** @type {import('./index').Plugin} */
module.exports = (options = {}) => {
  const opts = Object.assign({}, defaluts, options);
  const mappings = normalizeMappings(opts.mappings);
  return {
    postcssPlugin: 'postcss-font-family-correction',
    Declaration: {
      'font-family': decl => {
        const original = decl.value;
        const mapping = mappings[original];
        if (!mapping) {
          return;
        }

        const prev = decl.prev();
        if (
          prev &&
          prev.type === 'comment' &&
          prev.text === ignoreNextComment
        ) {
          prev.remove();
          return;
        }

        const next = decl.next();
        if (next && next.type === 'comment' && next.text === ignoreComment) {
          next.remove();
          return;
        }

        const { fontFamily, fontWeight } = mapping;
        decl.value = fontFamily;

        if (fontWeight) {
          const { nodes = [] } = decl.parent;
          const fontWeightDecl = nodes.find(
            decl => decl.prop === 'font-weight'
          );
          if (!fontWeightDecl) {
            const newDecl = decl.clone({
              prop: 'font-weight',
              value: fontWeight,
            });
            decl.after(newDecl);
            return;
          }
        }
      },
    },
  };
};
module.exports.postcss = true;
