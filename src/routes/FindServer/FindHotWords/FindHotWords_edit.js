import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, Select, InputNumber, Modal, Row } from 'antd';
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
      form.resetFields('findHotWordsId');
      form.resetFields('hotWords');
      const myFormData = {
        findHotWordsId: record[0].findHotWordsId,
        hotWords: record[0].hotWords
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
        if (formData.findHotWordsId >= 0) {
          fieldsValue.findHotWordsId = formData.findHotWordsId;
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
        <FormItem {...formItemLayout} label="热门搜索词">
          {form.getFieldDecorator('hotWords', {
            initialValue: formData.hotWords || '',
            rules: [
              {
                required: true,
                message: '请输入标题...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="标红:">
          {form.getFieldDecorator('isRed', {
            initialValue: formData.isRed,
            rules: [{ required: true, message: '请选择是否标红...' }]
          })(
            <Select placeholder="----请选择是否标红----" style={{ width: '100%' }}>
              <Select.Option key={0} value={0}>
                未标红
              </Select.Option>
              <Select.Option key={1} value={1}>
                已标红
              </Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="顺序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [{ required: true, message: '请输入顺序...' }]
          })(<InputNumber min={1} placeholder="请输入" />)}
        </FormItem>
        <SelectArticle
          {...parentMethodsForArticle}
          findHotWordsId={formData.findHotWordsId}
          modalVisible={this.state.articleModalVisible}
        />
      </Modal>
    );
  }
}
