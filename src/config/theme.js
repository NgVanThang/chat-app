const theme = {
  light: {
    settings: {
      babel: 'Sáng',
    },
  },
};
const option = Object.keys(languages).map((key) => {
  const { settings } = languages[key];
  return {
    ...settings,
    key: key,
  };
});
