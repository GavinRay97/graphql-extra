import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Hooks, Mixin } from '../internal'
import { mutable, validateNodeKind } from '../utils'

/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export class InputValueDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InputValueDefinitionNode) {
    super([node])

    validateNodeKind(Kind.INPUT_VALUE_DEFINITION, node)
  }


  // export interface InputValueDefinitionNode {
  //   readonly kind: 'InputValueDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly type: TypeNode;
  //   readonly defaultValue?: ValueNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly type = Hooks.typeMixin(this.node)

  // readonly defaultValue = // TODO:

  readonly directives = Hooks.directivesMixin(this.node)

  toField(): Api.FieldDefinitionApi {
    const {
      kind, defaultValue, loc, ...rest
    } = this.node

    return Api.fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
  }

  // TODO: value node helper
  getDefaultValue(): GQL.ValueNode | undefined {
    return this.node.defaultValue
  }

  // TODO: value node helper
  setDefaultValue(value: GQL.ValueNode): InputValueDefinitionApi {
    mutable(this.node).defaultValue = value

    return this
  }
}

/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */

export function inputValueDefinitionApi(node: GQL.InputValueDefinitionNode): InputValueDefinitionApi {
  return new InputValueDefinitionApi(node)
}
