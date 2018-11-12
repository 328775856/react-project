import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectVideo from '../Select/SelectVideo';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    videoModalVisible: false
  };

  closeSelectVideoModal = () => {
    this.setState({
      videoModalVisible: false
    });
  };

  callSelectVideoReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('mediaVideoId');
      form.resetFields('videoName');
      const myFormData = {
        mediaVideoId: record[0].mediaVideoId,
        videoName: record[0].videoName
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectVideoModal();
  };

  selectVideoModel = () => {
    this.setState({
      videoModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseChapterVideoId >= 0) {
          fieldsValue.courseChapterVideoId = formData.courseChapterVideoId;
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

    const parentMethodsForVideo = {
      callReturn: this.callSelectVideoReturn,
      closeModal: this.closeSelectVideoModal
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
        <FormItem {...formItemLayout} label="素材视频id">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('mediaVideoId', {
                initialValue: formData.mediaVideoId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入素材视频id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectVideoModel} icon="search" />
            </Col>
          </Row>
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
          })(<Input readOnly />)}
        </FormItem>

        <FormItem {...formItemLayout} label="顺序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入顺序...'
              }
            ]
          })(<InputNumber min={0} max={255} />)}
        </FormItem>
        <SelectVideo {...parentMethodsForVideo} modalVisible={this.state.videoModalVisible} />
      </Modal>
    );
  }
}
