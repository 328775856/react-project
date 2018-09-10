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
  Upload,
} from 'antd';
import GbUpload from '../../components/Upload/upload';
const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const { modalVisible, form, addSave, updateSave, closeModal, formData, title } = props;
  const handleUploadChange = fileList => {
    let imagePath = '';
    if (fileList.length != 0 && fileList[0].fileName) {
      imagePath = fileList[0].fileName;
    }
    form.setFieldsValue({ imagePath: imagePath });
  };
  let uploadProps = {
    uid: `${formData.mediaImageId}`,
    action: '/file/uploadImage',
    length: 1,
    accept: 'image/*',
    onChange: handleUploadChange,
    fileList: [
      {
        fileName: `${formData.imagePath}`,
        name: `${formData.imagePath}`,
        status: 'done',
        uid: `${formData.imagePath}`,
        url: `${formData.domain}/${formData.imagePath}`,
      },
    ],
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.mediaImageId >= 0) {
        fieldsValue.mediaImageId = formData.mediaImageId;
        updateSave(fieldsValue);
      } else {
        addSave(fieldsValue);
      }
    });
  };
  return (
    <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={() => closeModal()}>
      <FormItem
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 15 }}
        label="ID"
        style={{ display: 'none' }}
      >
        {form.getFieldDecorator('mediaImageId', { initialValue: formData.mediaImageId || '' })(
          <Input />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片分组">
        {form.getFieldDecorator('mediaImageGroupId', {
          initialValue: formData.mediaImageGroupId || '',
          rules: [{ required: true, message: '请输入图片分组...' }],
        })(
          <Select value={formData.mediaImageGroupId} style={{ width: '100%' }}>
            <Select.Option value="1">默认分组</Select.Option>
            <Select.Option value="2">分组1</Select.Option>
          </Select>
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="图片名称">
        {form.getFieldDecorator('imageName', {
          initialValue: formData.imageName || '',
          rules: [{ required: true, message: '请输入图片名称...' }],
        })(<Input placeholder="请输入" value={formData.imageName} />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="路径" style={{}}>
        {form.getFieldDecorator('imagePath', { initialValue: formData.imagePath || '' })(
          <Input readOnly value={formData.imagePath} />
        )}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择图片">
        {form.getFieldDecorator('imageUpload', {
          initialValue: formData.imageUpload || '',
          rules: [{ required: true, message: '请选择图片...' }],
        })(<GbUpload {...uploadProps} />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
