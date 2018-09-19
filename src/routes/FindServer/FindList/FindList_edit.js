import React, { PureComponent } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select } from 'antd';
import SelectArticle from '../../Select/SelectArticle';
import SelectImage from '../../Select/SelectImage';

const FormItem = Form.Item;
const { TextArea } = Input;
@Form.create()
export default class CreateEditForm extends PureComponent {
  state = {
    imageModalVisible: false,
    articleModalVisible: false,
  };

  closeSelectModal = () => {
    this.setState({
      imageModalVisible: false,
    });
  };

  closeSelectArticleModal = () => {
    this.setState({
      articleModalVisible: false,
    });
  };

  callSelectReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      let myFormData = {
        imagePath: record[0].imagePath,
        wholePhotoPath: record[0].domain,
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData,
      });
    }
    this.closeSelectModal();
  };

  callSelectArticleReturn = record => {
    if (record != null) {
      const { dispatch } = this.props;
      let myFormData = {
        mediaArticleId: record[0].mediaArticleId,
        articleTitle: record[0].articleTitle,
      };
      dispatch({
        type: 'tableData/select',
        payload: myFormData,
      });
    }
    this.closeSelectArticleModal();
  };

  selectImage = () => {
    this.setState({
      imageModalVisible: true,
    });
  };

  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true,
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
      dispatch,
      options,
    } = this.props;
    const opt = options.map(item => <Option key={item.findChannelId}>{item.channelName}</Option>);
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        if (formData.findListId >= 0) {
          fieldsValue.findListId = formData.findListId;
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
        xs: { span: 24 },
        sm: { span: 7 },
        md: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 13 },
      },
    };

    return (
      <Modal title={title} visible={modalVisible} onOk={okHandle} onCancel={() => closeModal()}>
        <FormItem {...formItemLayout} label="书单名称">
          {form.getFieldDecorator('listName', {
            initialValue: formData.listName || '',
            rules: [
              {
                required: true,
                message: '请输入用户ID...',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属栏目">
          {form.getFieldDecorator('findChannelId', {
            initialValue: formData.findChannelId === undefined ? '' : `${formData.findChannelId}`,
            rules: [
              {
                required: true,
                message: '请选择分组...',
              },
            ],
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              {opt || ''}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="图片路径" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('imagePath', {
                initialValue: formData.imagePath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入从素材(图片信息中)引入...',
                  },
                ],
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
              {form.getFieldDecorator('wholePhotoPath', {
                initialValue: formData.wholePhotoPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入从素材(图片信息中)引入...',
                  },
                ],
              })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholePhotoPath} />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="介绍">
          {form.getFieldDecorator('listIntro', {
            initialValue: formData.listIntro || '',
            rules: [
              {
                required: true,
                message: '请输入长度小于75个字符的介绍...',
                max: 75,
              },
            ],
          })(<TextArea autosize={{ minRows: 2, maxRows: 6 }} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否推荐">
          {form.getFieldDecorator('isRecc', {
            initialValue: formData.isRecc === undefined ? '1' : `${formData.isRecc}`,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="0">未推荐</Select.Option>
              <Select.Option value="1">已推荐</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="是否固定首页">
          {form.getFieldDecorator('isIndex', {
            initialValue: formData.isIndex === undefined ? '1' : `${formData.isIndex}`,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select style={{ width: '100%' }}>
              <Select.Option value="1">是</Select.Option>
              <Select.Option value="0">否</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="描述" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {
                initialValue: formData.mediaArticleId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入描述(素材图文)...',
                  },
                ],
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
                rules: [{ required: true, message: '请选择图文!' }],
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectArticleModel} icon="search" />
            </Col>
          </Row>
        </FormItem>
        <FormItem {...formItemLayout} label="显示书数量">
          {form.getFieldDecorator('numShow', {
            initialValue: formData.numShow || '',
            rules: [
              {
                required: true,
                message: '请输入界面排版显示书数量...',
              },
            ],
          })(<Input />)}
        </FormItem>
        <SelectImage {...parentMethods} modalVisible={this.state.imageModalVisible} />
        <SelectArticle {...parentMethodsForArticle} modalVisible={this.state.articleModalVisible} />
      </Modal>
    );
  }
}
