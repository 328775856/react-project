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
  Divider,
} from 'antd';
const FormItem = Form.Item;
function CreateFindFrom(props, formQuery, formReset, findListId) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <FormItem label="话题id" style={{ display: 'none' }}>
          {form.getFieldDecorator('findListId', { initialValue: findListId || '' })(
            <Input placeholder="" />
          )}
        </FormItem>
      </Row>
    </Form>
  );
}
export default CreateFindFrom;
