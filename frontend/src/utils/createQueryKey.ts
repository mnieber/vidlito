export const createQueryKey = <T>(name: string, x: T): [string, T] => {
  return [name, x];
};
