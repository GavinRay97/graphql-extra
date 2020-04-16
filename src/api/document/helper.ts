import type { ParseOptions, DocumentNode, DefinitionNode } from 'graphql'
import { Kind, parse } from 'graphql'

/**
 * @category Helper
 */
const PARSE_OPTIONS: ParseOptions = {
  experimentalFragmentVariables: true,
  noLocation: true,
}

/**
 * @category Helper
 */
export type SDLInput = string | DocumentNode | (string | DocumentNode)[]

/**
 * @category Helper
 */
export function normaliseSDLInput(sdl: SDLInput, options = PARSE_OPTIONS): DefinitionNode[] {
  if (typeof sdl === 'string') {
    return [...parse(sdl, PARSE_OPTIONS).definitions]
  }

  if (Array.isArray(sdl)) {
    return sdl.flatMap((el) => normaliseSDLInput(el, options))
  }

  if (sdl.kind === Kind.DOCUMENT) {
    return [...sdl.definitions]
  }

  throw Error(`invalid sdl \n ${JSON.stringify(sdl, null, 2)}`)
}
