import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectChapter from '../Select/SelectChapter';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    chapterModalVisible: false
  };

  closeSelectChapterModal = () => {
    this.setState({
      chapterModalVisible: false
    });
  };

  callSelectChapterReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('courseChapterId');
      form.resetFields('chapterTitle');
      form.resetFields('coverPath');
      const myFormData = {
        courseChapterId: record[0].courseChapterId,
        chapterTitle: record[0].chapterTitle,
        coverPath: record[0].wholeCoverPath
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectChapterModal();
  };

  selectChapterModel = () => {
    this.setState({
      chapterModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseRelChapterId >= 0) {
          fieldsValue.courseRelChapterId = formData.courseRelChapterId;
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

    const parentMethodsForChapter = {
      callReturn: this.callSelectChapterReturn,
      closeModal: this.closeSelectChapterModal
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
        <FormItem {...formItemLayout} label="章节id">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('courseChapterId', {
                initialValue: formData.courseChapterId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入章节id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectChapterModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="标题">
          {form.getFieldDecorator('chapterTitle', {
            initialValue: formData.chapterTitle || '',
            rules: [
              {
                required: true,
                message: '请输入标题...'
              }
            ]
          })(<Input readOnly />)}
        </FormItem>

        <FormItem {...formItemLayout} label="图片显示">
          {form.getFieldDecorator('coverPath', {
            initialValue: formData.coverPath || '',
            rules: [
              {
                required: true,
                message: '请输入标题...'
              }
            ]
          })(<img alt="" style={{ width: 100, height: 100 }} src={formData.coverPath} />)}
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
        <SelectChapter {...parentMethodsForChapter} modalVisible={this.state.chapterModalVisible} />
      </Modal>
    );
  }
}
