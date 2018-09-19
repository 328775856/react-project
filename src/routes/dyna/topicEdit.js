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
import TextArea from 'antd/lib/input/TextArea';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.publishTime = fieldsValue.publishTime ?
        fieldsValue.publishTime.format('YYYYMMDDHHmmss') :
        '';
      if (formData.dynaTopicId >= 0) {
        fieldsValue.dynaTopicId = formData.dynaTopicId;
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
        label="话题标题"
      >
        {form.getFieldDecorator('topicTitle', {
          initialValue: formData.topicTitle || '',
          rules: [
            {
              required: true,
              message: '请输入话题标题...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="话题类型"
      >
        {form.getFieldDecorator('topicType', {
          initialValue: formData.topicType || '',
          rules: [
            {
              required: true,
              message: '请选择话题类型...'
            }
          ]
        })(
          <Select
            value={formData.topicType}
            style={{ width: '100%' }}
          >
            <Select.Option value="1">话题</Select.Option>
            <Select.Option value="2">活动</Select.Option>
            <Select.Option value="3">投票</Select.Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="排序(0为不启用推荐)"
      >
        {form.getFieldDecorator('indexNo', {
          initialValue: formData.indexNo || '',
          rules: [
            {
              required: false,
              message: '请输入排序...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="话题内容"
      >
        {form.getFieldDecorator('dynaTopicContent', {
          initialValue: formData.dynaTopicContent || '',
          rules: [
            {
              required: true,
              message: '请输入话题内容...'
            }
          ]
        })(<Input
          type="textarea"
          autosize={{ minRows: 4 }}
        />)}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="定时发布"
      >
        {form.getFieldDecorator('publishTime', {
          initialValue: formData.publishTime || '',
          rules: [
            {
              required: false,
              message: '请输入定时发布...'
            }
          ]
        })(<DatePicker
          format="YYYY-MM-DD HH:mm:ss"
          showTime={{}}
        />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
