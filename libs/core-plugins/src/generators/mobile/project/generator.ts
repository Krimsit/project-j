import * as path from 'path'

import { formatFiles, generateFiles, updateJson } from '@nx/devkit'
import { expoApplicationGenerator } from '@nx/expo'

import { deleteFiles } from '../../helpers'
import { defaultMobileAppOptions } from '../../constants'

import type { MobileProjectGeneratorSchema } from './schema'
import type { Tree } from '@nx/devkit'

export async function mobileProjectGenerator(
  tree: Tree,
  options: MobileProjectGeneratorSchema,
) {
  const { name } = options
  const projectRoot = `apps/${name}`
  const projectSrc = `${projectRoot}/src/app`
  const filesToDelete = [`${projectSrc}/App.spec.tsx`]

  await expoApplicationGenerator(tree, {
    ...defaultMobileAppOptions,
    name,
  })

  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
  deleteFiles(tree, filesToDelete)
  updateJson(tree, `${projectRoot}/tsconfig.json`, (json) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,no-param-reassign
      json.compilerOptions.composite = false
    } catch (e) {
      console.warn(`WARN ${projectRoot}/tsconfig.json was NOT updated ${e}`)
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return json
  })

  await formatFiles(tree)
}

export default mobileProjectGenerator
