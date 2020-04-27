import type * as GQL from 'graphql'
import { Kind, parseType } from 'graphql'

import {
  applyPropsNullableArr,
  applyProps,
  applyPropsNullable,
  applyPropsArr,
  applyNullableImplicit,
} from './utils'

//
// ─── NAME ───────────────────────────────────────────────────────────────────────
//

/**
 * `NameNode` create input subtype
 *
 * @category AST Node
 */
export type NameNodeObjProps = {
  name: string
}

/**
 * `NameNode` create input
 *
 * @category AST Node
 */
export type NameNodeProps = NameNodeObjProps | string

/**
 * create `NameNode`
 *
 * @category AST Node
 */
export function nameNode(props: NameNodeProps): GQL.NameNode {
  return {
    kind: Kind.NAME,
    value: typeof props === 'string' ? props : props.name,
  }
}

//
// ─── DOCUMENT ───────────────────────────────────────────────────────────────────
//

/**
 * `DocumentNode` create input
 *
 * @category AST Node
 */
export type DocumentNodeProps = {
  definitions: ReadonlyArray<DefinitionNodeProps | GQL.DefinitionNode>
}

/**
 * create `DocumentNode`
 *
 * @category AST Node
 */
export function documentNode({ definitions }: DocumentNodeProps): GQL.DocumentNode {
  return {
    kind: Kind.DOCUMENT,
    definitions: applyPropsArr(definitionNode, definitions),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `OperationDefinitionNode` create input
 *
 * @category AST Node
 */
export type OperationDefinitionNodeProps = {
  name?: GQL.NameNode | NameNodeProps
  operation: GQL.OperationTypeNode
  variableDefinitions?: ReadonlyArray<GQL.VariableDefinitionNode | VariableDefinitionNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<GQL.SelectionNode | SelectionNodeProps>
}

/**
 * create `OperationDefinitionNode`
 *
 * @category AST Node
 */
export function operationDefinitionNode(props: OperationDefinitionNodeProps): GQL.OperationDefinitionNode {
  return {
    kind: Kind.OPERATION_DEFINITION,
    operation: props.operation,
    name: applyPropsNullable(nameNode, props.name),
    variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode,
      applyNullableImplicit((selections) => ({ selections }), props.selections)),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `VariableDefinitionNode` create input
 *
 * @category AST Node
 */
export type VariableDefinitionNodeProps = {
  variable: GQL.VariableNode | VariableNodeProps
  type: GQL.TypeNode | TypeNodeProps
  defaultValue?: GQL.ValueNode
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `VariableDefinitionNode`
 *
 * @category AST Node
 */
export function variableDefinitionNode(props: VariableDefinitionNodeProps): GQL.VariableDefinitionNode {
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: applyProps(variableNode, props.variable),
    type: applyProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `VariableNode` create input
 *
 * @category AST Node
 */
export type VariableNodeProps = NameNodeProps

/**
 * create `VariableNode`
 *
 * @category AST Node
 */
export function variableNode(props: VariableNodeProps): GQL.VariableNode {
  const leaf = props && typeof props === 'object' ? props.name : props

  return {
    kind: Kind.VARIABLE,
    name: applyNullableImplicit(nameNode, leaf),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `SelectionSetNode` create input
 *
 * @category AST Node
 */
export type SelectionSetNodeProps = {
  selections: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>
}

/**
 * create `SelectionSetNode`
 *
 * @category AST Node
 */
export function selectionSetNode(props: SelectionSetNodeProps): GQL.SelectionSetNode {
  return {
    kind: Kind.SELECTION_SET,
    selections: applyPropsArr(selectionNode, (props || {}).selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FieldNode` create input subtype
 *
 * @category AST Node
 */
export type FieldNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  alias?: GQL.NameNode | NameNodeProps
  arguments?: ReadonlyArray<GQL.ArgumentNode | ArgumentNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections?: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>
}

/**
 * `FieldNode` create input
 *
 * @category AST Node
 */
export type FieldNodeProps = FieldNodeObjProps | string

/**
 * create `FieldNode`
 *
 * @category AST Node
 */
export function fieldNode(props: FieldNodeProps): GQL.FieldNode {
  if (typeof props === 'string') {
    return {
      kind: Kind.FIELD,
      name: nameNode(props),
    }
  }

  return {
    kind: Kind.FIELD,
    name: applyProps(nameNode, props.name),
    alias: applyPropsNullable(nameNode, props.alias),
    arguments: applyPropsNullableArr(argumentNode, props.arguments),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyPropsNullable((selections) => selectionSetNode({ selections }), props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ArgumentNode` create input
 *
 * @category AST Node
 */
export type ArgumentNodeProps = {
  name: GQL.NameNode | NameNodeProps
  value: GQL.ValueNode
}

/**
 * create `ArgumentNode`
 *
 * @category AST Node
 */
export function argumentNode(props: ArgumentNodeProps): GQL.ArgumentNode {
  return {
    kind: Kind.ARGUMENT,
    name: applyProps(nameNode, props.name),
    value: props.value,
  }
}

//
// ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
//

/**
 * `FragmentSpreadNode` create input subtype
 *
 * @category AST Node
 */
export type FragmentSpreadNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}


/**
 * `FragmentSpreadNode` create input
 *
 * @category AST Node
 */
export type FragmentSpreadNodeProps = string | FragmentSpreadNodeObjProps

/**
 * create `FragmentSpreadNode`
 *
 * @category AST Node
 */
export function fragmentSpreadNode(props: FragmentSpreadNodeProps): GQL.FragmentSpreadNode {
  if (typeof props === 'string') {
    return {
      kind: Kind.FRAGMENT_SPREAD,
      name: applyProps(nameNode, props),
      directives: [],
    }
  }

  return {
    kind: Kind.FRAGMENT_SPREAD,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InlineFragmentNode` create input
 *
 * @category AST Node
 */
export type InlineFragmentNodeProps = {
  typeCondition?: GQL.NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<GQL.SelectionNode | SelectionNodeProps>
}

/**
 * create `InlineFragmentNode`
 *
 * @category AST Node
 */
export function inlineFragmentNode(props: InlineFragmentNodeProps): GQL.InlineFragmentNode {
  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: applyPropsNullable(namedTypeNode, props.typeCondition),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode,
      applyNullableImplicit((selections) => ({ selections }), props.selections)),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FragmentDefinitionNode` create input
 *
 * @category AST Node
 */
export type FragmentDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  variableDefinitions?: ReadonlyArray<GQL.VariableDefinitionNode | VariableDefinitionNodeProps>
  typeCondition: GQL.NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<GQL.SelectionNode | SelectionNodeProps>
}

/**
 * create `FragmentDefinitionNode`
 *
 * @category AST Node
 */
export function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): GQL.FragmentDefinitionNode {
  return {
    kind: Kind.FRAGMENT_DEFINITION,
    name: applyProps(nameNode, props.name),
    variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
    typeCondition: applyProps(namedTypeNode, props.typeCondition),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode,
      applyNullableImplicit((selections) => ({ selections }), props.selections)),
  }
}

//
// ─── VALUES ─────────────────────────────────────────────────────────────────────
//

/**
 * `IntValueNode` create input subtype
 *
 * @category AST Node
 */
export type IntValueNodeObjProps = {
  value: string | number
}

/**
 * `IntValueNode` create input
 *
 * @category AST Node
 */
export type IntValueNodeProps = IntValueNodeObjProps | string | number

/**
 * create `IntValueNode`
 *
 * @category AST Node
 */
export function intValueNode(props: IntValueNodeProps): GQL.IntValueNode {
  const leaf = props && typeof props === 'object' ? props.value : props
  const parse = (value: string | number): string => '' + parseInt('' + value, 10)

  return {
    kind: Kind.INT,
    value: applyNullableImplicit(parse, leaf),
  }
}

/**
 * `IntValueNode` create input subtype
 *
 * @category AST Node
 */
export type FloatValueNodeObjProps = {
  value: string | number
}

/**
 * `FloatValueNode` create input
 *
 * @category AST Node
 */
export type FloatValueNodeProps = FloatValueNodeObjProps | string | number

/**
 * create `FloatValueNode`
 *
 * @category AST Node
 */
// TODO: validate?
export function floatValueNode(props: FloatValueNodeProps): GQL.FloatValueNode {
  const leaf = props && typeof props === 'object' ? props.value : props
  const parse = (value: string | number): string => '' + parseFloat('' + value)

  return {
    kind: Kind.FLOAT,
    value: applyNullableImplicit(parse, leaf),
  }
}

/**
 * `StringValueNode` create input subtype
 *
 * @category AST Node
 */
export type StringValueNodeObjProps = {
  value: string
}

/**
 * `StringValueNode` create input
 *
 * @category AST Node
 */
export type StringValueNodeProps = StringValueNodeObjProps | string

/**
 * create `StringValueNode`
 *
 * @category AST Node
 */
export function stringValueNode(props: StringValueNodeProps): GQL.StringValueNode {
  const leaf = props && typeof props === 'object' ? props.value : props

  return {
    kind: Kind.STRING,
    value: leaf,
  }
}

/**
 * `BooleanValueNode` create input subtype
 *
 * @category AST Node
 */
export type BooleanValueNodeObjProps = {
  value: boolean | string | number
}

/**
 * `BooleanValueNode` create input
 *
 * @category AST Node
 */
export type BooleanValueNodeProps = BooleanValueNodeObjProps | boolean | string | number

/**
 * create `BooleanValueNode`
 *
 * @category AST Node
 */
export function booleanValueNode(props: BooleanValueNodeProps): GQL.BooleanValueNode {
  const toBool: any = {
    true: true,
    false: false,
  }

  const leaf = props && typeof props === 'object' ? props.value : props
  const parse = (value: boolean | string | number): boolean => toBool['' + value] ?? !!value

  return {
    kind: Kind.BOOLEAN,
    value: applyNullableImplicit(parse, leaf),
  }
}

/**
 * create `NullValueNode`
 *
 * @category AST Node
 */
export function nullValueNode(props?: never): GQL.NullValueNode {
  return {
    kind: Kind.NULL,
  }
}

/**
 * `EnumValueNode` create input subtype
 *
 * @category AST Node
 */
export type EnumValueNodeObjProps = {
  value: string
}

/**
 * `EnumValueNode` create input
 *
 * @category AST Node
 */
export type EnumValueNodeProps = EnumValueNodeObjProps | string

/**
 * create `EnumValueNode`
 *
 * @category AST Node
 */
export function enumValueNode(props: EnumValueNodeProps): GQL.EnumValueNode {
  const leaf = props && typeof props === 'object' ? props.value : props

  return {
    kind: Kind.ENUM,
    value: leaf,
  }
}

/**
 * `ListValueNode` create input
 *
 * @category AST Node
 */
export type ListValueNodeProps = {
  values: ReadonlyArray<GQL.ValueNode>
}

/**
 * `ListValueNode`
 *
 * @category AST Node
 */
export function listValueNode(props: ListValueNodeProps): GQL.ListValueNode {
  return {
    kind: Kind.LIST,
    values: (props || {}).values,
  }
}

/**
 * `ObjectValueNode` create input
 *
 * @category AST Node
 */
export type ObjectValueNodeProps = {
  fields: ReadonlyArray<GQL.ObjectFieldNode>
}

/**
 * create `ObjectValueNode`
 *
 * @category AST Node
 */
export function objectValueNode(props: ObjectValueNodeProps): GQL.ObjectValueNode {
  return {
    kind: Kind.OBJECT,
    fields: (props || {}).fields,
  }
}

/**
 * `ObjectFieldNode` create input
 *
 * @category AST Node
 */
export type ObjectFieldNodeProps = {
  name: GQL.NameNode | NameNodeProps
  value: GQL.ValueNode
}

/**
 * create `ObjectFieldNode`
 *
 * @category AST Node
 */
export function objectFieldNode(props: ObjectFieldNodeProps): GQL.ObjectFieldNode {
  return {
    kind: Kind.OBJECT_FIELD,
    name: applyProps(nameNode, props.name),
    value: props.value,
  }
}

//
// ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
//

/**
 * `DirectiveNode` create input subtype
 *
 * @category AST Node
 */
export type DirectiveNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  arguments?: ReadonlyArray<GQL.ArgumentNode | ArgumentNodeProps>
}

/**
 * `DirectiveNode` create input
 *
 * @category AST Node
 */
export type DirectiveNodeProps = DirectiveNodeObjProps | string

/**
 * create `DirectiveNode`
 *
 * @category AST Node
 */
export function directiveNode(directive: DirectiveNodeProps): GQL.DirectiveNode {
  // shorthand
  if (typeof directive === 'string') {
    return {
      kind: Kind.DIRECTIVE,
      name: nameNode(directive),
    }
  }

  return {
    kind: Kind.DIRECTIVE,
    name: applyProps(nameNode, directive.name),
    arguments: applyPropsNullableArr(argumentNode, directive.arguments),
  }
}

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

/**
 * `NamedTypeNode` create input
 *
 * @category AST Node
 */
export type NamedTypeNodeProps = string | NameNodeProps | GQL.NameNode

/**
 * create `NamedTypeNode`
 *
 * @category AST Node
 */
export function namedTypeNode(props: NamedTypeNodeProps): GQL.NamedTypeNode {
  const leaf = props && typeof props === 'object' ? (props as any).value ?? (props as any).name : props

  return {
    kind: Kind.NAMED_TYPE,
    name: applyProps(nameNode, leaf),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ListTypeNode` create input
 *
 * @category AST Node
 */
export type ListTypeNodeProps = GQL.TypeNode | TypeNodeProps | string

/**
 * create `ListTypeNode`
 *
 * @category AST Node
 */
export function listTypeNode(props: ListTypeNodeProps): GQL.ListTypeNode {
  const type = applyProps(typeNode, props)

  return {
    kind: Kind.LIST_TYPE,
    type,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `NonNullTypeNode` create input
 *
 * @category AST Node
 */
export type NonNullTypeNodeProps = GQL.TypeNode | TypeNodeProps | string

/**
 * create `NonNullTypeNode`
 *
 * @category AST Node
 */
export function nonNullTypeNode(props: NonNullTypeNodeProps): GQL.NonNullTypeNode {
  const type = applyProps(typeNode, props)

  // ! nesting is skipped, type && for partials
  if (type && type.kind === Kind.NON_NULL_TYPE) {
    return type
  }

  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `TypeNode` create input subtype
 *
 * @category AST Node
 */
export type TypeNodeObjProps = {
  named: GQL.NamedTypeNode | NamedTypeNodeProps
  list?: boolean
  nonNull?: boolean
}

/**
 * `TypeNode` create input
 *
 * @category AST Node
 */
export type TypeNodeProps = TypeNodeObjProps | string

/**
 * create `TypeNode`
 *
 * @category AST Node
 */
export function typeNode(type: TypeNodeProps): GQL.TypeNode {
  if (typeof type === 'string') {
    return parseType(type)
  }

  const namedType = applyProps(namedTypeNode, type.named)

  if (!type.list && !type.nonNull) {
    return namedType
  }

  if (type.list && !type.nonNull) {
    return listTypeNode(namedType)
  }

  if (!type.list && type.nonNull) {
    return nonNullTypeNode(namedType)
  }

  // I've never seen nested list in GraphQL API so non-null list is default
  return nonNullTypeNode(listTypeNode(nonNullTypeNode(namedType)))
}

//
// ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
//

/**
 * `SchemaDefinitionNode` create input
 *
 * @category AST Node
 */
export type SchemaDefinitionNodeProps = {
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNodeProps | GQL.OperationTypeDefinitionNode>
}

/**
 * create `SchemaDefinitionNode`
 *
 * @category AST Node
 */
export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): GQL.SchemaDefinitionNode {
  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: applyPropsNullableArr(directiveNode, props.directives),
    operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `OperationTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type OperationTypeDefinitionNodeProps = {
  operation: GQL.OperationTypeNode
  type: GQL.NamedTypeNode | NamedTypeNodeProps
}

/**
 * create `OperationTypeDefinitionNode`
 *
 * @category AST Node
 */
export function operationTypeDefinitionNode(props: OperationTypeDefinitionNodeProps): GQL.OperationTypeDefinitionNode {
  return {
    kind: Kind.OPERATION_TYPE_DEFINITION,
    operation: props.operation,
    type: applyProps(namedTypeNode, props.type),
  }
}

//
// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type ScalarTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeDefinitionNode`
 *
 * @category AST Node
 */
export function scalarTypeDefinitionNode(props: ScalarTypeDefinitionNodeProps): GQL.ScalarTypeDefinitionNode {
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type ObjectTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  interfaces?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function objectTypeDefinitionNode(props: ObjectTypeDefinitionNodeProps): GQL.ObjectTypeDefinitionNode {
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FieldDefinitionNode` create input
 *
 * @category AST Node
 */
export type FieldDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
  type: GQL.TypeNode | TypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>

  // TODO: shorthand
  // nonNull?: boolean
  // list?: boolean
}

/**
 * create `FieldDefinitionNode`
 *
 * @category AST Node
 */
export function fieldDefinitionNode(props: FieldDefinitionNodeProps): GQL.FieldDefinitionNode {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
    type: applyProps(typeNode, props.type),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputValueDefinitionNode` create input
 *
 * @category AST Node
 */
export type InputValueDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  type: GQL.TypeNode | TypeNodeProps
  // TODO: allow coercing js value value by type?
  defaultValue?: GQL.ValueNode
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `InputValueDefinitionNode`
 *
 * @category AST Node
 */
export function inputValueDefinitionNode(props: InputValueDefinitionNodeProps): GQL.InputValueDefinitionNode {
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    type: applyProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InterfaceTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type InterfaceTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeDefinitionNode`
 *
 * @category AST Node
 */
export function interfaceTypeDefinitionNode(props: InterfaceTypeDefinitionNodeProps): GQL.InterfaceTypeDefinitionNode {
  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `UnionTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type UnionTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeDefinitionNode`
 *
 * @category AST Node
 */
export function unionTypeDefinitionNode(props: UnionTypeDefinitionNodeProps): GQL.UnionTypeDefinitionNode {
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    types: applyPropsNullableArr(namedTypeNode, props.types),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type EnumTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<GQL.EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeDefinitionNode`
 *
 * @category AST Node
 */
export function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): GQL.EnumTypeDefinitionNode {
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumValueDefinitionNode` create input subtype
 *
 * @category AST Node
 */
export type EnumValueDefinitionNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * `EnumValueDefinitionNode` create input
 *
 * @category AST Node
 */
export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodeObjProps | string

/**
 * create `EnumValueDefinitionNode`
 *
 * @category AST Node
 */
export function enumValueDefinitionNode(props: EnumValueDefinitionNodeProps): GQL.EnumValueDefinitionNode {
  if (typeof props === 'string') {
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      name: nameNode(props),
    }
  }

  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export type InputObjectTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeDefinitionNode(
  props: InputObjectTypeDefinitionNodeProps,
): GQL.InputObjectTypeDefinitionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
  }
}

//
// ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
//

/**
 * `DirectiveDefinitionNode` create input
 *
 * @category AST Node
 */
export type DirectiveDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
  repeatable?: boolean
  locations: ReadonlyArray<GQL.NameNode | GQL.DirectiveLocationEnum>
}

/**
 * create `DirectiveDefinitionNode`
 *
 * @category AST Node
 */
export function directiveDefinitionNode(props: DirectiveDefinitionNodeProps): GQL.DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
    repeatable: props.repeatable ?? false,
    locations: applyPropsArr(nameNode, props.locations),
  }
}

//
// ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
//

/**
 * `SchemaExtensionNode` create input
 *
 * @category AST Node
 */
export type SchemaExtensionNodeProps = {
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<GQL.OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * create `SchemaExtensionNode`
 *
 * @category AST Node
 */
export function schemaExtensionNode(props: SchemaExtensionNodeProps): GQL.SchemaExtensionNode {
  return {
    kind: Kind.SCHEMA_EXTENSION,
    directives: applyPropsNullableArr(directiveNode, props.directives),
    operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

//
// ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type ScalarTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeExtensionNode`
 *
 * @category AST Node
 */
export function scalarTypeExtensionNode(props: ScalarTypeExtensionNodeProps): GQL.ScalarTypeExtensionNode {
  return {
    kind: Kind.SCALAR_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type ObjectTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  interfaces?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function objectTypeExtensionNode(
  props: ObjectTypeExtensionNodeProps,
): GQL.ObjectTypeExtensionNode {
  return {
    kind: Kind.OBJECT_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InterfaceTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type InterfaceTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeExtensionNode`
 *
 * @category AST Node
 */
export function interfaceTypeExtensionNode(props: InterfaceTypeExtensionNodeProps): GQL.InterfaceTypeExtensionNode {
  return {
    kind: Kind.INTERFACE_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `UnionTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type UnionTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeExtensionNode`
 *
 * @category AST Node
 */
export function unionTypeExtensionNode(props: UnionTypeExtensionNodeProps): GQL.UnionTypeExtensionNode {
  return {
    kind: Kind.UNION_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    types: applyPropsNullableArr(namedTypeNode, props.types),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type EnumTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<GQL.EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeExtensionNode`
 *
 * @category AST Node
 */
export function enumTypeExtensionNode(props: EnumTypeExtensionNodeProps): GQL.EnumTypeExtensionNode {
  return {
    kind: Kind.ENUM_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export type InputObjectTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeExtensionNode(
  props: InputObjectTypeExtensionNodeProps,
): GQL.InputObjectTypeExtensionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
  }
}


//
// ─── UNIONS ─────────────────────────────────────────────────────────────────────
//

export type WithKind<T, K extends GQL.KindEnum> = T & {kind: K}
export type KindToAstMap<N extends GQL.ASTNode> = {[K in N['kind']]: (props: any) => GQL.ASTKindToNode[K]}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeDefinitionNodeProps =
  | WithKind<ObjectTypeDefinitionNodeProps, 'ObjectTypeDefinition'>
  | WithKind<InterfaceTypeDefinitionNodeProps, 'InterfaceTypeDefinition'>
  | WithKind<ScalarTypeDefinitionNodeProps, 'ScalarTypeDefinition'>
  | WithKind<UnionTypeDefinitionNodeProps, 'UnionTypeDefinition'>
  | WithKind<EnumTypeDefinitionNodeProps, 'EnumTypeDefinition'>
  | WithKind<InputObjectTypeDefinitionNodeProps, 'InputObjectTypeDefinition'>


export const kindToTypeDefinition: KindToAstMap<GQL.TypeDefinitionNode> = {
  ObjectTypeDefinition: objectTypeDefinitionNode,
  InterfaceTypeDefinition: interfaceTypeDefinitionNode,
  ScalarTypeDefinition: scalarTypeDefinitionNode,
  UnionTypeDefinition: unionTypeDefinitionNode,
  EnumTypeDefinition: enumTypeDefinitionNode,
  InputObjectTypeDefinition: inputObjectTypeDefinitionNode,
}

export function typeDefinitionNode({ kind, ...props }: TypeDefinitionNodeProps): GQL.TypeDefinitionNode {
  return kindToTypeDefinition[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeExtensionNodeProps =
  | WithKind<ObjectTypeExtensionNodeProps, 'ObjectTypeExtension'>
  | WithKind<InterfaceTypeExtensionNodeProps, 'InterfaceTypeExtension'>
  | WithKind<ScalarTypeExtensionNodeProps, 'ScalarTypeExtension'>
  | WithKind<UnionTypeExtensionNodeProps, 'UnionTypeExtension'>
  | WithKind<EnumTypeExtensionNodeProps, 'EnumTypeExtension'>
  | WithKind<InputObjectTypeExtensionNodeProps, 'InputObjectTypeExtension'>

export const kindToTypeExtension: KindToAstMap<GQL.TypeExtensionNode> = {
  ObjectTypeExtension: objectTypeExtensionNode,
  InterfaceTypeExtension: interfaceTypeExtensionNode,
  ScalarTypeExtension: scalarTypeExtensionNode,
  UnionTypeExtension: unionTypeExtensionNode,
  EnumTypeExtension: enumTypeExtensionNode,
  InputObjectTypeExtension: inputObjectTypeExtensionNode,
}

export function typeExtensionNode({ kind, ...props }: TypeExtensionNodeProps): GQL.TypeExtensionNode {
  return kindToTypeExtension[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeSystemDefinitionNodeProps =
  | WithKind<SchemaDefinitionNodeProps, 'SchemaDefinition'>
  | WithKind<DirectiveDefinitionNodeProps, 'DirectiveDefinition'>
  | TypeDefinitionNodeProps

export const kindToTypeSystemDefinition: KindToAstMap<GQL.TypeSystemDefinitionNode> = {
  ...kindToTypeDefinition,
  SchemaDefinition: schemaDefinitionNode,
  DirectiveDefinition: directiveDefinitionNode,
}

export function typeSystemDefinitionNode(
  { kind, ...props }: TypeSystemDefinitionNodeProps,
): GQL.TypeSystemDefinitionNode {
  return kindToTypeSystemDefinition[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────


export type TypeSystemExtensionNodeProps =
  | WithKind<SchemaExtensionNodeProps, 'SchemaExtension'>
  | TypeExtensionNodeProps

export const kindToTypeSystemExtension: KindToAstMap<GQL.TypeSystemExtensionNode> = {
  ...kindToTypeExtension,
  SchemaExtension: schemaExtensionNode,
}

export function typeSystemExtensionNode(
  { kind, ...props }: TypeSystemExtensionNodeProps,
): GQL.TypeSystemExtensionNode {
  return kindToTypeSystemExtension[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────


export type ExecutableDefinitionNodeProps =
  | WithKind<OperationDefinitionNodeProps, 'OperationDefinition'>
  | WithKind<FragmentDefinitionNodeProps, 'FragmentDefinition'>

export const kindToTypeExecutableDefinition: KindToAstMap<GQL.ExecutableDefinitionNode> = {
  OperationDefinition: operationDefinitionNode,
  FragmentDefinition: fragmentDefinitionNode,
}

export function executableDefinitionNode(
  { kind, ...props }: ExecutableDefinitionNodeProps,
): GQL.ExecutableDefinitionNode {
  return kindToTypeExecutableDefinition[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────

export type DefinitionNodeProps =
  | TypeSystemDefinitionNodeProps
  | TypeSystemExtensionNodeProps
  | ExecutableDefinitionNodeProps

export const kindToDefinition: KindToAstMap<GQL.DefinitionNode> = {
  ...kindToTypeSystemDefinition,
  ...kindToTypeSystemExtension,
  ...kindToTypeExecutableDefinition,
}

export function definitionNode(
  { kind, ...props }: DefinitionNodeProps,
): GQL.DefinitionNode {
  return kindToDefinition[kind](props)
}

// ────────────────────────────────────────────────────────────────────────────────


export type SelectionNodeProps =
  // default!
  | FieldNodeProps
  | WithKind<FieldNodeObjProps, 'Field'>
  | WithKind<FragmentSpreadNodeObjProps, 'FragmentSpread'>
  | WithKind<InlineFragmentNodeProps, 'InlineFragment'>

export const kindToSelection: KindToAstMap<GQL.SelectionNode> = {
  Field: fieldNode,
  FragmentSpread: fragmentSpreadNode,
  InlineFragment: inlineFragmentNode,
}

export function selectionNode(
  props: SelectionNodeProps,
): GQL.SelectionNode {
  if (typeof props === 'string') {
    return fieldNode(props)
  }

  const { kind = 'Field', ...rest } = props as Exclude<SelectionNodeProps, FieldNodeProps >

  return kindToSelection[kind](rest)
}
