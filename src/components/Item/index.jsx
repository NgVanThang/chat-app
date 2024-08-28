import { Col, Row } from 'antd';
import style from './style.module.scss';

function ItemComponent({ items }) {
  return (
    <Row>
      {items.map(({ key, label, icon }, index) => {
        // Kiểm tra xem có icon hay không để quyết định chia cột
        const hasIcon = !!icon;
        return (
          <div className={style['item']} key={key || index} span={24}>
            {hasIcon && (
              <Col span={3}>
                <div className={style['icon']}>{icon}</div>
              </Col>
            )}
            <Col span={hasIcon ? 21 : 24}>
              <div className={style['label']}>{label}</div>
            </Col>
          </div>
        );
      })}
    </Row>
  );
}

export default ItemComponent;
