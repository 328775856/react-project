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
  debugger;
  const Option = Select.Option;
  const {
    modalVisible,
    form,
    addSave,
    updateSave,
    closeModal,
    formData,
    title,
    gateClientOptions
  } = props;
  let gateClientOptionsHtm = '';
  if (gateClientOptions != undefined) {
    gateClientOptionsHtm = gateClientOptions.map(item => (
      <Option key={item.id}>{item.name}</Option>
    ));
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      debugger;
      if (err) return;
      form.resetFields();
      if (formData.id >= 0) {
        fieldsValue.id = formData.id;
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
        label="serviceId"
      >
        {form.getFieldDecorator('serviceId', {
          initialValue: `${formData.serviceId}` || ''
        })(
          <Select
            placeholder=""
            style={{ width: '150px' }}
          >
            {gateClientOptionsHtm}
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="clientId"
      >
        {form.getFieldDecorator('clientId', {
          initialValue: `${formData.clientId}` || ''
        })(
          <Select
            placeholder=""
            style={{ width: '150px' }}
          >
            {gateClientOptionsHtm}
          </Select>
        )}
      </FormItem>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="description"
      >
        {form.getFieldDecorator('description', {
          initialValue: formData.description || '',
          rules: [{ required: true, message: 'description...' }]
        })(<Input
          placeholder="请输入"
          value={formData.description}
        />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
