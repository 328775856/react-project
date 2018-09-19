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
  let opt = [];
  if (!isEmptyObject(state.options)) {
    opt = state.options.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  const opt1 = [];
  opt1.push(<Option key="-1">请选择</Option>);
  opt1.push(opt);
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
          <FormItem label="名称">
            {form.getFieldDecorator('propName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="是否可借">
            {form.getFieldDecorator('isLend', { initialValue: '-1' })(
              <Select style={{ width: '150px' }}>{opt1}</Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="借阅天数">
            {form.getFieldDecorator('dayLend')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="是否限制">
            {form.getFieldDecorator('isLimit', { initialValue: '-1' })(
              <Select style={{ width: '150px' }}>{opt1}</Select>
            )}
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
