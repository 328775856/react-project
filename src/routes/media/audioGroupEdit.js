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
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.mediaAudioGroupId >= 0) {
        fieldsValue.mediaAudioGroupId = formData.mediaAudioGroupId;
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
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
    >
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('audioGroupName', {
          initialValue: formData.audioGroupName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="顺序">
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [
            {
              required: true,
              message: '请输入顺序...'
            }
          ]
        })(<InputNumber min={0} max={255} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否默认分组">
        {form.getFieldDecorator('isDefault', {
          initialValue: formData.isDefault === undefined ? '' : `${formData.isDefault}`,
          rules: [
            {
              required: true,
              message: '请选择是否默认分组'
            }
          ]
        })(
          <Select style={{ width: '100%' }}>
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
