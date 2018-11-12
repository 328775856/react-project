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
const Option = Select.Option;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title, isEmptyObject } = props;
  let options = '';
  if (!isEmptyObject(props.state.options)) {
    options = props.state.options.map(item => (
      <Option key={item.sensitiveTypeId}>{item.typeName}</Option>
    ));
  }
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.sysSensitiveId >= 0) {
        fieldsValue.sysSensitiveId = formData.sysSensitiveId;
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
      md: { span: 7 }
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
      <FormItem {...formItemLayout} label="敏感词分类">
        {form.getFieldDecorator('sysSensitiveTypeId', {
          initialValue:
            formData.sysSensitiveTypeId === undefined ? '' : `${formData.sysSensitiveTypeId}`
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            {options}
          </Select>
        )}
      </FormItem>

      <FormItem {...formItemLayout} label="敏感词">
        {form.getFieldDecorator('sensitiveName', {
          initialValue: formData.sensitiveName || '',
          rules: [
            {
              required: true,
              message: '请输入敏感词...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理方式">
        {form.getFieldDecorator('dealWay', {
          initialValue: formData.dealWay === undefined ? '' : `${formData.dealWay}`,
          rules: [
            {
              required: true,
              message: '请输入处理方式'
            }
          ]
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            <Option key={1}>替换处理</Option>
            <Option key={2}>禁止传播</Option>
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="是否停用">
        {form.getFieldDecorator('isStop', {
          initialValue: formData.isStop === undefined ? '' : `${formData.isStop}`,
          rules: [
            {
              required: true,
              message: '请输入是否停用'
            }
          ]
        })(isTrueSelect)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否在书名中使用">
        {form.getFieldDecorator('isBookScope', {
          initialValue: formData.isBookScope === undefined ? '' : `${formData.isBookScope}`,
          rules: [
            {
              required: true,
              message: '请输入是否在书名中使用(1是,0否,默认为0)...'
            }
          ]
        })(isTrueSelect)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否在话题中使用">
        {form.getFieldDecorator('isTopicScope', {
          initialValue: formData.isTopicScope === undefined ? '' : `${formData.isTopicScope}`,
          rules: [
            {
              required: true,
              message: '请输入是否在话题中使用(1是,0否,默认为0)...'
            }
          ]
        })(isTrueSelect)}
      </FormItem>
      <FormItem {...formItemLayout} label="是否在呢称中使用">
        {form.getFieldDecorator('isNicknameScope', {
          initialValue: formData.isNicknameScope === undefined ? '' : `${formData.isNicknameScope}`,
          rules: [
            {
              required: true,
              message: '请输入是否在呢称中使用(1是,0否,默认为0)...'
            }
          ]
        })(isTrueSelect)}
      </FormItem>
      <FormItem {...formItemLayout} label="替换值">
        {form.getFieldDecorator('replaceValue', {
          initialValue: formData.replaceValue || '',
          rules: [
            {
              required: true,
              message: '请输入替换值...'
            }
          ]
        })(<Input />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
