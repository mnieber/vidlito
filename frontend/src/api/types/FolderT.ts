export type FolderT = {
  sortPos: number;
  name: string;
  id: string;
  level: number;
  parentFolder: FolderT | null;
};

export const sortFolders = (folders: FolderT[]): FolderT[] => {
  // Return folders in the order they should be displayed in a tree view.
  // Moreover, set the level field of each folder.
  const sortedFolders: FolderT[] = [];
  const folderById: { [id: string]: FolderT } = {};
  folders.forEach((folder: FolderT) => {
    folderById[folder.id] = folder;
  });
  folders.forEach((folder: FolderT) => {
    if (folder.parentFolder === null) {
      folder.level = 0;
      sortedFolders.push(folder);
    }
  });
  let i = 0;
  while (i < sortedFolders.length) {
    const folder = sortedFolders[i];
    const childFolders = folders
      .filter((f: FolderT) => f.parentFolder?.id === folder.id)
      .sort((a: FolderT, b: FolderT) => a.sortPos - b.sortPos);
    childFolders.forEach((f: FolderT) => {
      f.level = folder.level + 1;
      sortedFolders.splice(i + 1, 0, f);
      i += 1;
    });
    i += 1;
  }
  return sortedFolders;
};
