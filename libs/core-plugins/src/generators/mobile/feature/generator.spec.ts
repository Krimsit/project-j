import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { mobileFeatureGenerator } from './generator';
import { MobileFeatureGeneratorSchema } from './schema';

describe('mobile/feature generator', () => {
  let tree: Tree;
  const options: MobileFeatureGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await mobileFeatureGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
