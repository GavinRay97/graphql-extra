import { documentSchemaApi } from '../../src'

describe(`api > documentApi`, () => {
  const typeDefs = /* GraphQL */ `
    type Person {
      id: ID!
      name: String!
    }
  `

  const moreTypeDefs = /* GraphQL */ `
    type Post {
      id: ID!
      body: String!
      author: Person!
    }
  `
  const doc = documentSchemaApi()

  doc.addSDL(typeDefs)
  doc.addSDL(moreTypeDefs)

  test(`parse SDL`, () => {
    expect(doc.getObjectType('Person').getName()).toBe('Person')
    expect(doc.getObjectType('Post').getFieldnames()).toEqual(['id', 'body', 'author'])
  })

  test(`type guards and assertions`, () => {
    const obj = doc.getType('Post')

    expect(obj.isObjectType()).toBeTruthy()
    expect(obj.isEnumType()).toBeFalsy()

    expect(() => obj.assertEnumType().setDescription('abc')).toThrowError(`ObjectTypeDefinition`)
    expect(() => doc.getEnumType('Post').setDescription('asd')).toThrowError(`ObjectTypeDefinition`)
  })
})
