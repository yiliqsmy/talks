import postcss from 'postcss';
import getPageStyles from './get-page-styles';
import replacePageStyles from './replace-page-styles';

const randomKeywordPlugin = postcss.plugin('random-keyword', () => {
  return (css) => {
    css.walkRules((rule) => {
      rule.walkDecls((decl, i) => {
        if (decl.value.includes('random')) {
          const elements = document.querySelectorAll(rule.selector);
          for (const element of elements) {
            element.style[decl.prop] =
                decl.value.replace('random', Math.random());
          }
        }
      });
    });
  };
});

getPageStyles()
  .then((css) => postcss([randomKeywordPlugin]).process(css))
  .then((result) => replacePageStyles(result.css));
