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
const Option = Select.Option;
function CreateConditionForm(props, formQuery, formReset, options) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const deptOptions = options.map(item => <Option key={item.name}>{item.name}</Option>);
  return (
    <Form onSubmit={formQuery}>
      <Row gutter={8}>
        <Col
          md={12}
          sm={24}
        >
          <FormItem label="编号">{getFieldDecorator('code')(<Input placeholder="" />)}</FormItem>
        </Col>
        <Col
          md={12}
          sm={24}
        >
          <FormItem label="名称">{getFieldDecorator('name')(<Input placeholder="" />)}</FormItem>
        </Col>
      </Row>
      <Row gutter={8}>
        <Col
          md={12}
          sm={24}
        >
          <FormItem label="部门">
            {getFieldDecorator('dept')(<Select placeholder="">{deptOptions}</Select>)}
          </FormItem>
        </Col>
        <Col
          md={12}
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
export default CreateConditionForm;
