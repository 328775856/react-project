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
function CreateFindFrom(props, formQuery, formReset, articleGroup) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={10}>
          <FormItem label="热门搜索词">
            {form.getFieldDecorator('hotWords')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={10}>
          <FormItem label="是否标红">
            {form.getFieldDecorator('isRed')(
              <Select placeholder="全部" style={{ width: '100%' }}>
                <Select.Option value="0">未标红</Select.Option>
                <Select.Option value="1">已标红</Select.Option>
              </Select>
            )}
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
