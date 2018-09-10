import React, {PureComponent} from 'react';
import {Button, Col, Form, Input, Modal, Row,} from 'antd';
import SelectImage from '../Select/SelectImage';
import SelectArticle from '../Select/SelectArticle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    articleModalVisible: false,
  };
  closeSelectModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  closeSelectArticleModal = () => {
    this.setState({
      articleModalVisible: false,
    });
  };
  callSelectReturn = record => {
    if (record != null) {
      const {dispatch} = this.props;
      let myFormData = {
        coverPath: record[0].imagePath,
        wholeCoverPath: record[0].domain,
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData,
      });
    }
    this.closeSelectModal();
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const {dispatch} = this.props;
      let myFormData = {
        mediaArticleId: record[0].mediaArticleId,
        articleTitle: record[0].articleTitle,
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData,
      });
    }
    this.closeSelectArticleModal();
  };

  selectImage = () => {
    this.setState({
      modalVisible: true,
    });
  };

  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true,
    });
  };

  render() {
    const {modalVisible, form, add, update, closeModal, formData, title, dispatch} = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.courseChapterId >= 0) {
          fieldsValue.courseChapterId = formData.courseChapterId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
    };
    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal,
    };

    const parentMethodsForArticle = {
      callReturn: this.callSelectArticleReturn,
      closeModal: this.closeSelectArticleModal,
    };

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 7},
        md: {span: 5},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 12},
        md: {span: 13},
      },
    };

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <FormItem {...formItemLayout} label="章节标题">
          {form.getFieldDecorator('chapterTitle', {
            initialValue: formData.chapterTitle || '',
            rules: [
              {
                required: true,
                message: '请输入章节标题...',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="图片路径">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('coverPath', {
                initialValue: formData.coverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入从素材(图片信息中)引入...',
                  },
                ],
              })(<Input/>)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search"/>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="图片显示">
          <img alt="" style={{width: 100, height: 100}} src={formData.wholeCoverPath}/>
        </FormItem>

        <FormItem {...formItemLayout} label="选择图文">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('articleTitle', {initialValue:formData.articleTitle ||'',
                rules: [{ required: true, message: '请选择图文!' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search"></Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="图文ID">
          <input value={formData.mediaArticleId}  />
        </FormItem>

        <SelectImage {...parentMethods} modalVisible={this.state.modalVisible} />
        <SelectArticle {...parentMethodsForArticle} modalVisible={this.state.articleModalVisible} />
      </Modal>
    );
  }
}