import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import SelectImage from '../Select/SelectImage';
import SelectArticle from '../Select/SelectArticle';
import SelectUserInfo from '../Select/SelectUserInfo';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    articleModalVisible: false,
    userInfoModalVisible: false
  };

  closeSelectModal = () => {
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
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('mediaArticleId');
      form.resetFields('articleTitle');
      const myFormData = {
        mediaArticleId: record[0].mediaArticleId,
        articleTitle: record[0].articleTitle
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectArticleModal();
  };

  closeSelectUserInfoModal = () => {
    this.setState({
      userInfoModalVisible: false
    });
  };

  callSelectUserInfoReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('userId');
      form.resetFields('nickName');
      const myFormData = {
        userId: record[0].userId,
        nickName: record[0].nickname
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectUserInfoModal();
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

  selectUserInfo = () => {
    this.setState({
      userInfoModalVisible: true
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title, dispatch } = this.props;
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

    const cancelHandle = () => {
      form.resetFields();
      closeModal();
    };

    const parentMethods = {
      callReturn: this.callSelectReturn,
      closeModal: this.closeSelectModal
    };

    const parentMethodsForArticle = {
      callReturn: this.callSelectArticleReturn,
      closeModal: this.closeSelectArticleModal
    };

    const parentMethodsForUserInfo = {
      callReturn: this.callSelectUserInfoReturn,
      closeModal: this.closeSelectUserInfoModal
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
        <FormItem {...formItemLayout} label="用户ID" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('userId', {
                initialValue: formData.userId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入用户ID...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectUserInfo} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="用户">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('nickName', {
                initialValue: formData.nickName || '',
                rules: [
                  {
                    required: true,
                    message: '请选择用户...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col>
              <Button onClick={this.selectUserInfo} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="章节标题">
          {form.getFieldDecorator('chapterTitle', {
            initialValue: formData.chapterTitle || '',
            rules: [
              {
                required: true,
                message: '请输入章节标题...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="封面图" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('coverPath', {
                initialValue: formData.coverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程封面(素材图片)...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage1} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="封面图显示">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('wholeCoverPath', {
                initialValue: formData.wholeCoverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程封面(素材图片)...'
                  }
                ]
              })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholeCoverPath} />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="描述" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {
                initialValue: formData.mediaArticleId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入描述(素材图文)...'
                  }
                ]
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
                rules: [
                  {
                    required: true,
                    message: '请输入描述(素材图文)...'
                  }
                ]
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
        <SelectUserInfo
          {...parentMethodsForUserInfo}
          userId={formData.userId}
          modalVisible={this.state.userInfoModalVisible}
        />
      </Modal>
    );
  }
}
