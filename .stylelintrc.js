module.exports = {
    extends: 'stylelint-config-standard',
    rules: {
        'selector-pseudo-element-no-unknown': [true, {ignorePseudoElements: ['deep']}],
        'selector-pseudo-class-no-unknown': [true, {ignorePseudoClasses: ['deep']}],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        indentation: 4,
    },
};
