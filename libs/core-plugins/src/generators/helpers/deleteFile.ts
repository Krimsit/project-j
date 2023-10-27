import type { Tree } from '@nx/devkit'

export const deleteFile = (tree: Tree, fileToDeletePath: string) => {
  tree.delete(fileToDeletePath)

  return tree
}

export const deleteFiles = (tree: Tree, filesToDeletePaths: string[]) => {
  filesToDeletePaths.forEach(file => deleteFile(tree, file))

  return tree
}
