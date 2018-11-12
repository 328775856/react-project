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
import SelectAuthor from '../Select/SelectAuthor';
import SelectTag from '../Select/SelectTag';
import SelectColumn from '../Select/SelectColumn';

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

  closeSelectAuthorModal = () => {
    this.setState({
      authorModalVisible: false
    });
  };

  closeSelectTagModal = () => {
    this.setState({
      tagModalVisible: false
    });
  };

  closeSelectColumnModal = () => {
    this.setState({
      columnModalVisible: false
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
        form.resetFields('bgPath');
        form.resetFields('wholeBgPath');
        myFormData = {
          bgPath: record[0].imagePath,
          wholeBgPath: record[0].domain
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

  callSelectAuthorReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('cousrseAuthorId');
      form.resetFields('authorName');
      const myFormData = {
        cousrseAuthorId: record[0].courseAuthorId,
        authorName: record[0].authorName
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectAuthorModal();
  };

  callSelectTagReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('courseTagId');
      form.resetFields('tagName');
      const myFormData = {
        courseTagId: record[0].courseTagId,
        tagName: record[0].tagName
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectTagModal();
  };

  callSelectColumnReturn = record => {
    if (record != null) {
      const { dispatch, form } = this.props;
      form.resetFields('courseColumnId');
      form.resetFields('columnName');
      const myFormData = {
        courseColumnId: record[0].courseColumnId,
        columnName: record[0].columnName
      };
      dispatch({
        type: 'commonTableData/select',
        payload: myFormData
      });
    }
    this.closeSelectColumnModal();
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

  selectAuthorModel = () => {
    this.setState({
      authorModalVisible: true
    });
  };

  selectTagModel = () => {
    this.setState({
      tagModalVisible: true
    });
  };

  selectColumnModel = () => {
    this.setState({
      columnModalVisible: true
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
    let options = '';
    if (!isEmptyObject(this.props.state.options)) {
      options = this.props.state.options[31].map(item => (
        <Select.Option key={item.itemNo}>{item.itemLabel}</Select.Option>
      ));
    }
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        console.log('fieldsValue', fieldsValue);
        if (formData.courseId >= 0) {
          fieldsValue.courseId = formData.courseId;
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

    const parentMethodsForAuthor = {
      callReturn: this.callSelectAuthorReturn,
      closeModal: this.closeSelectAuthorModal
    };
    const parentMethodsForTag = {
      callReturn: this.callSelectTagReturn,
      closeModal: this.closeSelectTagModal
    };

    const parentMethodsForColumn = {
      callReturn: this.callSelectColumnReturn,
      closeModal: this.closeSelectColumnModal
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

    const isTrueSelect = (
      <Select placeholder="" style={{ width: '150px' }}>
        <Select.Option key={0}>否</Select.Option>
        <Select.Option key={1}>是</Select.Option>
      </Select>
    );

    return (
      <Modal
        title={title}
        visible={modalVisible}
        onOk={okHandle}
        width="30%"
        onCancel={cancelHandle}
      >
        <FormItem {...formItemLayout} label="课程类型">
          {form.getFieldDecorator('courseType', {
            initialValue: formData.courseType == undefined ? '' : `${formData.courseType}`
          })(
            <Select placeholder="" style={{ width: '150px' }}>
              {options}
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="标签id" style={{ display: 'none' }}>
          {form.getFieldDecorator('courseTagId', {
            initialValue: formData.courseTagId || '',
            rules: [
              {
                required: true,
                message: '请输入课程标签...'
              }
            ]
          })(<Input />)}
        </FormItem>

        <FormItem {...formItemLayout} label="标签名称">
          <Row>
            <Col span={22}>
              {form.getFieldDecorator('tagName', {
                initialValue: formData.tagName || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程标签...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectTagModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="专栏id" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('courseColumnId', {
                initialValue: formData.courseColumnId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入专栏id...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectColumnModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="专栏名称">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('columnName', {
                initialValue: formData.columnName || '',
                rules: [
                  {
                    required: true,
                    message: '请输入专栏id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectColumnModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="课程名称">
          {form.getFieldDecorator('courseName', {
            initialValue: formData.courseName || '',
            rules: [
              {
                required: true,
                message: '请输入课程名称...'
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

        <FormItem {...formItemLayout} label="背景图" style={{ display: 'none' }}>
          <Row>
            <Col span={20}>
              {form.getFieldDecorator('bgPath', {
                initialValue: formData.bgPath || '',
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
              {form.getFieldDecorator('wholeBgPath', {
                initialValue: formData.wholeBgPath || '',
                rules: [
                  {
                    required: true,
                    message: '请输入课程封面(素材图片)...'
                  }
                ]
              })(<img alt="" style={{ width: 100, height: 100 }} src={formData.wholeBgPath} />)}
            </Col>
            <Col>
              <Button onClick={this.selectImage2} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="简介">
          {form.getFieldDecorator('courseIntro', {
            initialValue: formData.courseIntro || '',
            rules: [
              {
                required: true,
                message: '请输入简介...'
              }
            ]
          })(<Input />)}
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

        <FormItem {...formItemLayout} label="章节数">
          {form.getFieldDecorator('numChapter', {
            initialValue: formData.numChapter || '',
            rules: [
              {
                required: true,
                message: '请输入章节数...'
              }
            ]
          })(<InputNumber max={99} min={0} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="作者id" style={{ display: 'none' }}>
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('cousrseAuthorId', {
                initialValue: formData.cousrseAuthorId || '',
                rules: [
                  {
                    required: true,
                    message: '请输入作者id...'
                  }
                ]
              })(<Input />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectAuthorModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="作者姓名">
          <Row gutter={0}>
            <Col span={22}>
              {form.getFieldDecorator('authorName', {
                initialValue: formData.authorName || '',
                rules: [
                  {
                    required: true,
                    message: '请输入作者id...'
                  }
                ]
              })(<Input readOnly />)}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectAuthorModel} icon="search" />
            </Col>
          </Row>
        </FormItem>

        <FormItem {...formItemLayout} label="价格">
          {form.getFieldDecorator('upCourse', {
            initialValue: formData.upCourse || '',
            rules: [
              {
                required: true,
                message: '请输入价格...'
              }
            ]
          })(<InputNumber min={0} />)}
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
          })(<InputNumber min={0} max={255} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否首页推荐">
          {form.getFieldDecorator('isRecommend', {
            initialValue: formData.isRecommend === undefined ? '' : `${formData.isRecommend}`,
            rules: [
              {
                required: true,
                message: '请输入是否首页推荐...'
              }
            ]
          })(isTrueSelect)}
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
          imagePath={this.state.flag == 1 ? formData.coverPath : formData.bgPath}
          flag={this.state.flag}
          modalVisible={this.state.modalVisible}
        />
        <SelectArticle
          {...parentMethodsForArticle}
          mediaArticleId={formData.mediaArticleId}
          modalVisible={this.state.articleModalVisible}
        />
        <SelectAuthor
          {...parentMethodsForAuthor}
          courseAuthorId={formData.cousrseAuthorId}
          modalVisible={this.state.authorModalVisible}
        />
        <SelectTag
          {...parentMethodsForTag}
          courseTagId={formData.courseTagId}
          modalVisible={this.state.tagModalVisible}
        />
        <SelectColumn
          {...parentMethodsForColumn}
          courseColumnId={formData.courseColumnId}
          modalVisible={this.state.columnModalVisible}
        />
      </Modal>
    );
  }
}
