import React from 'react';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';

const FormItem = Form.Item;
function CreateConditionForm(props, formQuery, formReset) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery}>
      <Row gutter={4}>
        <Col md={12} sm={12}>
          <FormItem label="用户Id">
            {getFieldDecorator('userId')(<InputNumber placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={12}>
          <FormItem label="用户名称">
            {getFieldDecorator('nickname')(<Input placeholder="" />)}
          </FormItem>
        </Col>

        <Col md={12} sm={12}>
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
export default CreateConditionForm;
