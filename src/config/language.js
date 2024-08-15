const languages = {
  vi: {
    settings: {
      label: 'Tiếng Việt',
    },
    xinChao: 'Xin chào',
    thongTinNguoiDung: 'Quản lý tài khoản',
    giaoDienSang: 'Sáng',
    giaoDienToi: 'Tối',
    dangXuat: 'Đăng xuất',
    luaChonDichVu: 'Lựa chọn dịch vụ',
    dangTai: 'Đang tải',
  },
  en: {
    settings: {
      label: 'English',
    },
    xinChao: 'Hello',
    thongTinNguoiDung: 'Account management',
    giaoDienSang: 'Light',
    giaoDienToi: 'Dark',
    dangXuat: 'Sign Out',
    luaChonDichVu: 'Service selection',
    dangTai: 'Loading',
  },
};

const option = Object.keys(languages).map((key) => {
  const { settings } = languages[key];
  return {
    ...settings,
    key: key,
  };
});

const getLanguageValue = (langObj, key, defaultValue = '') => {
  return key.split('.').reduce((o, i) => (o && o[i] !== undefined ? o[i] : defaultValue), langObj);
};

export { languages, option, getLanguageValue };
