import React from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysParamId >= 0) {
        fieldsValue.sysParamId = formData.sysParamId;
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
      md: { span: 5 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 13 }
    }
  };

  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => closeModal()}
    >
      <FormItem
        {...formItemLayout}
        label="参数编码"
      >
        {form.getFieldDecorator('sysParamId', {
          initialValue: formData.sysParamId || '',
          rules: [
            {
              required: true,
              message: '请输入参数编码...'
            }
          ]
        })(<InputNumber />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="参数值"
      >
        {form.getFieldDecorator('paramValue', {
          initialValue: formData.paramValue || '',
          rules: [
            {
              required: true,
              message: '请输入参数值...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="备注"
      >
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [
            {
              required: false,
              message: '请输入备注...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
