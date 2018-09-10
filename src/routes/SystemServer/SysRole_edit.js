import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysRoleId >= 0) {
        fieldsValue.sysRoleId = formData.sysRoleId;
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
      <FormItem {...formItemLayout} label="编号">
        {form.getFieldDecorator('roleCode', {
          initialValue: formData.roleCode || '',
          rules: [
            {
              required: true,
              message: '请输入编号...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('roleName', {
          initialValue: formData.roleName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [
            {
              required: false,
              message: '请输入备注...',
            },
          ],
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
