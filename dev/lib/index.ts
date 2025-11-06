import {codes} from 'micromark-util-symbol'
import type {Construct, Extension, HtmlExtension} from 'micromark-util-types'
import { enterVariableString, exitVariableString } from './html.js'
import { variableTokenize } from './variable-construct.js'

const variableConstruct: Construct = {name: 'variable', tokenize: variableTokenize}

// { 를 만나면 varaibleConstruct 의 tokenize 함수를 실행합니다
export const variables: Extension = {text: {[codes.leftCurlyBrace]: variableConstruct}}


// variableString 타입의 토큰을 처리하는 함수를 반환합니다
export function variablesHtml(data: Record<string, string> = {}): HtmlExtension {
  return {
    enter: {"variableString": enterVariableString},
    exit: {"variableString": exitVariableString(data)},
  }
}