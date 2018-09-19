import React, { PureComponent } from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;
@Form.create()
export default class ChangeIndexNoForm extends PureComponent {
  render() {
    const { modalVisible, form, indexNoChange, closeModal, formData, title } = this.props;

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        formData.indexNo = fieldsValue.indexNo;
        indexNoChange(formData);
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
          label="排序"
        >
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo,
            rules: [{ required: true, message: '请输入序号...' }]
          })(<Input />)}
        </FormItem>
      </Modal>
    );
  }
}
