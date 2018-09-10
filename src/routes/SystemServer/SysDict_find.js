import React from 'react';
import { Button, Col, Form, Input, Row } from 'antd';

const FormItem = Form.Item;

function CreateFindFrom(props, formQuery, formReset) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="字典组编号">
            {form.getFieldDecorator('dictNo')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="字典组名称">
            {form.getFieldDecorator('dictName')(<Input placeholder="" />)}
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
