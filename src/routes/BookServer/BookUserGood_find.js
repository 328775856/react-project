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
  Divider,
} from 'antd';

const FormItem = Form.Item;
function CreateFindFrom(props, formQuery, formReset) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="图书-用户id">
            {form.getFieldDecorator('bookUserId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="图书编号">
            {form.getFieldDecorator('bookCode')(<Input placeholder="" />)}
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