import React, { PureComponent } from 'react';
import { connect } from 'dva';
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
  Divider,
  Table
} from 'antd';
import SelectImage from '../../Select/SelectImage';
import SelectArticle from '../../Select/SelectArticle';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    imgModalVisible: false,
    articleModalVisible: false
  };

  selectImage = () => {
    this.setState({
      imgModalVisible: true
    });
  };

  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true
    });
  };

  callSelectImageReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      dispatch({
        type: 'commonTableData/select',
        payload: {
          imagePath: record[0].imagePath,
          wholeCoverPath: record[0].domain
        }
      });
    }
    this.closeSelectImageModal();
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
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

  closeSelectImageModal = () => {
    this.setState({
      imgModalVisible: false
    });
  };

  closeSelectArticleModal = () => {
    this.setState({
      articleModalVisible: false
    });
  };

  render() {
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findSpecId >= 0) {
          // eslint-disable-next-line no-param-reassign
          fieldsValue.findSpecId = formData.findSpecId;
          update(fieldsValue);
        } else {
          add(fieldsValue);
        }
      });
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

    const { imgModalVisible, articleModalVisible } = this.state;
    const { selectImage } = this;
    const { modalVisible, form, add, update, closeModal, formData, title, options } = this.props;

    const parentSelectImageMethods = {
      callReturn: this.callSelectImageReturn,
      closeModal: this.closeSelectImageModal
    };
    const parentSelectArticleMethods = {
      callReturn: this.callSelectArticleReturn,
      closeModal: this.closeSelectArticleModal
    };

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <FormItem
          {...formItemLayout}
          label="所属栏目"
        >
          {form.getFieldDecorator('findChannelId', {
            initialValue: formData.findChannelId,
            rules: [{ required: true, message: '请选择所属栏目...' }]
          })(
            <Select
              placeholder="----------请选择所属栏目----------"
              style={{ width: '100%' }}
            >
              {options}
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="专题名称"
        >
          {form.getFieldDecorator('specName', {
            initialValue: formData.specName,
            rules: [{ required: true, message: '请输入专题名称...' }]
          })(<Input placeholder="请输入专题名称" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="封面图"
          style={{ display: 'none' }}
        >
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('imagePath', {
                initialValue: formData.imagePath,
                rules: [{ required: true, message: '请输入专题封面(素材图片)...' }]
              })(<Input />)}
            </Col>
            <Col>
              <Button
                onClick={selectImage}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="封面图"
        >
          <Row gutter={0}>
            <Col span={21}>
              {form.getFieldDecorator('wholeCoverPath', {
                initialValue: formData.wholeCoverPath,
                rules: [{ required: true, message: '请选择专题封面(素材图片)...' }]
              })(<img
                alt=""
                style={{ width: 100, height: 100 }}
                src={formData.wholeCoverPath}
              />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={selectImage}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="专题描述"
        >
          {form.getFieldDecorator('specIntro', {
            initialValue: formData.specIntro,
            rules: [{ required: true, message: '请输入专题描述...' }]
          })(<Input.TextArea placeholder="请输入专题描述" />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择图文ID"
        >
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {
                initialValue: formData.mediaArticleId,
                rules: [{ required: true, message: '请选择图文!' }]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button
                onClick={this.selectArticleModel}
                icon="search"
              />
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="推荐:"
        >
          {form.getFieldDecorator('isRecc', {
            initialValue: formData.isRecc,
            rules: [{ required: true, message: '请选择是否推荐...' }]
          })(
            <Select
              placeholder="----------请选择是否推荐----------"
              style={{ width: '100%' }}
            >
              <Select.Option
                key={0}
                value={0}
              >
                未推荐
              </Select.Option>
              <Select.Option
                key={1}
                value={1}
              >
                已推荐
              </Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="固定首页:"
        >
          {form.getFieldDecorator('isIndex', {
            initialValue: formData.isIndex,
            rules: [{ required: true, message: '请选择是否固定在首页...' }]
          })(
            <Select
              placeholder="------请选择是否固定在首页------"
              style={{ width: '100%' }}
            >
              <Select.Option
                key={0}
                value={0}
              >
                未推荐
              </Select.Option>
              <Select.Option
                key={1}
                value={1}
              >
                已推荐
              </Select.Option>
            </Select>
          )}
        </FormItem>
        <SelectImage
          {...parentSelectImageMethods}
          modalVisible={imgModalVisible}
        />
        <SelectArticle
          {...parentSelectArticleMethods}
          modalVisible={articleModalVisible}
        />
      </Modal>
    );
  }
}
