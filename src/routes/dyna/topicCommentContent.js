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

const ContentForm = Form.create()(props => {
  const { contentModalVisible, form, closeModal, formData, title } = props;
  const okHandle = () => {
    closeModal('contentModalVisible');
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
      visible={contentModalVisible}
      onOk={okHandle}
      onCancel={() => closeModal('contentModalVisible')}
    >
      <FormItem
        {...formItemLayout}
        label="评论内容"
      >
        {form.getFieldDecorator('commentContent', { initialValue: formData.commentContent || '' })(
          <Input
            type="textarea"
            autosize={{ minRows: 4 }}
            readOnly={contentModalVisible}
          />
        )}
      </FormItem>
    </Modal>
  );
});

export default ContentForm;
