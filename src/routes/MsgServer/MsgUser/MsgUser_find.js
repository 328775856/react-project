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
let show = false;

function CreateFindFrom(props, userId, nickname, formQuery, formReset, openSelectUserInfoModal) {
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
          <FormItem label="消息标题">
            {form.getFieldDecorator('msgTitle')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="消息内容">
            {form.getFieldDecorator('msgContent')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="是否已读">
            {form.getFieldDecorator('isRead')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <span>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={formReset}>
              重置
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}

export default CreateFindFrom;
