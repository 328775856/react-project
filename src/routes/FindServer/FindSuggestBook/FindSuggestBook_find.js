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
const { Option } = Select;
function CreateFindFrom(props, formQuery, formReset, options, handleChange) {
  const { form } = props;
  const { getFieldDecorator } = form;
  const opt = options.map(item => (
    <Option key={item.findChannelId} value={item.findChannelId}>
      {item.channelName}
    </Option>
  ));
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="所属栏目">
            {form.getFieldDecorator('findChannelId', {
              initialValue: options.length === 0 ? '' : options[0].findChannelId
            })(<Select onChange={handleChange}>{opt}</Select>)}
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
