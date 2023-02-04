import { ObjT } from 'src/utils/types';

export const applyUpdate = (path: string, data: ObjT, update: Function) => {
  const pathParts = path.split('.');
  return applyUpdateImp(pathParts, 0, data, update);
};

const applyUpdateImp = (
  paths: (string | number)[],
  pathIdx: number,
  data: any,
  update: Function
) => {
  const path = paths[pathIdx];

  if (pathIdx === paths.length - 1) {
    return { ...data, [path]: update(data[path]) };
  }

  if (path === '*') {
    const result: any = Array.isArray(data) ? [] : {};
    for (const idx in data) {
      result[idx] = applyUpdateImp(paths, pathIdx + 1, data[idx], update);
    }
    return result;
  }

  const result = Array.isArray(data) ? [...data] : { ...data };
  result[path as number] = applyUpdateImp(
    paths,
    pathIdx + 1,
    data[path as number],
    update
  );
  return result;
};
