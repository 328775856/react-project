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
  Divider,
} from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const CreateEditForm = Form.create()(props => {
  const { updateModalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.findSuggestBookId >= 0) {
        fieldsValue.findSuggestBookId = formData.findSuggestBookId;
        update(fieldsValue);
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
    <Modal
      title={title}
      visible={updateModalVisible}
      onOk={okHandle}
      onCancel={() => closeModal('updateModalVisible')}
    >
      <FormItem {...formItemLayout} label="顺序">
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo,
          rules: [
            {
              required: true,
              message: '请输入推荐顺序...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="推荐语">
        {form.getFieldDecorator('suggestDesc', {
          initialValue: formData.suggestDesc,
          rules: [
            {
              required: true,
              message: '请输入长度小于75个字符的推荐语...',
              max: 75,
            },
          ],
        })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
