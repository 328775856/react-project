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

import { isEmptyObject } from '../../../utils/utils';

const FormItem = Form.Item;

function CreateFindForm(props, formQuery, formReset, curState) {
  const { form } = props;
  const { getFieldDecorator } = form;
  let options = '';
  if (!isEmptyObject(curState.options)) {
    options = curState.options.map(item => (
      <Select.Option key={item.itemNo} vlaue={item.itemNo}>
        {item.itemLabel}
      </Select.Option>
    ));
  }

  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="消息分类">
            {getFieldDecorator('msgType')(<Select placeholder="">{options}</Select>)}
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

export default CreateFindForm;
