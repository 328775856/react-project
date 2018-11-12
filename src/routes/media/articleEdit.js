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
  const {
    modalVisible,
    form,
    add,
    update,
    closeModal,
    formData,
    title,
    Ueditor,
    articleGroup
  } = props;
  // console.log(`formData.content=${formData.content?formData.content:''}`);
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      const content = UE.getEditor('content').getContent();
      console.log(UE.getEditor('content').getContent(), 'sdf');
      // console.log(content)
      fieldsValue.content = content;
      if (formData.mediaArticleId >= 0) {
        fieldsValue.mediaArticleId = formData.mediaArticleId;
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
      xs: { span: 12 },
      sm: { span: 4 },
      md: { span: 3 }
    },
    wrapperCol: {
      xs: { span: 36 },
      sm: { span: 18 },
      md: { span: 20 }
    }
  };

  const config = {
    initialFrameHeight: 700
  };

  return (
    <Modal destroyOnClose title={title} visible={modalVisible} width="80%" onOk={okHandle} onCancel={cancelHandle}>
      <FormItem {...formItemLayout} label="分组">
        {form.getFieldDecorator('mediaArticleGroupId', {
          initialValue:
            formData.mediaArticleGroupId === undefined ? '' : `${formData.mediaArticleGroupId}`,
          rules: [
            {
              required: true,
              message: '请选择分组...'
            }
          ]
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            {articleGroup || ''}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="标题">
        {form.getFieldDecorator('articleTitle', {
          initialValue: formData.articleTitle || '',
          rules: [
            {
              required: true,
              message: '请输入标题...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="作者">
        {form.getFieldDecorator('articleAuthor', {
          initialValue: formData.articleAuthor || '',
          rules: [
            {
              required: false,
              message: '请输入作者...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('articleDesc', {
          initialValue: formData.articleDesc || '',
          rules: [
            {
              required: false,
              message: '请输入描述...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem {...formItemLayout} label="内容">
        {form.getFieldDecorator('content', {
          rules: [
            {
              required: false,
              message: '请输入内容...'
            }
          ]
        })(<Ueditor id="content" config={config} content={formData.content} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
