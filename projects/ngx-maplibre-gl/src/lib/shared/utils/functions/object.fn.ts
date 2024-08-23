export const keepAvailableObjectValues = <T extends object>(object: T): Required<T> => {
  return Object.keys(object).reduce((acc, curr) => {
    const tKey = curr as keyof T;
    if (object[tKey] === undefined) {
      return acc;
    }
    return { ...acc, [tKey]: object[tKey] };
  }, {} as Required<T>);
};
