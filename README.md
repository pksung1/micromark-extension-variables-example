# micromark-extension-variables-example

A micromark extension implementation example for handling variables in markdown. This project demonstrates how to create a custom extension that parses and replaces variables in markdown text.

Based on the [micromark variables example](https://github.com/micromark/micromark?tab=readme-ov-file#case-variables), rewritten entirely in TypeScript.

## Usage

### Basic Setup

Import the extension and HTML handler:

```typescript
import {micromark} from 'micromark'
import {variables, variablesHtml} from './dev/lib/index.js'
```

### Parsing Variables

To parse variables in markdown, add the `variables` extension:

```typescript
const html = micromark('# Hello, world!', {
  extensions: [variables],
})
// Result: '<h1>Hello, world!</h1>'
```

### Replacing Variables with Values

To replace variables with actual values, use the `variablesHtml` function with a data object:

```typescript
const html = micromark('Hello, {name}! {greeting}', {
  extensions: [variables],
  htmlExtensions: [variablesHtml({ 
    name: 'John', 
    greeting: 'Hello' 
  })],
})
// Result: '<p>Hello, John! Hello</p>'
```

### Variable Syntax

Variables are defined using curly braces: `{variableName}`

- Variables can contain any characters except newlines
- To escape a curly brace or backslash, use a backslash: `\{` or `\\`
- If a variable is not found in the data object, it will be omitted from the output

## Running Tests

```bash
npm test
```

## Project Structure

- `dev/lib/` - Extension implementation
  - `index.ts` - Main exports (`variables` extension and `variablesHtml` function)
  - `variable-construct.ts` - Tokenizer for variable syntax
  - `html.ts` - HTML handlers for variable replacement
- `test/` - Test files
- `types/` - define type `variableString` 