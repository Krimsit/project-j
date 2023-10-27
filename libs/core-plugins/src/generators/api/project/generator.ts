import * as path from 'path'

import { formatFiles, generateFiles } from '@nx/devkit'
import { applicationGenerator } from '@nx/nest'

import { deleteFiles } from '../../helpers'
import { defaultNestAppProps } from '../../constants'

import type { ApiProjectGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function apiProjectGenerator(
  tree: Tree,
  options: ApiProjectGeneratorSchema,
) {
  const { name } = options
  const projectRoot = `apps/${options.name}`
  const appsToDeleteRoot = `${projectRoot}/src/app`
  const filesToDelete = [
    `${appsToDeleteRoot}/app.controller.spec.ts`,
    `${appsToDeleteRoot}/app.controller.ts`,
    `${appsToDeleteRoot}/app.service.spec.ts`,
    `${appsToDeleteRoot}/app.service.ts`,
  ]

  await applicationGenerator(tree, {
    name,
    ...defaultNestAppProps,
  })

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
  deleteFiles(tree, filesToDelete)

  await formatFiles(tree)
}

export default apiProjectGenerator
