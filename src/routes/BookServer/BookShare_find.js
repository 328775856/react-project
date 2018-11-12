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
  Badge
} from 'antd';

const FormItem = Form.Item;
function CreateFindFrom(props, formQuery, formReset, clearES) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="上传用户ID">
            {form.getFieldDecorator('userId')(<InputNumber />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="图书名">
            {form.getFieldDecorator('bookName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="作者">
            {form.getFieldDecorator('bookAuthor')(<Input placeholder="" />)}
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
            <Button style={{ marginLeft: 8 }} type="primary" onClick={() => clearES()}>
              清除ES
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
