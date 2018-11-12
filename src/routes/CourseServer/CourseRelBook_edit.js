import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectBookShare from '../Select/SelectBookShare';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    bookModalVisible: false
  };

  closeSelectBookShareModal = () => {
    this.setState({
      bookModalVisible: false
    });
  };

  callSelectBookShareReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('bookUserId');
      form.resetFields('bookName');
      form.resetFields('coverPath');
      form.resetFields('wholeCoverPath');
      form.resetFields('bookAuthor');
      const myFormData = {
        bookUserId: record[0].bookUserId,
        bookName: record[0].bookName,
        coverPath: record[0].coverPath,
        wholeCoverPath: record[0].wholePhotoPath,
        bookAuthor: record[0].bookAuthor
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookShareModal();
  };

  selectBookModel = () => {
    this.setState({
      bookModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseRelBookId >= 0) {
          fieldsValue.courseRelBookId = formData.courseRelBookId;
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

    const parentMethodsForBook = {
      callReturn: this.callSelectBookShareReturn,
      closeModal: this.closeSelectBookShareModal
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
        <FormItem {...formItemLayout} label="图书id">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('bookUserId', {
                initialValue: formData.bookUserId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入图书id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectBookModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="书名">
          {form.getFieldDecorator('bookName', {
            initialValue: formData.bookName || '',
            rules: [
              {
                required: true,
                message: '请输入书名...'
              }
            ]
          })(<Input readOnly />)}
        </FormItem>

        <FormItem {...formItemLayout} label="作者">
          {form.getFieldDecorator('bookAuthor', {
            initialValue: formData.bookAuthor || '',
            rules: [
              {
                required: true,
                message: '请输入作者...'
              }
            ]
          })(<Input readOnly />)}
        </FormItem>

        <FormItem {...formItemLayout} label="封面" style={{ display: 'none' }}>
          {form.getFieldDecorator('coverPath', {
            initialValue: formData.coverPath || '',
            rules: [
              {
                required: false,
                message: '请输入封面...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="图片显示">
          {form.getFieldDecorator('wholeCoverPath', {
            initialValue: formData.wholeCoverPath || '',
            rules: [
              {
                required: false,
                message: '请输入图片...'
              }
            ]
          })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholeCoverPath} />)}
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
        <SelectBookShare {...parentMethodsForBook} modalVisible={this.state.bookModalVisible} />
      </Modal>
    );
  }
}
