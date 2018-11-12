import React from 'react';
import { Button, Col, Form, Input, Row, DatePicker } from 'antd';

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
          <FormItem label="图书名">
            {form.getFieldDecorator('bookName')(<Input placeholder="" />)}
          </FormItem>
        </Col>

        <Col
          md={8}
          sm={24}
        >
          <FormItem label="上传时间">
            {form.getFieldDecorator('createTimeStart')(
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{}}
                placeholder="开始时间"
              />
            )}
            &nbsp;-&nbsp;
            {form.getFieldDecorator('createTimeEnd')(
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{}}
                placeholder="结束时间"
              />
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
