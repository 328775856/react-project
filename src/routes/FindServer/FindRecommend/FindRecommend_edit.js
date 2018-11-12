import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row } from 'antd';
import SelectImage from '../../Select/SelectImage';
import SelectArticle from '../../Select/SelectArticle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    articleModalVisible: false
  };

  closeSelectModal = () => {
    debugger;
    this.setState({
      modalVisible: false
    });
  };

  closeSelectArticleModal = () => {
    this.setState({
      articleModalVisible: false
    });
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('coverPath');
      form.resetFields('wholeCoverPath');
      const myFormData = {
        coverPath: record[0].imagePath,
        wholeCoverPath: record[0].domain
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('mediaArticleId');
      form.resetFields('mediaArticleTitle');
      const myFormData = {
        mediaArticleId: record[0].mediaArticleId,
        mediaArticleTitle: record[0].articleTitle
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectArticleModal();
  };

  selectImage = () => {
    this.setState({
      modalVisible: true
    });
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
        if (formData.findRecommendId >= 0) {
          fieldsValue.findRecommendId = formData.findRecommendId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };
    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal
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
      <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={() => closeModal()}>
        <FormItem {...formItemLayout} label="标题">
          {form.getFieldDecorator('recommendTitle', {
            initialValue: formData.recommendTitle || '',
            rules: [
              {
                required: true,
                message: '请输入标题...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="简介">
          {form.getFieldDecorator('recommendIntro', {
            initialValue: formData.recommendIntro || '',
            rules: [
              {
                required: true,
                message: '请输入简介...'
              }
            ]
          })(<Input.TextArea />)}
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
        <FormItem {...formItemLayout} label="图片路径" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('coverPath', {
                initialValue: formData.coverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入从素材(图片信息中)引入...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="图片显示">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('wholeCoverPath', {
                initialValue: formData.wholeCoverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入从素材(图片信息中)引入...'
                  }
                ]
              })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholeCoverPath} />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>

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
              {form.getFieldDecorator('mediaArticleTitle', {
                initialValue: formData.mediaArticleTitle || '',
                rules: [{ required: true, message: '请选择图文!' }]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <SelectImage
          {...parentMethods}
          imagePath={formData.coverPath}
          modalVisible={this.state.modalVisible}
        />
        <SelectArticle
          {...parentMethodsForArticle}
          mediaArticleId={formData.mediaArticleId}
          modalVisible={this.state.articleModalVisible}
        />
      </Modal>
    );
  }
}
