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
  const { modalVisible, form, add, update, closeModal, formData, title, isEmptyObject } = props;
  let options = '';
  if (!isEmptyObject(props.state.options)) {
    options = props.state.options.map(item => (
      <Option key={item.productTypeId}>{item.productTypeName}</Option>
    ));
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.orderProductId >= 0) {
        fieldsValue.orderProductId = formData.orderProductId;
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
        label="产品名称"
      >
        {form.getFieldDecorator('productName', {
          initialValue: formData.productName || '',
          rules: [
            {
              required: true,
              message: '请输入产品名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="产品单价"
      >
        {form.getFieldDecorator('upProduct', {
          initialValue: formData.upProduct || '',
          rules: [
            {
              required: true,
              message: '请输入产品单价...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="产品类型"
      >
        {form.getFieldDecorator('orderProductTypeId', {
          initialValue:
            formData.orderProductTypeId === undefined ? '' : `${formData.orderProductTypeId}`,
          rules: [
            {
              required: true,
              message: '请输入产品类型...'
            }
          ]
        })(
          <Select
            placeholder=""
            style={{ width: '150px' }}
          >
            {options}
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="业务id"
      >
        {form.getFieldDecorator('businessId', {
          initialValue: formData.businessId || '',
          rules: [
            {
              required: true,
              message: '请输入业务id...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
