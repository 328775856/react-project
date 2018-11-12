import React from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';

import { isEmptyObject } from '../../utils/utils';

const FormItem = Form.Item;
function CreateFindFrom(props, formQuery, formReset, curState) {
  const { form } = props;
  let options = null;
  if (!isEmptyObject(curState.options)) {
    options = curState.options.map(item => (
      <Select.Option key={item.productTypeId} vlaue={item.productTypeId}>
        {item.productTypeName}
      </Select.Option>
    ));
  }
  return (
    <Form onSubmit={formQuery} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="商品名称">
            {form.getFieldDecorator('productName')(<Input placeholder="" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="订单编号">
            {form.getFieldDecorator('sn')(<Input placeholder="" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}>
          <FormItem label="订单状态">
            {form.getFieldDecorator('orderStatus', {
              initialValue: ''
            })(
              <Select>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="0">待支付</Select.Option>
                <Select.Option value="1">订单超时</Select.Option>
                <Select.Option value="2">交易成功</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem label="支付渠道">
            {form.getFieldDecorator('payType', {
              initialValue: ''
            })(
              <Select>
                <Select.Option value="">不限</Select.Option>
                <Select.Option value="0">苹果余额</Select.Option>
                <Select.Option value="1">微信支付</Select.Option>
                <Select.Option value="2">支付宝支付</Select.Option>
                <Select.Option value="3">苹果支付</Select.Option>
                <Select.Option value="4">微信h5支付</Select.Option>
              </Select>
            )}
          </FormItem>
        </Col>
        <Col md={4} sm={24}>
          <FormItem label="商品类型">
            {form.getFieldDecorator('productTypeId', {
              initialValue: ''
            })(
              <Select>
                <Select.Option value="">不限</Select.Option>
                {options}
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
