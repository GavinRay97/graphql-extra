import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Ast } from '../internal'
import { mutable } from '../utils'

/**
 * @category API Mixins
 */
export type DescriptionApiMixinNode =
  | GQL.DirectiveDefinitionNode
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.TypeDefinitionNode

/**
 * @category API Mixins
 */
export class DescriptionApiMixin {
  constructor(readonly node: DescriptionApiMixinNode) {}

  hasDescription(value?: string): boolean {
    if (value) {
      return this.node.description?.value === value
    }

    return !!this.node.description?.value
  }

  getDescription(): string | undefined {
    return this.node.description?.value
  }

  setDescription(value: string | undefined): this {
    if (typeof value === 'undefined') {
      mutable(this.node).description = undefined
    }
    else {
      mutable(this.node).description = Ast.stringValueNode(value)
    }

    return this
  }
}

/**
 * @category API Mixins
 */
export function descriptionApiMixin(node: DescriptionApiMixinNode): DescriptionApiMixin {
  return new DescriptionApiMixin(node)
}
