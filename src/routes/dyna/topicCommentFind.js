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

function CreateFindFrom(props, formQuery, formReset, dynaTopicId) {
  const { form } = props;
  const { getFieldDecorator } = form;
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <FormItem label="话题id" style={{ display: 'none' }}>
          {form.getFieldDecorator('dynaTopicId', { initialValue: dynaTopicId || '' })(
            <Input placeholder="" />
          )}
        </FormItem>
        <Col md={8} sm={24}>
          <FormItem label="内容关键字">
            {form.getFieldDecorator('commentContent')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="状态">
            {form.getFieldDecorator('isDel')(
              <Select style={{ width: '100%' }}>
                <Select.Option value="1">隐藏</Select.Option>
                <Select.Option value="0">正常</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={6} sm={24}>
          <FormItem label="排序">
            {form.getFieldDecorator('orderBy')(
              <Select style={{ width: '100%' }}>
                <Select.Option value="">系统默认</Select.Option>
                <Select.Option value="1">发表时间倒序</Select.Option>
                <Select.Option value="2">发表时间正序</Select.Option>
                <Select.Option value="3">回复数高到低</Select.Option>
                <Select.Option value="4">点赞数高到低</Select.Option>
              </Select>
            )}
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
