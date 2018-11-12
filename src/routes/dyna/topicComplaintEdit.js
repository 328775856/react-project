import React from 'react';
import { Form, Input, Radio, Modal } from 'antd';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, add, update, closeModal, formData, title } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.dynaTopicComplaintId >= 0) {
        fieldsValue.dynaTopicComplaintId = formData.dynaTopicComplaintId;
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
      <FormItem {...formItemLayout} label="举报内容">
        {form.getFieldDecorator('complaintContent', {
          initialValue: formData.complaintContent || '',
          rules: [
            {
              required: true,
              message: '请输入举报内容...'
            }
          ]
        })(<Input.TextArea readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="处理">
        {form.getFieldDecorator('complaintStatus', {
          initialValue: formData.complaintStatus || ''
        })(
          <Radio.Group onChange={this.onChange}>
            <Radio value={1}>驳回</Radio>
            <Radio value={2}>屏蔽</Radio>
          </Radio.Group>
        )}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
