import React from 'react';
import { Form, Input, Select, Modal } from 'antd';
import GbUpload from '../../components/Upload/upload';

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
    videoGroup,
    mul,
    div,
    isNew
  } = props;
  const handleUploadChange = fileList => {
    let filePath = '';
    if (fileList.length !== 0 && fileList[0].fileName) {
      filePath = fileList[0].fileName;
    }
    if (filePath.length === 0) {
      return;
    }
    const minute = div(fileList[0].millisecond, 60000, 0, 'floor');
    const second = div(fileList[0].millisecond - mul(minute, 60000), 1000, 0, 'round');
    formData.videoMinute = minute;
    const values = {
      videoPath: filePath,
      videoFormat: fileList[0].format ? 1 : 0,
      videoMinute: minute,
      videoSecond: second
    };
    form.setFieldsValue(values);
    formData.videoPath = fileList[0].fileName || formData.videoPath;
  };
  const uploadProps = {
    uid: `${formData.mediaVideoId}`,
    action:'/file/uploadVideo',
    length: 1,
    accept: 'video/*',
    maxFileSize: 50,
    onChange: handleUploadChange,
    fileList: [
      {
        fileName: formData.videoPath,
        name: `${formData.videoPath}`,
        format: `${formData.videoFormat}`,
        millisecond: `(${formData.videoMinute} && ${formData.videoSecond}) ? (${
          formData.videoMinute
        } * 60000 + ${formData.videoSecond} * 1000) : ''`,
        status: 'done',
        uid: `${formData.videoPath}`,
        url: `${formData.domain}/${formData.videoPath}`
      }
    ]
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (formData.mediaVideoId >= 0) {
        fieldsValue.mediaVideoId = formData.mediaVideoId;
        console.log(formData.filePath);
        console.log(fieldsValue);
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
        {form.getFieldDecorator('mediaVideoGroupId', {
          initialValue:
            formData.mediaVideoGroupId === undefined ? '' : `${formData.mediaVideoGroupId}`,
          rules: [
            {
              required: true,
              message: '请选择分组...'
            }
          ]
        })(
          <Select placeholder="" style={{ width: '150px' }}>
            {videoGroup || ''}
          </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="名称">
        {form.getFieldDecorator('videoName', {
          initialValue: formData.videoName || '',
          rules: [
            {
              required: true,
              message: '请输入名称...'
            }
          ]
        })(<Input />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="选择视频">
        {form.getFieldDecorator('fileUpload', {
          initialValue: formData.filePath || [{}],
          rules: [{ required: true, message: '请选择视频...' }]
        })(<GbUpload {...uploadProps} isNew={isNew} />)}
      </FormItem>
      <FormItem {...formItemLayout} label="视频路径">
        {form.getFieldDecorator('videoPath', {
          initialValue: formData.videoPath || '',
          rules: [
            {
              required: false,
              message: '请输入视频路径...'
            }
          ]
        })(<Input readOnly />)}
      </FormItem>
      <FormItem {...formItemLayout} label="视频格式(字典)">
        {form.getFieldDecorator('videoFormat', {
          initialValue: formData.videoFormat || '',
          rules: [
            {
              required: false,
              message: '请输入视频格式(字典)...'
            }
          ]
        })(<Input readOnly />)}
      </FormItem>
      {formData.videoMinute ? (
        <FormItem {...formItemLayout} label="时长-分钟">
          {form.getFieldDecorator('videoMinute', {
            initialValue: formData.videoMinute || '',
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
        {form.getFieldDecorator('videoSecond', {
          initialValue: formData.videoSecond || '',
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
