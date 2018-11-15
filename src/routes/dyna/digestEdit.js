import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectImage from '../Select/SelectImage';
import SelectBookShare from '../Select/SelectBookShare';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    bookModalVisible: false
  };

  closeSelectBookShareModal = () => {
    this.setState({
      bookModalVisible: false
    });
  };

  closeSelectModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectBookShareReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('bookUserId');
      form.resetFields('bookName');
      form.resetFields('bookPropId');
      const myFormData = {
        bookUserId: record[0].bookUserId,
        bookName: record[0].bookName,
        bookPropId: record[0].bookPropId
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectBookShareModal();
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('imagePath');
      form.resetFields('wholeImagePath');
      const myFormData = {
        imagePath: record[0].imagePath,
        wholeImagePath: record[0].domain
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  selectBookModel = () => {
    this.setState({
      bookModalVisible: true
    });
  };

  selectImage = () => {
    this.setState({
      modalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.dynaDigestId >= 0) {
          fieldsValue.dynaDigestId = formData.dynaDigestId;
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

    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal
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

        <FormItem {...formItemLayout} label="图书属性" style={{ display: 'none' }}>
          {form.getFieldDecorator('bookPropId', {
            initialValue: formData.bookPropId || '',
            rules: [
              {
                required: true,
                message: '请输入图书属性...'
              }
            ]
          })(<Input />)}
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

        <FormItem {...formItemLayout} label="封面" style={{ display: 'none' }}>
          {form.getFieldDecorator('imagePath', {
            initialValue: formData.imagePath || '',
            rules: [
              {
                required: true,
                message: '请输入封面...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="图片显示">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('wholeImagePath', {
                initialValue: formData.wholeImagePath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入图片...'
                  }
                ]
              })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholeImagePath} />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="书摘内容">
          {form.getFieldDecorator('digestContent', {
            initialValue: formData.digestContent || '',
            rules: [
              {
                required: true,
                message: '请输入书名...'
              }
            ]
          })(<Input.TextArea />)}
        </FormItem>

        <SelectImage
          {...parentMethods}
          imagePath={formData.imagePath}
          modalVisible={this.state.modalVisible}
        />
        <SelectBookShare
          {...parentMethodsForBook}
          bookUserId={formData.bookUserId}
          modalVisible={this.state.bookModalVisible}
        />
      </Modal>
    );
  }
}
