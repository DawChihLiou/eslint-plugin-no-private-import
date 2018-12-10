'use strict';

module.exports = {
    meta: {
        type: 'problem',
        docs: {
            description: 'disallow import from private directory',
            category: 'Best Practices',
            recommended: true
        },
        schema: []
    },
    create(context) {
        const regex = /^.*\/(src|source|lib|\..*)\/.*$/;
        const message = 'Do not import module from private directory';

        return {
            ImportDeclaration(node) {
                if (regex.test(node.source.value)) {
                    context.report({ node, message });
                }
            },
            VariableDeclaration(node) {
                node.declarations.forEach(declarator => {
                    if (
                        declarator.init &&
                        declarator.init.callee &&
                        declarator.init.callee.name === 'require'
                    ) {
                        declarator.init.arguments.forEach(argument => {
                            if (regex.test(argument.value)) {
                                context.report({ node, message });
                            }
                        });
                    }
                });
            }
        };
    }
};
