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
    opt1 = state.options['5'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
    opt3 = state.options['12'].map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  let opt10 = [];
  opt10.push(<Option key="-1">请选择</Option>);
  opt10.push(opt1);
  let opt30 = [];
  opt30.push(<Option key="-1">请选择</Option>);
  opt30.push(opt3);
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="账号ID">{form.getFieldDecorator('userId')(<InputNumber />)}</FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="处理状态">
            {form.getFieldDecorator('dealStatus', { initialValue: '-1' })(<Select>{opt10}</Select>)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="终端类型">
            {form.getFieldDecorator('terminalType', { initialValue: '-1' })(
              <Select>{opt30}</Select>
            )}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="终端名称">
            {form.getFieldDecorator('terminalName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="app版本号">
            {form.getFieldDecorator('versionCode')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="app版本名称">
            {form.getFieldDecorator('versionName')(<Input placeholder="" />)}
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
