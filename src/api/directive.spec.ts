import { Api, Mixin, Ast } from '../internal'

describe(Api.DirectiveApi.name, () => {
  const value = Ast.intValueNode(123)
  const argument = Ast.argumentNode({ name: 'age', value })

  const node = Ast.directiveNode({ name: 'Cache', arguments: [argument] })

  const api = Api.directiveApi(node)

  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('Cache')
    })

    test(Mixin.ArgumentsApiMixin.name, () => {
      expect(api.getArgument('age').getValue()).toEqual(value)
    })
  })
})
