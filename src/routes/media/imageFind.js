import React from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from 'antd';

const FormItem = Form.Item;

function CreateFindFrom(
  props,
  userId,
  nickname,
  formQuery,
  formReset,
  imageGroupGroup,
  add,
  openSelectUserInfoModal
) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="用户id" style={{ display: 'none' }}>
            {form.getFieldDecorator('userId', { initialValue: userId })(
              <Input
                placeholder={userId || '请点击选择'}
                readOnly
                onClick={openSelectUserInfoModal}
              />
            )}
          </FormItem>
          <FormItem label="用户">
            {form.getFieldDecorator('nickname', { initialValue: nickname })(
              <Input
                placeholder={nickname || '请点击选择'}
                readOnly
                onClick={openSelectUserInfoModal}
              />
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="图片名称">
            {getFieldDecorator('imageName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="分组">
            {getFieldDecorator('mediaImageGroupId')(
              <Select placeholder="全部分组">{imageGroupGroup}</Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <span>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={formReset}>
              重置
            </Button>
            <Button type="primary" style={{ marginLeft: 8 }} onClick={() => add()}>
              新建
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateFindFrom;
