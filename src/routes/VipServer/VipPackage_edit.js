import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider
} from 'antd';
import SelectImage from '../Select/SelectImage';
import SelectArticle from '../Select/SelectArticle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    articleModalVisible: false
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
      let myFormData = {};
      if (this.state.flag == 1) {
        form.resetFields('coverPath');
        form.resetFields('wholeCoverPath');
        myFormData = {
          coverPath: record[0].imagePath,
          wholeCoverPath: record[0].domain
        };
      }
      if (this.state.flag == 2) {
        form.resetFields('functionImg');
        form.resetFields('wholeFunctionImg');
        myFormData = {
          functionImg: record[0].imagePath,
          wholeFunctionImg: record[0].domain
        };
      }

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

  selectImage1 = () => {
    this.setState({
      modalVisible: true,
      flag: 1
    });
  };

  selectImage2 = () => {
    this.setState({
      modalVisible: true,
      flag: 2
    });
  };

  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true
    });
  };

  render() {
    const {
      modalVisible,
      form,
      add,
      update,
      closeModal,
      formData,
      title,
      isEmptyObject
    } = this.props;
    let optionsEle = '';
    if (!isEmptyObject(this.props.options)) {
      optionsEle = this.props.options.map(item => (
        <Option key={item.priPackageId}>{item.packageName}</Option>
      ));
    }

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.vipPackageId >= 0) {
          fieldsValue.vipPackageId = formData.vipPackageId;
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
        <FormItem {...formItemLayout} label="VIP包名">
          {form.getFieldDecorator('packageName', {
            initialValue: formData.packageName || '',
            rules: [
              {
                required: true,
                message: '请输入VIP包名...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="价格">
          {form.getFieldDecorator('upPackage', {
            initialValue: formData.upPackage || '',
            rules: [
              {
                required: true,
                message: '请输入价格...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="排序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo || '',
            rules: [
              {
                required: true,
                message: '请输入排序...'
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
              <Button onClick={this.selectImage1} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="权益包">
          {form.getFieldDecorator('priPackageId', {
            initialValue: formData.priPackageId == undefined ? '' : `${formData.priPackageId}`
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              {optionsEle}
            </Select>
          )}
        </FormItem>

        <FormItem {...formItemLayout} label="背景图" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('functionImg', {
                initialValue: formData.functionImg || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程背景图(素材图片)...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage2} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="背景图显示">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('wholeFunctionImg', {
                initialValue: formData.wholeFunctionImg || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程封面(素材图片)...'
                  }
                ]
              })(
                <img alt="" style={{ width: 100, height: 100 }} src={formData.wholeFunctionImg} />
              )}
            </Col>
            <Col>
              <Button onClick={this.selectImage2} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="权益描述">
          {form.getFieldDecorator('functionDesc', {
            initialValue: formData.functionDesc || '',
            rules: [
              {
                required: true,
                message: '请输入权益描述...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="素材图文" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {
                initialValue: formData.mediaArticleId || '',
                rules: [
                  {
                    required: true,
                    message: '素材图文...'
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
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="分享标题">
          {form.getFieldDecorator('shareTitle', {
            initialValue: formData.shareTitle || '',
            rules: [
              {
                required: true,
                message: '请输入分享标题...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="分享描述">
          {form.getFieldDecorator('shareDesc', {
            initialValue: formData.shareDesc || '',
            rules: [
              {
                required: true,
                message: '请输入分享描述...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <SelectImage
          {...parentMethods}
          imagePath={this.state.flag == 1 ? formData.coverPath : formData.functionImg}
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
