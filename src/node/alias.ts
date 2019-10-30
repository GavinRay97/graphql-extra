import { ObjectTypeDefinitionNode, NameNode } from 'graphql'
import * as AST from './ast'

/**
 * @category AST Alias
 */
export type RootTypeDefinitionProps = Omit<AST.ObjectTypeDefinitionNodeProps, 'name'> & {
  name?: NameNode | AST.NameNodeProps
}

/**
 * @category AST Alias
 */
export function queryType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

/**
 * @category AST Alias
 */
export function mutationType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

/**
 * @category AST Alias
 */
export function subscriptionType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

// NAME

/**
 * @category AST Alias
 */
export const name = AST.nameNode

// DOCUMENT

/**
 * @category AST Alias
 */
export const document = AST.documentNode

/**
 * @category AST Alias
 */
export const operation = AST.operationDefinitionNode

/**
 * @category AST Alias
 */
export const variable = AST.variableDefinitionNode

/**
 * @category AST Alias
 */
export const selections = AST.selectionSetNode

/**
 * @category AST Alias
 */
export const field = AST.fieldNode

/**
 * @category AST Alias
 */
export const arg = AST.argumentNode

// FRAGMENTS

export const fragmentSpread = AST.fragmentSpreadNode

/**
 * @category AST Alias
 */
export const inlineFragment = AST.inlineFragmentNode

/**
 * @category AST Alias
 */
export const fragmentDef = AST.fragmentDefinitionNode

// VALUES

/**
 * @category AST Alias
 */
export const value = {
  variable: AST.variableNode,
  int: AST.intValueNode,
  float: AST.floatValueNode,
  bool: AST.booleanValueNode,
  object: AST.objectValueNode,
  null: AST.nullValueNode,
  string: AST.stringValueNode,
  enum: AST.enumValueNode,
  list: AST.listValueNode,
  objectField: AST.objectFieldNode,
}

// DIRECTIVES

/**
 * @category AST Alias
 */
export const directive = AST.directiveNode

// TYPES

/**
 * @category AST Alias
 */
export const type = {
  named: AST.namedTypeNode,
  list: AST.listTypeNode,
  nonNull: AST.nonNullTypeNode,

  // build-ins
  id: () => AST.namedTypeNode('ID'),
  int: () => AST.namedTypeNode('Int'),
  float: () => AST.namedTypeNode('Float'),
  bool: () => AST.namedTypeNode('Boolean'),
  string: () => AST.namedTypeNode('String'),

  // common extras
  json: () => AST.namedTypeNode('JSON'),
  date: () => AST.namedTypeNode('Date'),
  dateTime: () => AST.namedTypeNode('DateTime'),
}

// TYPE SYSTEM DEFINITIONS

/**
 * @category AST Alias
 */
export const schemaDef = AST.schemaDefinitionNode

/**
 * @category AST Alias
 */
export const operationType = AST.operationTypeDefinitionNode

/// TYPE DEFINITIONS

/**
 * @category AST Alias
 */
export const scalarType = AST.scalarTypeDefinitionNode

/**
 * @category AST Alias
 */
export const objectType = AST.objectTypeDefinitionNode

/**
 * @category AST Alias
 */
export const interfaceType = AST.interfaceTypeDefinitionNode

/**
 * @category AST Alias
 */
export const unionType = AST.unionTypeDefinitionNode

/**
 * @category AST Alias
 */
export const enumType = AST.enumTypeDefinitionNode

/**
 * @category AST Alias
 */
export const inputType = AST.inputObjectTypeDefinitionNode

// TYPE FIELD DEFINITIONS

/**
 * @category AST Alias
 */
export const fieldDef = AST.fieldDefinitionNode

/**
 * @category AST Alias
 */
export const inputVal = AST.inputValueDefinitionNode

/**
 * @category AST Alias
 */
export const enumVal = AST.enumValueDefinitionNode

// DIRECTIVE DEFINITIONS

/**
 * @category AST Alias
 */
export const directiveDef = AST.directiveDefinitionNode

// TYPE SYSTEM EXTENSIONS

/**
 * @category AST Alias
 */
export const schemaExt = AST.schemaExtensionNode

// TYPE EXTENSIONS

/**
 * @category AST Alias
 */
export const objectExt = AST.objectTypeExtensionNode

/**
 * @category AST Alias
 */
export const interfaceExt = AST.interfaceTypeExtensionNode

/**
 * @category AST Alias
 */
export const unionExt = AST.unionTypeExtensionNode

/**
 * @category AST Alias
 */
export const scalarExt = AST.scalarTypeExtensionNode

/**
 * @category AST Alias
 */
export const enumExt = AST.enumTypeExtensionNode

/**
 * @category AST Alias
 */
export const inputObjectExt = AST.inputObjectTypeExtensionNode
