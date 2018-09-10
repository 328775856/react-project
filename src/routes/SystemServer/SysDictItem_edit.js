import React from 'react';
import { Form, Input, Modal, InputNumber } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysDictItemId >= 0) {
        fieldsValue.sysDictItemId = formData.sysDictItemId;
        update(fieldsValue);
      } else {
        add(fieldsValue);
      }
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 },
    },
  };

  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={() => closeModal()}>
      <FormItem {...formItemLayout} label="字典项">
        {form.getFieldDecorator('itemNo', {
          initialValue: formData.itemNo || '',
          rules: [
            {
              required: true,
              message: '请输入字典项...',
            },
          ],
        })(<InputNumber />)}
      </FormItem>
      <FormItem {...formItemLayout} label="字典名称">
        {form.getFieldDecorator('itemLabel', {
          initialValue: formData.itemLabel || '',
          rules: [
            {
              required: true,
              message: '请输入字典名称...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="字典备注">
        {form.getFieldDecorator('itemRemark', {
          initialValue: formData.itemRemark || '',
          rules: [
            {
              required: false,
              message: '请输入字典备注...',
            },
          ],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
