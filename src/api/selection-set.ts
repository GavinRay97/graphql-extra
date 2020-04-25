import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */

export class SelectionSetApi extends Mix(Mixin.KindAssertionApiMixin) {
  constructor(readonly node: GQL.SelectionSetNode) {
    super([node])

    validateNodeKind(Kind.SELECTION_SET, node)
  }

  isEmpty(): boolean {
    return this.node.selections.length === 0
  }

  // createField(props: FieldNodeProps | GQL.FieldNode) {
  //   oneToManyCreate({
  //     node: this.node,
  //     nodeCreateFn: fieldNode,
  //     key: 'selections',

  //   })
  // }
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi {
  return new SelectionSetApi(node)
}
