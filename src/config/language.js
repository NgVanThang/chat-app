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
    nhapNoiDungTinNhan: 'Nhập nội dung tin nhắn...',
    khongCoTinNhan: 'Không có tin nhắn',
    ngayTruoc: 'ngày trước',
    gioTruoc: 'giờ trước',
    phutTruoc: 'phút trước',
    vaiGiayTruoc: 'Vài giây trước',
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
    nhapNoiDungTinNhan: 'Enter your message...',
    khongCoTinNhan: 'No message',
    ngayTruoc: 'days ago',
    gioTruoc: 'hours ago',
    phutTruoc: 'minutes ago',
    vaiGiayTruoc: 'A few seconds ago',
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
