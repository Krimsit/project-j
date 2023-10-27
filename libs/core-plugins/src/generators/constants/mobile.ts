import { Linter } from '@nx/linter'

import type { Schema as MobileAppSchema } from '@nx/expo/src/generators/application/schema'
import type { Schema as MobileLibrarySchema } from '@nx/expo/src/generators/library/schema'

type DefaultMobileAppSchema = Omit<MobileAppSchema, 'name'>

type DefaultMobileLibrarySchema = Omit<
  MobileLibrarySchema,
  'directory' | 'importPath' | 'name'
>

type DefaultMobileSchema = {
  style: string
  skipFormat: boolean
  unitTestRunner: 'jest' | 'none'
  js: boolean
  linter: Linter
}

export const defaultMobileOptions: DefaultMobileSchema = {
  style: 'styled-components',
  skipFormat: false,
  unitTestRunner: 'jest',
  js: false,
  linter: Linter.EsLint,
}

export const defaultMobileAppOptions: DefaultMobileAppSchema = {
  ...defaultMobileOptions,
  e2eTestRunner: 'none',
}

export const defaultMobileLibraryOptions: DefaultMobileLibrarySchema = {
  ...defaultMobileOptions,
  strict: true,
  skipTsConfig: false,
}
