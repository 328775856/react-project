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
          <FormItem label="标题">
            {form.getFieldDecorator('recommendTitle')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="发布状态">
            {form.getFieldDecorator('publishStatus')(
              <Select>
                <Select.Option value="0">未发布</Select.Option>
                <Select.Option value="1">已发布</Select.Option>
                <Select.Option value="2">定时发布</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="发布时间">
            {form.getFieldDecorator('publishDateStart')(
              <DatePicker format="YYYY-MM-DD" placeholder="开始时间" />
            )}
            &nbsp;-&nbsp;
            {form.getFieldDecorator('publishDateEnd')(
              <DatePicker format="YYYY-MM-DD" placeholder="结束时间" />
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
