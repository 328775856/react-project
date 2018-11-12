import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const value = fieldsValue;
      if (formData.sysAnalysisTagId >= 0) {
        value.sysAnalysisTagId = formData.sysAnalysisTagId;
        update(value);
      } else {
        add(value);
      }
    });
  };

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
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="标签名称">
        {form.getFieldDecorator('labelName', {
          initialValue: formData.labelName || '',
          rules: [
            {
              required: true,
              message: '请输入标签名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理类">
        {form.getFieldDecorator('tagClass', {
          initialValue: formData.tagClass || '',
          rules: [
            {
              required: true,
              message: '请输入处理类...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
