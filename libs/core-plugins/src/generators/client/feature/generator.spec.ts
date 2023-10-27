import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { Tree, readProjectConfiguration } from '@nx/devkit'

import { clientFeatureGenerator } from './generator'
import { ClientFeatureGeneratorSchema } from './schema'

describe('client/feature generator', () => {
  let tree: Tree
  const options: ClientFeatureGeneratorSchema = {
    name: 'test',
    project: 'test',
  }

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should run successfully', async () => {
    await clientFeatureGenerator(tree, options)
    const config = readProjectConfiguration(tree, 'test')
    expect(config).toBeDefined()
  })
})
