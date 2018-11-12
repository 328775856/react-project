import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, closeModal, formData, title } = props;
  let {
    sn,
    productName,
    productTypeName,
    upProduct,
    nickname,
    payType,
    orderStatus,
    amtFact,
    createTime,
    payDateTime
  } = formData;

  if (payType === 0) {
    payType = '苹果余额';
  } else if (payType === 1) {
    payType = '微信支付';
  } else if (payType === 2) {
    payType = '支付宝支付';
  } else if (payType === 3) {
    payType = '苹果支付';
  } else if (payType === 4) {
    payType = '微信h5支付';
  }

  if (orderStatus === 0) {
    orderStatus = '待支付';
  } else if (orderStatus === 1) {
    orderStatus = '订单超时';
  } else if (orderStatus === 2) {
    orderStatus = '交易成功';
  }

  const cancelHandle = () => {
    form.resetFields();
    closeModal();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 }
    }
  };

  return (
    <Modal title={title} visible={modalVisible} onCancel={cancelHandle} footer={null}>
      <FormItem {...formItemLayout} label="订单编号">
        {form.getFieldDecorator('sn', {
          initialValue: sn
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="商品名称">
        {form.getFieldDecorator('productName', {
          initialValue: productName
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="商品类型">
        {form.getFieldDecorator('商品类型', {
          initialValue: productTypeName
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="商品价格">
        {form.getFieldDecorator('upProduct', {
          initialValue: upProduct
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="购买人昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: nickname
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="支付渠道">
        {form.getFieldDecorator('payType', {
          initialValue: payType
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="订单状态">
        {form.getFieldDecorator('orderStatus', {
          initialValue: orderStatus
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="实收金额">
        {form.getFieldDecorator('amtFact', {
          initialValue: amtFact
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="创建日期">
        {form.getFieldDecorator('createTime', {
          initialValue: createTime
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="支付时间">
        {form.getFieldDecorator('payDateTime', {
          initialValue: payDateTime
        })(<Input readOnly />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
