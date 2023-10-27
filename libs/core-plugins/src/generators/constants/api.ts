import { Linter } from '@nx/linter'

import type { ApplicationGeneratorOptions as NestAppSchema } from '@nx/nest/src/generators/application/schema'
import type { LibraryGeneratorOptions as NestLibSchema } from '@nx/nest/src/generators/library/schema'

export type DefaultNestAppSchema = Omit<NestAppSchema, 'name'>

export type DefaultNestLibrarySchema = Omit<NestLibSchema, 'name'>

export const defaultNestAppProps: DefaultNestAppSchema = {
  linter: Linter.EsLint,
}

export const defaultNestLibProps: DefaultNestLibrarySchema = {
  linter: Linter.EsLint,
}
