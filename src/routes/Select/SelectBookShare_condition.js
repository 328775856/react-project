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
function CreateConditionForm(props, formQuery, formReset, restTableData) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery}>
      <Row gutter={4}>
        <Col
          md={12}
          sm={12}
        >
          <FormItem label="图书名称">
            {getFieldDecorator('bookName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={12}
          sm={12}
        >
          <FormItem label="图书格式">
            {getFieldDecorator('bookStyleId')(
              <Select placeholder="">{restTableData.bookStyleGroup}</Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={12}
          sm={12}
        >
          <FormItem label="图书分类">
            {getFieldDecorator('bookTypeId')(
              <Select placeholder="">{restTableData.bookTypeGroup}</Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={12}
          sm={12}
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
export default CreateConditionForm;
