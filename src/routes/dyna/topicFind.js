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
          <FormItem label="话题标题">
            {form.getFieldDecorator('topicTitle')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="话题类型">
            {form.getFieldDecorator('topicType')(
              <Select style={{ width: '100%' }}>
                <Select.Option value="1">话题</Select.Option>
                <Select.Option value="2">活动</Select.Option>
                <Select.Option value="3">投票</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="发布状态">
            {form.getFieldDecorator('publishStatus')(
              <Select style={{ width: '100%' }}>
                <Select.Option value="0">未发布</Select.Option>
                <Select.Option value="1">已发布</Select.Option>
                <Select.Option value="2">定时发布</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="发布时间">
            {form.getFieldDecorator('publishTimeStart')(
              <DatePicker
                format="YYYY-MM-DD HH:mm:ss"
                showTime={{}}
                placeholder="开始时间"
              />
            )}
            &nbsp;-&nbsp;
            {form.getFieldDecorator('publishTimeEnd')(
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
