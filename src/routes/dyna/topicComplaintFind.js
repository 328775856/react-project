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
          <FormItem label="举报内容">
            {form.getFieldDecorator('complaintContent')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="举报类型(字典:1,色情相关;2,不友善行为;3,广告推销;4,其他, 默认为4 )">
            {form.getFieldDecorator('complaintType')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="举报人id">
            {form.getFieldDecorator('userId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="被举报人id">
            {form.getFieldDecorator('toUserId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="举报状态(字典:0待处理;1已驳回,2已隐藏.默认为0)">
            {form.getFieldDecorator('complaintStatus')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="评论或回复id">
            {form.getFieldDecorator('contentId')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col
          md={8}
          sm={24}
        >
          <FormItem label="举报对象(字典:1评论,2回复,默认为1)">
            {form.getFieldDecorator('complaintObj')(<Input placeholder="" />)}
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
