'use strict';

module.exports.rules = {
    'no-private-import': require('./rules/no-private-import')
};

module.exports.configs = {
    recommended: {
        rules: {
            'no-private-import/no-private-import': 2
        }
    }
};
