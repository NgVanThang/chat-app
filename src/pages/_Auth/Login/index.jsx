import { GoogleOutlined, FacebookFilled } from '@ant-design/icons';
import { message } from 'antd';

import { signInWithGoogle, signInWithFacebook } from '~/services/authService';
import style from '~/assets/css/pages/login.module.scss';

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();

  const hanldeLoginFacebook = async () => {
    const user = await signInWithFacebook();

    if (!user) {
      messageApi.open({
        type: 'error',
        content: 'Đăng nhập thất bại',
      });

      return;
    }
  };
  const hanldeLoginGoogle = async () => {
    const user = await signInWithGoogle();

    if (!user) {
      messageApi.open({
        type: 'error',
        content: 'Đăng nhập thất bại',
      });

      return;
    }
  };

  return (
    <div className={style['body']}>
      {contextHolder}
      <div className={style['background']}>
        <div className={style['shape']}></div>
        <div className={style['shape']}></div>
      </div>
      <form className={style['form']}>
        <h3>Đăng nhập</h3>
        <div className={style['social']}>
          <button onClick={hanldeLoginGoogle} className={style['go']} type="button">
            <GoogleOutlined /> Google
          </button>
          <button onClick={hanldeLoginFacebook} className={style['fb']} type="button">
            <FacebookFilled /> Facebook
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
