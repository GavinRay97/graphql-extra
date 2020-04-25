import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Directivename } from '../types'
import {
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemoveOrFail,
  oneToManyFindOneOrFail,
  getName,
} from '../utils'

/**
 * @category API Mixins
 */
export type DirectivesApiMixinNode =
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.FragmentSpreadNode
  | GQL.InputValueDefinitionNode
  | GQL.OperationDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.SchemaExtensionNode
  | GQL.TypeDefinitionNode
  | GQL.TypeExtensionNode
  | GQL.InlineFragmentNode

/**
 * @category API Mixins
 */
export class DirectivesApiMixin {
  constructor(readonly node: DirectivesApiMixinNode) {}

  getDirectiveNames(): Directivename[] {
    return this.node.directives?.map((dir) => dir.name.value) ?? []
  }

  hasDirective(directivename: Directivename): boolean {
    if (!this.node.directives) return false

    return this.node.directives.some((dir) => dir.name.value === directivename)
  }

  getDirectives(): Api.DirectiveApi[] {
    return this.node.directives?.map(Api.directiveApi) ?? []
  }

  getDirective(directivename: Directivename): Api.DirectiveApi {
    const directive = oneToManyFindOneOrFail({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
    })

    return Api.directiveApi(directive)
  }

  createDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this {
    oneToManyCreate({
      node: this.node,
      key: 'directives',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: Ast.directiveNode,
      props,
    })

    return this
  }

  updateDirective(
    directivename: Directivename,
    props: Ast.DirectiveNodeProps | Partial<Ast.DirectiveNodeProps | GQL.DirectiveNode>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
      factory: Ast.directiveNode,
      props,
    })

    return this
  }

  upsertDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this {
    oneToManyUpsert({
      node: this.node,
      key: 'directives',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: Ast.directiveNode,
      props,
    })

    return this
  }

  removeDirective(directivename: Directivename): this {
    oneToManyRemoveOrFail({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
    })

    return this
  }
}

/**
 * @category API Mixins
 */
export function directivesApiMixin(node: DirectivesApiMixinNode): DirectivesApiMixin {
  return new DirectivesApiMixin(node)
}
