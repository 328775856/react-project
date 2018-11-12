import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectArticle from '../../Select/SelectArticle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    articleModalVisible: false
  };

  closeSelectArticleModal = () => {
    this.setState({
      articleModalVisible: false
    });
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      console.log(this.props);
      form.resetFields('mediaArticleId');
      form.resetFields('articleTitle');
      const myFormData = {
        mediaArticleId: record[0].mediaArticleId,
        articleTitle: record[0].articleTitle
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
      console.log('88', this.props);
    }
    this.closeSelectArticleModal();
  };

  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findNoticeId >= 0) {
          fieldsValue.findNoticeId = formData.findNoticeId;
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
    const parentMethodsForArticle = {
      callReturn: this.callSelectArticleReturn,
      closeModal: this.closeSelectArticleModal
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
        <FormItem {...formItemLayout} label="选择图文" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {
                initialValue: formData.mediaArticleId || '',
                rules: [{ required: true, message: '请选择图文!' }]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="图文标题">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('articleTitle', {
                initialValue: formData.articleTitle || '',
                rules: [{ required: true, message: '请选择图文!' }]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="标题">
          {form.getFieldDecorator('noticeTitle', {
            initialValue: formData.noticeTitle || '',
            rules: [
              {
                required: true,
                message: '请输入标题...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="顺序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [{ required: true, message: '请输入顺序...' }]
          })(<InputNumber min={1} placeholder="请输入" />)}
        </FormItem>
        <SelectArticle
          {...parentMethodsForArticle}
          mediaArticleId={formData.mediaArticleId}
          modalVisible={this.state.articleModalVisible}
        />
      </Modal>
    );
  }
}
