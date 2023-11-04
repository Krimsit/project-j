import { Linter } from '@nx/linter'

import type { SupportedStyles } from '@nx/react'
import type { Schema as ReactHostSchema } from '@nx/react/src/generators/host/schema'
import type { Schema as ReactRemoteSchema } from '@nx/react/src/generators/remote/schema'
import type { Schema as ReactLibrarySchema } from '@nx/react/src/generators/library/schema'

type DefaultReactPropsSchema = {
  linter: Linter
  style: SupportedStyles
  skipFormat: boolean
  unitTestRunner: 'jest' | 'none' | 'vitest'
}

type DefaultReactHostSchema = Omit<ReactHostSchema, 'directory' | 'name'>

type DefaultReactRemoteSchema = Omit<ReactRemoteSchema, 'directory' | 'name'>

type DefaultReactLibrarySchema = Omit<ReactLibrarySchema, 'directory' | 'name'>

export const defaultReactProps: DefaultReactPropsSchema = {
  linter: Linter.EsLint,
  style: 'styled-components',
  skipFormat: false,
  unitTestRunner: 'jest',
}

export const defaultReactHostProps: DefaultReactHostSchema = {
  ...defaultReactProps,
  e2eTestRunner: 'none',
}

export const defaultReactRemoteProps: DefaultReactRemoteSchema = {
  ...defaultReactProps,
  e2eTestRunner: 'none',
}

export const defaultReactLibraryProps: DefaultReactLibrarySchema = {
  ...defaultReactProps,
  bundler: 'none',
}
