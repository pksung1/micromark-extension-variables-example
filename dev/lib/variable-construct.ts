import { codes } from "micromark-util-symbol"
import type { Code, Construct, Effects, Extension, State, TokenizeContext} from "micromark-util-types"


const variableConstruct: Construct = {name: 'variable', tokenize: variableTokenize}

// { 를 만나면 varaibleConstruct 의 tokenize 함수를 실행합니다
export const variables: Extension = {text: {[codes.leftCurlyBrace]: variableConstruct}}

export function variableTokenize(this: TokenizeContext, effects: Effects, ok: State, nok: State): State {
  return start

  function start(code: Code): ReturnType<State> {
    effects.consume(code)
    effects.enter('variableString')
    effects.enter('chunkString', { contentType: 'string'})
    return begin
  }

  // } 를 만나면 nok 함수를 실행합니다
  // 그 외의 경우는 inside 함수를 실행합니다
  function begin(code: Code): ReturnType<State> {
    return code === codes.rightCurlyBrace ? nok(code) : inside(code)
  }

  // 중간 상태에서 문자를 처리합니다
  function inside(code: Code): ReturnType<State> {
    if (code === codes.carriageReturn || code === codes.lineFeed || code === codes.carriageReturnLineFeed || code === null) {
      return nok(code)
    }

    if (code === codes.backslash) {
      effects.consume(code)
      return insideEscape
    }

    if (code === codes.rightCurlyBrace) {
      effects.exit('chunkString')
      effects.exit('variableString')
      effects.consume(code)
      return ok
    }

    effects.consume(code)
    return inside
  }

  // \ 나 } 를 만나면 inside 함수를 실행합니다
  function insideEscape(code: Code): State | undefined {
      if (code === codes.backslash || code === codes.rightCurlyBrace) {
        effects.consume(code)
        return inside
      }
  
      return inside(code)
    }
}
