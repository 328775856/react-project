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
  const { modalVisible, form, addSave, updateSave, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.mediaImageGroupId >= 0) {
        fieldsValue.mediaImageGroupId = formData.mediaImageGroupId;
        updateSave(fieldsValue);
      } else {
        addSave(fieldsValue);
      }
    });
  };
  return (
    <Modal
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => closeModal()}
    >
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="分组ID"
        style={{ display: 'none' }}
      >
        {form.getFieldDecorator('mediaImageGroupId', {})(<Input />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="分组名称"
      >
        {form.getFieldDecorator('imageGroupName', {
          initialValue: formData.imageGroupName || '',
          rules: [{ required: true, message: '请输入分组名称...' }]
        })(<Input
          placeholder="请输入"
          value={formData.imageGroupName}
        />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="顺序"
      >
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [{ required: true, message: '请输入顺序...' }]
        })(<Input
          placeholder="请输入"
          value={formData.indexNo}
        />)}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="是否默认"
      >
        {form.getFieldDecorator('isDefault', {
          initialValue: formData.isDefault || ''
        })(
          <Select
            value={formData.isDefault}
            style={{ width: '100%' }}
          >
            <Select.Option value="1">是</Select.Option>
            <Select.Option value="0">否</Select.Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
