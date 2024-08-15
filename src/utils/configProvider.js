import { useEffect, useState, createContext, useContext } from 'react';
import { ConfigProvider } from 'antd';

import { language } from '~/config';

export const ConfigLayout = createContext();

function ConfigProviderTheme({ children }) {
  const [configLayout, setConfigLayout] = useState(
    JSON.parse(localStorage.getItem('configLayout')) ?? {
      lang: 'vi',
      theme: 'light',
    },
  );

  const { getLanguageValue } = language;
  const { lang, theme } = configLayout;

  const languageSelected = language.languages[lang];

  useEffect(() => {
    localStorage.setItem('configLayout', JSON.stringify(configLayout));
  }, [configLayout]);

  const customThemeLight = {
    token: {
      customBackgroundColor: '#ffffff',
      customBackgroundHeader: '#fafafa',

      customColorPrimary: '#000000',
    },
  };

  const customThemeDark = {
    token: {
      customBackgroundColor: '#262626',
      customBackgroundHeader: '#141414',

      customColorPrimary: '#ffffff',
    },
  };

  return (
    <ConfigLayout.Provider
      value={{ configLayout, setConfigLayout, languageOption: { languageSelected, getLanguageValue } }}
    >
      <ConfigProvider theme={theme === 'light' ? customThemeLight : customThemeDark}>{children}</ConfigProvider>
    </ConfigLayout.Provider>
  );
}

export const GetConfigLayout = () => {
  return useContext(ConfigLayout);
};

export default ConfigProviderTheme;
