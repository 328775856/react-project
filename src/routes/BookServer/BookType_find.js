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
import { isEmptyObject } from '../../utils/utils';

const FormItem = Form.Item;
function CreateFindFrom(props, formQuery, formReset, state) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let opt = [];
  if (!isEmptyObject(state.options)) {
    opt = state.options.map(item => (
      <Select.Option key={item.itemNo}>{item.itemLabel}</Select.Option>
    ));
  }
  const opt1 = [];
  opt1.push(<Select.Option key="-1">请选择</Select.Option>);
  opt1.push(opt);
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="分类名称">
            {form.getFieldDecorator('typeName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="是否禁用">
            {form.getFieldDecorator('isForbid', { initialValue: '-1' })(<Select>{opt1}</Select>)}
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
