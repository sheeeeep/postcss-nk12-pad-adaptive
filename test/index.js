const fs = require('fs')
const chai = require('chai')
const postcss = require('postcss')
const expect = chai.expect
const adaptive = require('../')

describe('option', () => {
    it('global: true && without pad-adaptive comment', () => {
        const fixture = '.a { height: 64px;}'
        const expected = '.a { height: 64px;}@media screen and (min-width: 768px) {.a { height: 32px;}}'
        const output = postcss().use(adaptive({ global: true })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('global: false && without pad-adaptive comment', () => {
        const fixture = '.a { height: 64px;}'
        const expected = '.a { height: 64px;}'
        const output = postcss().use(adaptive({ global: false })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('global: true && with pad-adaptive comment', () => {
        const fixture = '/*pad-adaptive*/.a { height: 64px;}'
        const expected = '/*pad-adaptive*/.a { height: 64px;}@media screen and (min-width: 768px) {.a { height: 32px;}}'
        const output = postcss().use(adaptive({ global: true })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('global: false && with pad-adaptive comment', () => {
        const fixture = '/*pad-adaptive*/.a { height: 64px;}'
        const expected = '/*pad-adaptive*/.a { height: 64px;}@media screen and (min-width: 768px) {.a { height: 32px;}}'
        const output = postcss().use(adaptive({ global: false })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('includeDecls', () => {
        const fixture = '.a { width: 64px; height: 64px;}'
        const expected = '.a { width: 64px; height: 64px;}@media screen and (min-width: 768px) {.a { height: 32px;}}'
        const output = postcss().use(adaptive({
            global: true,
            includeDecls: ['height']
        })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('includeDecls', () => {
        const fixture = '.a { width: 64px; height: 64px;}'
        const expected = '.a { width: 64px; height: 64px;}@media screen and (min-width: 768px) {.a { height: 32px;}}'
        const output = postcss().use(adaptive({
            global: true,
            includeDecls: ['height']
        })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('breakRules', () => {
        const fixture = '.a { width: 64px; height: 64px;}'
        const expected = '.a { width: 64px; height: 64px;}@media screen and (min-width: 768px) {.a { width: 32px; height: 32px;}}@media screen and (min-width: 1200px) {.a { width: 21.333333333333332px; height: 21.333333333333332px;}}'
        const output = postcss().use(adaptive({
            global: true,
            breakRules: [{
                bound: 768,
                multiple: 2
            }, {
                bound: 1200,
                multiple: 3
            }]
        })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    })

    it('nka-no & nka-yes', () => {
        const fixture = '.a { width: 64px;/*nka-no*/ height: 64px;/*nka-no*/ padding: 100px; border-radius: 20px;/*nka-yes*/ font-size: 16px;/*nka-yes*/ }'
        const expected = '.a { width: 64px;/*nka-no*/ height: 64px;/*nka-no*/ padding: 100px; border-radius: 20px;/*nka-yes*/ font-size: 16px;/*nka-yes*/ }@media screen and (min-width: 768px) {.a { padding: 50px; border-radius: 10px; font-size: 8px; } }'
        const output = postcss().use(adaptive({
            global: true,
            breakRules: [{
                bound: 768,
                multiple: 2
            }]
        })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    });

    it('ignore media', () => {
        const fixture = '@charset "UTF-8";.a { width: 64px; height: 64px;} @media screen and (min-width: 250px){.b { width: 64px; height: 64px;}}'
        const expected = '@charset "UTF-8";.a { width: 64px; height: 64px;} @media screen and (min-width: 250px){.b { width: 64px; height: 64px;}} @media screen and (min-width: 768px){.a { width: 32px; height: 32px;}}'
        const output = postcss().use(adaptive({
            global: true,
        })).process(fixture).css
        expect(output).is.a.string
        expect(output).eql(expected)
    })
})