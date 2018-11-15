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
import GbUpload from '../../components/Upload/upload';

const FormItem = Form.Item;
const CreateEditForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    add,
    update,
    closeModal,
    options,
    formData,
    title,
    audioGroup,
    mul,
    div,
    isNew
  } = props;
  const formatList = ['mp3', 'aac'];
  const handleUploadChange = fileList => {
    let filePath = '';
    if (fileList.length != 0 && fileList[0].fileName) {
      filePath = fileList[0].fileName;
    }
    if (filePath.length === 0) {
      return;
    }
    const minute = div(fileList[0].millisecond, 60000, 0, 'floor');
    formData.minute = minute;
    const second = 3;
    const values = {
      audioPath: filePath,
      audioFormat: fileList[0].format,
      minute,
      second
    };
    // debugger
    form.setFieldsValue(values);
    formData.audioPath = fileList[0].fileName || formData.audioPath;
  };
  let uploadProps = {
    uid: formData.mediaAudioId,
    action: '/file/uploadAudio',
    length: 1,
    accept: 'audio/*',
    maxFileSize: 50,
    onChange: handleUploadChange,
    fileList: formData.audioPath ?
      [
        {
          fileName: `${formData.audioPath}`,
          name: `${formData.audioPath}`,
          status: 'done',
          uid: `${formData.audioPath}`,
          url: `${formData.domain}/${formData.audioPath}`
        }
      ] :
      []
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (isNew) {
        fieldsValue.audioFormat = formatList.indexOf(fieldsValue.audioFormat) + 1;
      } else {
        fieldsValue.audioFormat = formData.audioFormat;
      }
      if (err) return;
      form.resetFields();
      if (formData.mediaAudioId >= 0) {
        fieldsValue.mediaAudioId = formData.mediaAudioId;
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
    <Modal
      destroyOnClose
      title={title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={cancelHandle}
    >
      <FormItem {...formItemLayout} label="分组">
        {form.getFieldDecorator('mediaAudioGroupId', {
          initialValue:
            formData.mediaAudioGroupId === undefined ? '' : `${formData.mediaAudioGroupId}`,
          rules: [
            {
              required: true,
              message: '请选择分组...'
            }
          ]
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            {audioGroup || ''}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('audioName', {
          initialValue: formData.audioName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择音频">
        {form.getFieldDecorator('fileUpload', {
          initialValue: formData.filePath || [{}],
          rules: [{ required: true, message: '请选择音频...' }]
        })(<GbUpload {...uploadProps} isNew={isNew} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述">
        {form.getFieldDecorator('audioDesc', {
          initialValue: formData.audioDesc || '',
          rules: [
            {
              required: true,
              message: '请输入描述...'
            }
          ]
        })(<Input.TextArea />)}
      </FormItem>
      <FormItem {...formItemLayout} label="音频路径">
        {form.getFieldDecorator('audioPath', {
          initialValue: formData.audioPath || '',
          rules: [
            {
              required: false,
              message: '请输入音频路径...'
            }
          ]
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="音频格式">
        {form.getFieldDecorator('audioFormat', {
          initialValue: formatList[formData.audioFormat] || '',
          rules: [
            {
              required: false,
              message: '请输入音频格式...'
            }
          ]
        })(<Input readOnly />)}
      </FormItem>
      {formData.minute ? (
        <FormItem {...formItemLayout} label="时长-分钟">
          {form.getFieldDecorator('minute', {
            initialValue: formData.minute || '',
            rules: [
              {
                required: false,
                message: '请输入时长-分钟...'
              }
            ]
          })(<Input readOnly />)}
        </FormItem>
      ) :
        ''
      }
      <FormItem {...formItemLayout} label="时长-秒">
        {form.getFieldDecorator('second', {
          initialValue: formData.second || '',
          rules: [
            {
              required: false,
              message: '请输入时长-秒...'
            }
          ]
        })(<Input readOnly />)}
      </FormItem>
    </Modal>
  );
});
export default CreateEditForm;
