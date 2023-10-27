import * as path from 'path'

import { formatFiles, generateFiles } from '@nx/devkit'
import { hostGenerator, libraryGenerator } from '@nx/react'

import {
  defaultReactHostProps,
  defaultReactLibraryProps,
} from '../../constants'
import { deleteFiles, rewriteLibIndexFiles } from '../../helpers'

import type { ClientProjectGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function clientProjectGenerator(
  tree: Tree,
  options: ClientProjectGeneratorSchema,
) {
  const { name } = options
  const appRoot = `apps/${name}`
  const libsRoot = `libs/${name}`
  const configsRoot = `${libsRoot}/configs`
  const modelsRoot = `${libsRoot}/models`
  const hooksRoot = `${libsRoot}/hooksRoot`
  const helpersRoot = `${libsRoot}/helpers`
  const widgetsRoot = `${libsRoot}/widgets`
  const filesToDelete = [
    `${appRoot}/shell/src/app/app.spec.tsx`,
    `${appRoot}/shell/src/app/nx-welcome.tsx`,
    `${configsRoot}/src/lib/client-configs.spec.ts`,
    `${configsRoot}/src/lib/client-configs.ts`,
    `${modelsRoot}/src/lib/client-models.spec.ts`,
    `${modelsRoot}/src/lib/client-models.ts`,
    `${hooksRoot}/src/lib/client-hooks.spec.ts`,
    `${hooksRoot}/src/lib/client-hooks.ts`,
    `${helpersRoot}/src/lib/client-helpers.spec.ts`,
    `${helpersRoot}/src/lib/client-helpers.ts`,
    `${widgetsRoot}/src/lib/client-widgets.spec.ts`,
    `${widgetsRoot}/src/lib/client-widgets.ts`,
  ]
  const filesToRewriteIndexFiles = [
    `${configsRoot}/src/index.ts`,
    `${modelsRoot}/src/index.ts`,
    `${hooksRoot}/src/index.ts`,
    `${helpersRoot}/src/index.ts`,
    `${widgetsRoot}/src/index.ts`,
  ]

  await hostGenerator(tree, {
    name: 'shell',
    directory: `${options.name}`,
    ...defaultReactHostProps,
  })

  await libraryGenerator(tree, {
    name: 'configs',
    importPath: `@${options.name}/configs`,
    directory: libsRoot,
    ...defaultReactLibraryProps,
  })

  await libraryGenerator(tree, {
    name: 'modules',
    importPath: `@${options.name}/modules`,
    directory: libsRoot,
    ...defaultReactLibraryProps,
  })

  await libraryGenerator(tree, {
    name: 'hooks',
    importPath: `@${options.name}/hooks`,
    directory: libsRoot,
    ...defaultReactLibraryProps,
  })

  await libraryGenerator(tree, {
    name: 'helpers',
    importPath: `@${options.name}/helpers`,
    directory: libsRoot,
    ...defaultReactLibraryProps,
  })

  await libraryGenerator(tree, {
    name: 'widgets',
    importPath: `@${options.name}/widgets`,
    directory: libsRoot,
    ...defaultReactLibraryProps,
  })

  generateFiles(
    tree,
    path.join(__dirname, 'projectFiles'),
    `${appRoot}/shell`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'configsFiles'),
    `${configsRoot}/src/lib`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'libraryFiles'),
    `${modelsRoot}/src/lib`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'libraryFiles'),
    `${hooksRoot}/src/lib`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'libraryFiles'),
    `${helpersRoot}/src/lib`,
    options,
  )
  generateFiles(
    tree,
    path.join(__dirname, 'libraryFiles'),
    `${widgetsRoot}/src/lib`,
    options,
  )
  deleteFiles(tree, filesToDelete)
  rewriteLibIndexFiles(tree, filesToRewriteIndexFiles)

  await formatFiles(tree)
}

export default clientProjectGenerator
