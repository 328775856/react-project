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
function CreateFindFrom(props, formQuery, formReset) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form
      onSubmit={formQuery}
      layout="inline"
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="上架状态">
            {form.getFieldDecorator('shelfStatus')(
              <Select
                placeholder=""
                style={{ width: '150px' }}
              >
                <Option key={0}>未上架</Option>
                <Option key={1}>已上架</Option>
                <Option key={2}>已下架</Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="vip包名">
            {form.getFieldDecorator('packageName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
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
