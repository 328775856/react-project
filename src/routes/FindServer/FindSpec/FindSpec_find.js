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

function CreateFindFrom(props, formQuery, formReset, getDataForAdd) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="专题名称">
            {getFieldDecorator('specName')(<Input placeholder="请输入专题名称..." />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="发布状态:">
            {getFieldDecorator('publishStatus')(
              <Select placeholder="---请选择---">
                <Select.Option key={null}>---请选择---</Select.Option>
                <Select.Option key={0} value={0}>
                  未发布
                </Select.Option>
                <Select.Option key={1} value={1}>
                  已发布
                </Select.Option>
                <Select.Option key={2} value={2}>
                  定时发布
                </Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="发布日期">
            {getFieldDecorator('publishDate')(<DatePicker format="YYYYMMDD" />)}
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
            <Button type="primary" style={{ marginLeft: 8 }} onClick={() => getDataForAdd()}>
              新建
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
