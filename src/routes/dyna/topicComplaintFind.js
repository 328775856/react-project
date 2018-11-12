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
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="举报内容">
            {form.getFieldDecorator('complaintContent')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="举报类型">
            {form.getFieldDecorator('complaintType', {
              initialValue: ''
            })(
              <Select style={{ width: '100%' }}>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="1">色情相关</Select.Option>
                <Select.Option value="2">不友善行为</Select.Option>
                <Select.Option value="3">广告推销</Select.Option>
                <Select.Option value="4">其他</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="举报人ID">{form.getFieldDecorator('userId')(<InputNumber />)}</FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="被举报人ID">
            {form.getFieldDecorator('toUserId')(<InputNumber />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="举报状态">
            {form.getFieldDecorator('complaintStatus', {
              initialValue: ''
            })(
              <Select style={{ width: '100%' }}>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="0">待处理</Select.Option>
                <Select.Option value="1">已驳回</Select.Option>
                <Select.Option value="2">已隐藏</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="评论或回复ID">
            {form.getFieldDecorator('contentId')(<InputNumber />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="举报对象">
            {form.getFieldDecorator('complaintObj', {
              initialValue: ''
            })(
              <Select style={{ width: '100%' }}>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="1">评论</Select.Option>
                <Select.Option value="2">回复</Select.Option>
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
