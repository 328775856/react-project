/* eslint-disable react/destructuring-assignment */

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Select, Button, Modal } from 'antd';
import SelectImage from '../../Select/SelectImage';

const FormItem = Form.Item;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    modalVisible: false,
    flag: 0
  };

  closeSelectModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      const { flag } = this.state;
      let myFormData = {};
      if (flag === 1) {
        form.resetFields('imagePath');
        form.resetFields('wholeCoverPath');
        myFormData = {
          imagePath: record[0].imagePath,
          wholeCoverPath: record[0].domain
        };
      }
      if (flag === 2) {
        form.resetFields('bgPath');
        form.resetFields('wholeBgPath');
        myFormData = {
          bgPath: record[0].imagePath,
          wholeBgPath: record[0].domain
        };
      }
      dispatch({
        type: 'tableData/select',
        payload: myFormData
      });
    }
    this.closeSelectModal();
  };

  selectImage = () => {
    this.setState({
      modalVisible: true,
      flag: 1
    });
  };

  render() {
    const { modalVisible, form, add, update, closeModal, formData, title } = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findTopId >= 0) {
          // eslint-disable-next-line no-param-reassign
          fieldsValue.findTopId = formData.findTopId;
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
        <FormItem {...formItemLayout} label="榜单名称">
          {form.getFieldDecorator('topName', {
            initialValue: formData.topName || '',
            rules: [
              {
                required: true,
                message: '请输入榜单名称...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="榜单图片" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('imagePath', {
                initialValue: formData.imagePath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程封面(素材图片)...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="封面图片显示">
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('wholeCoverPath', {
                initialValue: formData.wholeCoverPath,
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

        <FormItem {...formItemLayout} label="介绍">
          {form.getFieldDecorator('intro', {
            initialValue: formData.intro,
            rules: [
              {
                required: true,
                message: '请输入介绍...'
              }
            ]
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否推荐">
          {form.getFieldDecorator('isRecc', {
            initialValue: formData.isRecc === undefined ? '' : `${formData.isRecc}`,
            rules: [
              {
                required: true,
                message: '请输入是否首页推荐,0:未推荐,1:已推荐（默认为0）...'
              }
            ]
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              <Select.Option key={0}>未推荐</Select.Option>
              <Select.Option key={1}>已推荐</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否固定首页">
          {form.getFieldDecorator('isIndex', {
            // eslint-disable-next-line prefer-template
            initialValue: formData.isIndex === undefined ? '' : String(formData.isIndex),
            rules: [
              {
                required: true,
                message: '请输入是否首页推荐,0:否,1:是（默认为0）...'
              }
            ]
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              <Select.Option key={0}>否</Select.Option>
              <Select.Option key={1}>是</Select.Option>
            </Select>
          )}
        </FormItem>

        <SelectImage
          {...parentMethods}
          imagePath={formData.imagePath}
          modalVisible={this.state.modalVisible}
        />
      </Modal>
    );
  }
}
