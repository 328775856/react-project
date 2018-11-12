import React, { PureComponent } from 'react';
import { Button, Col, Form, Select, Input, InputNumber, Modal, Row } from 'antd';
import SelectAudio from '../Select/SelectAudio';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    audioModalVisible: false
  };

  closeSelectAudioModal = () => {
    this.setState({
      audioModalVisible: false
    });
  };

  callSelectAudioReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('mediaAudioId');
      form.resetFields('audioName');
      const myFormData = {
        mediaAudioId: record[0].mediaAudioId,
        audioName: record[0].audioName
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectAudioModal();
  };

  selectAudioModel = () => {
    this.setState({
      audioModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseChapterAudioId >= 0) {
          fieldsValue.courseChapterAudioId = formData.courseChapterAudioId;
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

    const parentMethodsForAudio = {
      callReturn: this.callSelectAudioReturn,
      closeModal: this.closeSelectAudioModal
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
        <FormItem {...formItemLayout} label="素材音频id">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('mediaAudioId', {
                initialValue: formData.mediaAudioId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入素材音频id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectAudioModel} icon="search" />
            </Col>
          </Row>
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
        <FormItem {...formItemLayout} label="是否试听">
          {form.getFieldDecorator('isAudition', {
            initialValue: formData.isAudition === undefined ? '' : `${formData.isAudition}`,
            rules: [
              {
                required: true,
                message: '请选择是否试听课程...'
              }
            ]
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              <Select.Option key={0}>否</Select.Option>
              <Select.Option key={1}>是</Select.Option>
            </Select>
          )}
        </FormItem>
        <SelectAudio
          {...parentMethodsForAudio}
          mediaAudioId={formData.mediaAudioId}
          modalVisible={this.state.audioModalVisible}
        />
      </Modal>
    );
  }
}
