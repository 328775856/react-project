/* eslint-disable no-unused-vars,prefer-const */
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
function CreateFindFrom(props, formQuery, formReset, state) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let opt1 = [];
  opt1.push(<Select.Option key="0">未发布</Select.Option>);
  opt1.push(<Select.Option key="1">已发布</Select.Option>);
  opt1.push(<Select.Option key="2">定时发布</Select.Option>);
  return (
    <Form
      onSubmit={formQuery}
      layout="inline"
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col
          md={6}
          sm={24}
        >
          <FormItem label="课程名称">
            {form.getFieldDecorator('courseName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={4}
          sm={24}
        >
          <FormItem label="发布状态">
            {form.getFieldDecorator('publishStatus')(
              <Select style={{ width: '150px' }}>{opt1}</Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={4}
          sm={24}
        >
          <FormItem label="创建时间">
            {form.getFieldDecorator('createTime')(<DatePicker format="YYYYMMDD" />)}
          </FormItem>
        </Col>
        <Col
          md={6}
          sm={24}
        >
          <span>
            <Button
              type="primary"
              htmlType="submit"
            >
              查询
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={formReset}
            >
              重置
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
