import React, {PureComponent} from 'react';
import {Button, Col, Form, Input, Modal, Row,} from 'antd';
import SelectImage from '../Select/SelectImage';
import {Select} from "antd/lib/index";
import SelectArticle from '../Select/SelectArticle';


const FormItem = Form.Item;
const Option = Select.Option;
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
        type: 'tableData/select',
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
        type: 'tableData/select',
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
        if (formData.courseColumnId >= 0) {
          fieldsValue.courseColumnId = formData.courseColumnId;
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

    const isTrueSelect = (
      <Select placeholder="" style={{width: '150px'}}>
        <Option key={1}>是</Option>
        <Option key={0}>否</Option>
      </Select>
    );

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => closeModal()}
      >
        <FormItem {...formItemLayout} label="专栏名称">
          {form.getFieldDecorator('columnName', {
            initialValue: formData.columnName || '',
            rules: [
              {
                required: true,
                message: '请输入专栏名称...',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="专栏图片" style={{display:'none'}}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('coverPath', {
                initialValue: formData.coverPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入专栏图片...',
                  },
                ],
              })(<Input/>)}
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
                    message: '请输入专栏图片...',
                  },
                ],
              })(<Input/>)}
            </Col>
            <Col>
              <Button onClick={this.selectImage} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="专栏连接">
          {form.getFieldDecorator('columnLink', {
            initialValue: formData.columnLink || '',
            rules: [
              {
                required: true,
                message: '请输入专栏连接...',
              },
            ],
          })(<Input/>)}
        </FormItem>

        <FormItem {...formItemLayout} label="上架状态:">
          {form.getFieldDecorator('shelfStatus', {
            initialValue: formData.shelfStatus === undefined ? '' : formData.shelfStatus+'',
            rules: [
              {
                required: true,
                message: '请输入上架状态: 0未上架,1上架，2下架  默认未上架...',
              },
            ],
          })(<Select placeholder="" style={{width: '150px'}}>
            <Option key={0}>未上架</Option>
            <Option key={1}>上架</Option>
            <Option key={2}>下架</Option>
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否展示首页">
          {form.getFieldDecorator('isRecommend', {
            initialValue: formData.isRecommend === undefined ? '' : formData.isRecommend+'',
            rules: [
              {
                required: true,
                message: '请输入是否展示首页,0:不推荐,1:推荐...',
              },
            ],
          })(isTrueSelect)}
        </FormItem>
        <FormItem {...formItemLayout} label="排序">
          {form.getFieldDecorator('indexNo', {
            initialValue: formData.indexNo+'' || '',
            rules: [
              {
                required: true,
                message: '请输入排序...',
              },
            ],
          })(<Input/>)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否删除">
          {form.getFieldDecorator('isDel', {
            initialValue: formData.isDel === undefined ? '' : formData.isDel+'',
            rules: [
              {
                required: true,
                message: '请输入是否删除,0:未删除,1:已删除...',
              },
            ],
          })(isTrueSelect)}
        </FormItem>
        <FormItem {...formItemLayout} label="选择图文" style={{display:'none'}}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('mediaArticleId', {initialValue:formData.mediaArticleId === undefined ? '':formData.mediaArticleId,
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
        <FormItem {...formItemLayout} label="图文标题">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('articleTitle', {initialValue:formData.articleTitle === undefined ? '':formData.articleTitle,
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

        <SelectImage {...parentMethods} modalVisible={this.state.modalVisible} />
        <SelectArticle {...parentMethodsForArticle} modalVisible={this.state.articleModalVisible} />
      </Modal>
    );
  }

}
