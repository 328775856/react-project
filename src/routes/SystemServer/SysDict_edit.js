import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysDictId >= 0) {
        fieldsValue.sysDictId = formData.sysDictId;
        update(fieldsValue);
      } else {
        add(fieldsValue);
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
      <FormItem {...formItemLayout} label="字典组编号">
        {form.getFieldDecorator('dictNo', {
          initialValue: formData.dictNo || '',
          rules: [
            {
              required: true,
              message: '请输入字典组编号...'
            }
          ]
        })(<InputNumber min={1} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="字典组名称">
        {form.getFieldDecorator('dictName', {
          initialValue: formData.dictName || '',
          rules: [
            {
              required: true,
              message: '请输入字典组名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="字典组备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [
            {
              required: false,
              message: '请输入字典组备注...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
