import * as path from 'path'

import { formatFiles, generateFiles } from '@nx/devkit'
import { libraryGenerator } from '@nx/nest'

import { rewriteLibIndex, deleteFile } from '../../helpers'
import { defaultNestLibProps } from '../../constants'

import type { ApiModuleGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function apiModuleGenerator(
  tree: Tree,
  options: ApiModuleGeneratorSchema,
) {
  const { name, project } = options
  const projectLibRoot = `libs/${project}/services`
  const importPath = `@${project}/${name}`
  const libSrcRoot = `${projectLibRoot}/${name}/src`
  const libFilesRoot = `${libSrcRoot}/lib`

  await libraryGenerator(tree, {
    name,
    importPath,
    directory: projectLibRoot,
    ...defaultNestLibProps,
  })

  generateFiles(tree, path.join(__dirname, 'files'), libFilesRoot, options)
  rewriteLibIndex(tree, `${libSrcRoot}/index.ts`)
  deleteFile(tree, `${libFilesRoot}/${project}-services-${name}.module.ts`)

  await formatFiles(tree)
}

export default apiModuleGenerator
