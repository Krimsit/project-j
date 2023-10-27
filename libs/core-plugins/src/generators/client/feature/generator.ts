import * as path from 'path'

import { formatFiles, generateFiles } from '@nx/devkit'
import { libraryGenerator, remoteGenerator } from '@nx/react'

import { deleteFiles, rewriteLibIndex } from '../../helpers'
import {
  defaultReactLibraryProps,
  defaultReactRemoteProps,
} from '../../constants'

import type { ClientFeatureGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function clientFeatureGenerator(
  tree: Tree,
  options: ClientFeatureGeneratorSchema,
) {
  const { name, project } = options
  const appRoot = `apps/${project}`
  const featureRoot = `libs/${project}/features`
  const importPath = `@${project}/feature/${name}`
  const host = `${project}-shell`
  const libFeatureSrcRoot = `${featureRoot}/${name}/src`
  const libFeatureFilesRoot = `${libFeatureSrcRoot}/lib`
  const appFilesRoot = `${appRoot}/${name}/src/app`
  const filesToDelete = [
    `${appFilesRoot}/app.spec.tsx`,
    `${appFilesRoot}/nx-welcome.tsx`,
  ]

  await remoteGenerator(tree, {
    ...defaultReactRemoteProps,
    name,
    host,
    directory: project,
  })

  await libraryGenerator(tree, {
    ...defaultReactLibraryProps,
    name,
    importPath,
    directory: featureRoot,
  })

  generateFiles(
    tree,
    path.join(__dirname, 'projectFiles'),
    `${appRoot}/${name}`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    libFeatureFilesRoot,
    options,
  )
  deleteFiles(tree, filesToDelete)
  rewriteLibIndex(tree, `${libFeatureSrcRoot}/index.ts`)

  await formatFiles(tree)
}

export default clientFeatureGenerator
