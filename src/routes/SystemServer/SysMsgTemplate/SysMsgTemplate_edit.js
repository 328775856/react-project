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
import { isEmptyObject } from '../../../utils/utils';

const FormItem = Form.Item;
const { TextArea } = Input;

const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title, options, isEdit } = props;

  let optionsArr = '';
  if (!isEmptyObject(options)) {
    optionsArr = options.map(item => (
      <Select.Option key={item.itemNo} value={item.itemNo}>
        {item.itemLabel}
      </Select.Option>
    ));
  }

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const value = fieldsValue;
      if (formData.sysMsgTemplateId >= 0) {
        value.sysMsgTemplateId = formData.sysMsgTemplateId;
        update(value);
      } else {
        add(value);
      }
      form.resetFields();
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
      <FormItem {...formItemLayout} label="消息模板id">
        {form.getFieldDecorator('sysMsgTemplateId', {
          initialValue: formData.sysMsgTemplateId,
          rules: [{ required: true, pattern: /^[1-9]\d*$/, message: '请输入大于0的正整数' }]
        })(<Input disabled={isEdit} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="消息类型">
        {form.getFieldDecorator('msgType', {
          initialValue: formData.msgType,
          rules: [{ required: true, message: '请选择消息类型' }]
        })(<Select style={{ width: '200px' }}>{optionsArr}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="模板内容">
        {form.getFieldDecorator('templateContent', {
          initialValue: formData.templateContent || '',
          rules: [
            {
              required: true,
              message: '请输入消息模板...',
            },
          ],
        })(<TextArea style={{height:300}} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="备注">
        {form.getFieldDecorator('remark', {
          initialValue: formData.remark || '',
        })(<TextArea style={{height:150}} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
