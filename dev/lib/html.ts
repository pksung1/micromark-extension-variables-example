import type { CompileContext, Handle, Token } from "micromark-util-types"

export function enterVariableString(this: CompileContext, token: Token): ReturnType<Handle> {
  this.buffer()
}

export function exitVariableString(data: Record<string, string> = {}): Handle {
  return function(this: CompileContext, token: Token) {
    var id = this.resume()
    if (id in data) {
      this.raw(this.encode(data[id]))
    }
  }
}