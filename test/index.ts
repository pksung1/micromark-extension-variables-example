import assert from 'node:assert/strict'
import test from 'node:test'
import {micromark} from 'micromark'
import {variables, variablesHtml} from '../dev/lib/index.js'

test('variables', () => {
  assert.equal(micromark('# Hello, world!', {
    extensions: [variables],
  }), '<h1>Hello, world!</h1>');
});


test('variablesHtml', () => {
  assert.equal(micromark('Hello, {name}! {greeting}', {
    extensions: [variables],
    htmlExtensions: [variablesHtml({ name: 'John', greeting: 'Hello' })],
  }), '<p>Hello, John! Hello</p>');
});