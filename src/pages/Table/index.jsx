import { useState } from 'react';
import Table from '~/components/Table';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, Input, Typography, Select, InputNumber, Row, Col } from 'antd';

function TablePage() {
  const [form] = Form.useForm();
  const [cloumns, setColumns] = useState([]);
  function slugify(title) {
    //Đổi chữ hoa thành chữ thường
    let slug = title.toLowerCase();

    //Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    //Xóa các ký tự đặt biệt
    slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
    //Đổi khoảng trắng thành ký tự gạch ngang
    slug = slug.replace(/ /gi, '-');
    //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
    //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
    slug = slug.replace(/\-\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-\-/gi, '-');
    slug = slug.replace(/\-\-\-/gi, '-');
    slug = slug.replace(/\-\-/gi, '-');
    //Xóa các ký tự gạch ngang ở đầu và cuối
    slug = '@' + slug + '@';
    slug = slug.replace(/\@\-|\-\@|\@/gi, '');
    return slug;
  }

  const handleCreateRow = () => {
    const innitColumn = [];
    form.getFieldsValue().items.map((item, index) => {
      if (item.name !== undefined) {
        const name = item?.name || 'Cột khởi tạo';
        innitColumn.push({
          title: name,
          width: item?.width ?? 150,
          dataIndex: slugify(name + '-' + index),
          fixed: item.fixed ?? false,
          ellipsis: item.ellipsis ?? true,
        });
      }
    });
    setColumns(innitColumn);
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
              maxWidth: '100%',
            }}
            autoComplete="off"
            initialValues={{
              items: [],
            }}
          >
            <Form.List name="items">
              {(fields, { add, remove }) => (
                <div
                  style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                  }}
                >
                  <Button type="dashed" onClick={() => add()} block>
                    + Thêm cột
                  </Button>
                  <Button onClick={handleCreateRow} type="primary" danger>
                    Tạo thành phần
                  </Button>
                  <div
                    style={{
                      maxHeight: 350,
                      overflow: 'auto',
                      display: 'flex',
                      rowGap: 16,
                      flexDirection: 'column',
                    }}
                  >
                    {fields.map((field) => (
                      <Card
                        size="small"
                        title={`Cột ${field.name + 1}`}
                        key={field.key}
                        extra={
                          <CloseOutlined
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        }
                      >
                        <Form.Item label="Tên" initialValue={`Cột mới`} name={[field.name, 'name']}>
                          <Input />
                        </Form.Item>
                        <Form.Item label="Độ rộng" initialValue={150} name={[field.name, 'width']}>
                          <InputNumber
                            style={{
                              width: '100%',
                            }}
                          />
                        </Form.Item>
                        <Form.Item label="Thả nổi" initialValue={'none'} name={[field.name, 'fixed']}>
                          <Select
                            style={{
                              width: 120,
                            }}
                            options={[
                              {
                                value: 'left',
                                label: 'Trái',
                              },
                              {
                                value: 'right',
                                label: 'Phải',
                              },
                              {
                                value: 'none',
                                label: 'Không',
                              },
                            ]}
                          />
                        </Form.Item>
                        <Form.Item label="Điều chỉnh nội dung" initialValue={true} name={[field.name, 'ellipsis']}>
                          <Select
                            style={{
                              width: 120,
                            }}
                            options={[
                              {
                                value: true,
                                label: 'Có',
                              },
                              {
                                value: false,
                                label: 'Không',
                              },
                            ]}
                          />
                        </Form.Item>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Form.List>
          </Form>
        </Col>
        <Col span={12}></Col>
      </Row>

      <Table cloumns={cloumns} />
    </>
  );
}

export default TablePage;
