import type {
  Tree
} from '@nx/devkit'

export const rewriteLibIndex = (tree: Tree, indexFilePath: string) => {
  tree.write(indexFilePath, `export * from './lib'`)

  return tree
}

export const rewriteLibIndexFiles = (tree: Tree, filesToRewritePaths: string[]) => {
  filesToRewritePaths.forEach(file => rewriteLibIndex(tree, file))

  return tree
}

