const languages = {
  vi: {
    settings: {
      label: 'Tiếng Việt',
    },
    xinChao: 'Xin chào',
    thongTinNguoiDung: 'Tài khoản',
    giaoDienSang: 'Sáng',
    giaoDienToi: 'Tối',
    dangXuat: 'Đăng xuất',
    luaChonDichVu: 'Lựa chọn dịch vụ',
    dangTai: 'Đang tải',
    nhanTin: 'Nhắn tin',
    lienHe: 'Liên hệ',
    thongTinDuAn: 'Thông tin dự án',
    maNguonVaDongGop: 'Mã nguồn và đóng góp',
    mangXaHoi: 'Mạng xã hội',
    dong: 'Đóng',
    quetMaDeLienHe: 'Quét mã để liên hệ',
  },
  en: {
    settings: {
      label: 'English',
    },
    xinChao: 'Hello',
    thongTinNguoiDung: 'Account',
    giaoDienSang: 'Light',
    giaoDienToi: 'Dark',
    dangXuat: 'Sign Out',
    luaChonDichVu: 'Service selection',
    dangTai: 'Loading',
    nhanTin: 'Chat',
    lienHe: 'Contact',
    thongTinDuAn: 'Project information',
    maNguonVaDongGop: 'Source code and contributions',
    mangXaHoi: 'Social network',
    dong: 'Close',
    quetMaDeLienHe: 'Scan code to contact',
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
