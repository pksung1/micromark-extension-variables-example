# micromark-extension-variables-example

마크다운에서 변수를 처리하는 micromark 확장 구현 예제입니다. 이 프로젝트는 마크다운 텍스트에서 변수를 파싱하고 치환하는 커스텀 확장을 만드는 방법을 보여줍니다.

[micromark variables 예제](https://github.com/micromark/micromark?tab=readme-ov-file#case-variables)를 기반으로 TypeScript로 완전히 재작성했습니다.


## 사용 방법

### 기본 설정

extension과 HTML 핸들러를 import합니다:

```typescript
import {micromark} from 'micromark'
import {variables, variablesHtml} from './dev/lib/index.js'
```

### 변수 파싱

마크다운에서 변수를 파싱하려면 `variables` 확장을 추가합니다:

```typescript
const html = micromark('# Hello, world!', {
  extensions: [variables],
})
// 결과: '<h1>Hello, world!</h1>'
```

### 변수를 값으로 치환

변수를 실제 값으로 치환하려면 데이터 객체와 함께 `variablesHtml` 함수를 사용합니다:

```typescript
const html = micromark('Hello, {name}! {greeting}', {
  extensions: [variables],
  htmlExtensions: [variablesHtml({ 
    name: 'John', 
    greeting: 'Hello' 
  })],
})
// 결과: '<p>Hello, John! Hello</p>'
```

### 변수 문법

변수는 중괄호를 사용하여 정의됩니다: `{variableName}`

- 변수는 줄바꿈을 제외한 모든 문자를 포함할 수 있습니다
- 중괄호나 백슬래시를 이스케이프하려면 백슬래시를 사용합니다: `\{` 또는 `\\`
- 데이터 객체에서 변수를 찾을 수 없으면 출력에서 생략됩니다

## 테스트 실행

```bash
npm test
```

## 프로젝트 구조

- `dev/lib/` - 확장 구현
  - `index.ts` - 주요 export (`variables` 확장과 `variablesHtml` 함수)
  - `variable-construct.ts` - 변수 문법을 위한 토크나이저
  - `html.ts` - 변수 치환을 위한 HTML 핸들러
- `test/` - 테스트 파일
- `types/` - `variableString` 타입 정의 

