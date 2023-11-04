import * as path from 'path'

import { formatFiles, generateFiles } from '@nx/devkit'
import expoLibraryGenerator from '@nx/expo/src/generators/library/library'

import { defaultMobileLibraryOptions } from '../../constants'

import type { MobileFeatureGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function mobileFeatureGenerator(
  tree: Tree,
  options: MobileFeatureGeneratorSchema,
) {
  const { name, project } = options
  const featureRoot = `${project}/features`
  const importPath = `@${project}/feature/${name}`
  const libRoot = `libs/${featureRoot}/${name}`

  await expoLibraryGenerator(tree, {
    ...defaultMobileLibraryOptions,
    name,
    importPath,
    directory: featureRoot,
  })

  generateFiles(tree, path.join(__dirname, 'files'), libRoot, options)

  await formatFiles(tree)
}

export default mobileFeatureGenerator
