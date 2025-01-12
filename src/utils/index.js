export const formatObject = (object) => {
  return Object.values(
    object.reduce((acc, item) => {
      acc[item.key] = item;
      return acc;
    }, {}),
  ).map(({ key, value }, _) => {
    return { [key]: value };
  });
};
