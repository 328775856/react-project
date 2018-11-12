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
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title, options } = props;
  let opt = options.map(item => <Option key={item.sysRoleId}>{item.roleName}</Option>);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysUserId >= 0) {
        fieldsValue.sysUserId = formData.sysUserId;
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
  const isTrueSelect = (
    <Select placeholder="" style={{ width: '150px' }}>
      <Option key={1}>是</Option>
      <Option key={0}>否</Option>
    </Select>
  );
  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="编号">
        {form.getFieldDecorator('userCode', {
          initialValue: formData.userCode || '',
          rules: [
            {
              required: true,
              message: '请输入编号...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('userName', {
          initialValue: formData.userName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="登录密码">
        {form.getFieldDecorator('passwd', {
          initialValue: formData.passwd || '',
          rules: [
            {
              required: true,
              message: '请输入登录密码...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否停止">
        {form.getFieldDecorator('isStop', {
          initialValue: formData.isStop === undefined ? '' : `${formData.isStop}`,
          rules: [
            {
              required: true,
              message: '请输入是否停止...'
            }
          ]
        })(isTrueSelect)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
          rules: [
            {
              required: true,
              message: '请输入备注...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="权限组id">
        {form.getFieldDecorator('sysRoleId', {
          initialValue: `${formData.sysRoleId}` || undefined
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            {opt}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="藏书馆用户id">
        {form.getFieldDecorator('userId', {
          initialValue: formData.userId || ''
        })(<InputNumber min={0} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
