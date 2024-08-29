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
  const { lang, theme: themeMode } = configLayout;

  const languageSelected = language.languages[lang];

  useEffect(() => {
    localStorage.setItem('configLayout', JSON.stringify(configLayout));
  }, [configLayout]);

  const customThemeLight = {
    token: {
      customBackgroundColor: '#ffffff',
      customBackgroundHeader: '#fafafa',
      customBackgroundFooter: '#f5f5f5',

      customColorPrimary: '#000000',
      colorBgElevated: '#ffffff',
      colorText: '#333333', // Màu chữ

      borderRadius: 10,
      borderColor: 'red', // Màu đường viền tùy chỉnh
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

      customBackgroundChat: '#f3f1f1',
      customBackgroundButton: 'linear-gradient(135deg, #2c3e50, #34495e)',
    },
  };

  const customThemeDark = {
    token: {
      colorBgContainer: '#141414',
      customBackgroundColor: '#262626',
      customBackgroundHeader: '#141414',
      customBackgroundFooter: '#141414',

      customColorPrimary: '#ffffff',
      colorBgElevated: '#1f1f1f',
      colorText: '#ffffff', // Màu chữ
      colorTextDisabled: '#727272',

      colorTextBase: '#ffffff',

      borderRadius: 10,
      borderColor: 'red', // Màu đường viền tùy chỉnh
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',

      customBackgroundChat: '#41a3ff',
      customBackgroundButton: 'red',
    },
  };

  return (
    <ConfigLayout.Provider
      value={{ configLayout, setConfigLayout, languageOption: { languageSelected, getLanguageValue } }}
    >
      <ConfigProvider theme={themeMode === 'light' ? customThemeLight : customThemeDark}>{children}</ConfigProvider>
    </ConfigLayout.Provider>
  );
}

export const GetConfigLayout = () => {
  return useContext(ConfigLayout);
};

export default ConfigProviderTheme;
