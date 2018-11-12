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
function CreateFindFrom(props, formQuery, formReset, isEmptyObject, state) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let opt1 = [];
  let opt2 = [];
  let opt3 = [];
  if (!isEmptyObject(state.options)) {
    opt1 = state.options['4'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt2 = state.userType.map(item => <Option key={item.userTypeId}>{item.userTypeName}</Option>);
  }
  let opt10 = [];
  opt10.push(<Option key="0">请选择</Option>);
  opt10.push(opt1);
  let opt20 = [];
  opt20.push(<Option key="0">请选择</Option>);
  opt20.push(opt2);
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="账号ID">{form.getFieldDecorator('userId')(<InputNumber />)}</FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="昵称">
            {form.getFieldDecorator('nickname')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="用户类型">
            {form.getFieldDecorator('userTypeId', { initialValue: '0' })(<Select>{opt20}</Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="用户状态">
            {form.getFieldDecorator('userStatus', { initialValue: '0' })(<Select>{opt10}</Select>)}
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
