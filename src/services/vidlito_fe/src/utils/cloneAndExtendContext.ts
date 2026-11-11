export const cloneAndExtendContext = (
  context: { [key: string]: any },
  moreContext: { [key: string]: any }
) => {
  const clone = {};
  for (const key in context) {
    Object.defineProperty(clone, key, {
      get:
        key in moreContext
          ? //
            () => moreContext[key]
          : () => context[key],
      enumerable: true,
      configurable: true,
    });
  }
  return clone;
};
