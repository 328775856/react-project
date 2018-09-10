import React from 'react';
import Moment from 'moment';
import moment from 'moment';
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
const CreateEditForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    add,
    update,
    closeModal,
    formData,
    title,
    isEmptyObject,
    options,
  } = props;
  let opt = [];
  if (!isEmptyObject(options)) {
    opt = options.map(item => <Option key={item.itemNo}>{item.itemLabel}</Option>);
  }
  let opt1 = [];
  opt1.push(<Option key="-1">请选择</Option>);
  opt1.push(opt);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.beginDate = fieldsValue.beginDate.format('YYYYMMDD');
      fieldsValue.endDate = fieldsValue.endDate.format('YYYYMMDD');
      if (formData.sysTerminalAccessId >= 0) {
        fieldsValue.sysTerminalAccessId = formData.sysTerminalAccessId;
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
      <FormItem {...formItemLayout} label="终端名称">
        {form.getFieldDecorator('terminalName', {
          initialValue: formData.terminalName || '',
          rules: [
            {
              required: true,
              message: '请输入终端名称...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端路径">
        {form.getFieldDecorator('terminalPath', {
          initialValue: formData.terminalPath || '',
          rules: [
            {
              required: true,
              message: '请输入终端路径...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端ID">
        {form.getFieldDecorator('terminalId', {
          initialValue: formData.terminalId || '',
          rules: [
            {
              required: true,
              message: '请输入终端ID...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="终端SECRET">
        {form.getFieldDecorator('terminalSecret', {
          initialValue: formData.terminalSecret || '',
          rules: [
            {
              required: true,
              message: '请输入终端SECRET...',
            },
          ],
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否检查">
        {form.getFieldDecorator('paramCheck', {
          initialValue: formData.paramCheck === undefined ? '1' : `${formData.paramCheck  }` || '',
          rules: [
            {
              required: true,
              message: '请选择是否检查...',
            },
          ],
        })(<Select style={{ width: '150px' }}>{opt1}</Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="有效开始日期">
        {form.getFieldDecorator('beginDate', {
          initialValue: formData.beginDate ? moment(formData.beginDate, 'YYYYMMDD') : '',
          rules: [
            {
              required: true,
              message: '请输入有效开始日期...',
            },
          ],
        })(<DatePicker format="YYYYMMDD" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="有效结束日期">
        {form.getFieldDecorator('endDate', {
          initialValue: formData.endDate ? moment(formData.endDate, 'YYYYMMDD') : '',
          rules: [
            {
              required: true,
              message: '请输入有效结束日期...',
            },
          ],
        })(<DatePicker format="YYYYMMDD" />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
