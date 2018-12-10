'use strict';

const rule = require('../../../lib/rules/no-private-import');
const RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
});

const tester = new RuleTester();

tester.run('no-private-import', rule, {
    valid: [
        // common js
        'const get = require("lodash/get")',

        // static import
        'import _ from "lodash"',
        'import { get } from "lodash"',
        'import get from "lodash/get"',

        // dynamic import
        // 'const get = import("lodash/get")',
        // 'const get = loadable.lib(() => import("lodash/get"))',
    ],
    invalid: [
        // common js
        {
            code: 'const baseGet = require("lodash/.internal/baseGet")',
            errors: [
                {
                    message: 'Do not import module from private directory',
                    type: 'VariableDeclaration',
                },
            ],
        },

        // static import
        {
            code: 'import baseGet from "lodash/.internal/baseGet"',
            errors: [
                {
                    message: 'Do not import module from private directory',
                    type: 'ImportDeclaration',
                },
            ],
        },
        {
            code: 'import {baseGet} from "lodash/.internal/baseGet"',
            errors: [
                {
                    message: 'Do not import module from private directory',
                    type: 'ImportDeclaration',
                },
            ],
        },

        //dynamic import
        // {
        //     code: 'const baseGet = import("lodash/.internal/baseGet")',
        //     errors: [
        //         {
        //             message: 'Do not import module from private directory',
        //             type: 'VariableDeclaration',
        //         },
        //     ],
        // },
        // {
        //     code:
        //         'const baseGet = loadable.lib(() => import("lodash/.internal/baseGet"))',
        //     errors: [
        //         {
        //             message: 'Do not import module from private directory',
        //             type: 'VariableDeclaration',
        //         },
        //     ],
        // },
    ],
});
