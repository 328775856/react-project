import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
  Divider
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import SelectAudio from '../Select/SelectAudio';
import SelectVideo from '../Select/SelectVideo';
import SelectArticle from '../Select/SelectArticle';
import styles from '../../assets/edit.less';
const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTest,
}))
@Form.create()
export default class SelectTest extends PureComponent {

  constructor(props){
    super(props);
  }
  componentDidMount() {


  }
  componentWillMount() {


  }
  state = {
    audioModalVisible: false,
    videoModalVisible: false,
    articleModalVisible: false,
    submitting:false,
  };

  closeModal = () => {
    this.setState({
      audioModalVisible: false,
      videoModalVisible: false,
      articleModalVisible: false,
    });
  };

  callReturn = (record) => {
    if(record!=null){
      const { dispatch } = this.props;
      let myFormData={
        ...record[0]
      };
      dispatch({
        type: 'restTableData/select',
        payload: myFormData,
      });
    }
    this.closeModal();
  };

  selectAudioModel = () => {
    this.setState({
      audioModalVisible: true,
    });
  };
  selectVideoModel = () => {
    this.setState({
      videoModalVisible: true,
    });
  };
  selectArticleModel = () => {
    this.setState({
      articleModalVisible: true,
    });
  };




  render() {
    const { submitting, audioModalVisible, videoModalVisible, articleModalVisible } = this.state;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { restTableData:{formData} } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };


    const parentMethodsForAudio = {
      callReturn: this.callReturn,
      closeModal: this.closeModal,
    };
    const parentMethodsForVideo = {
      callReturn: this.callReturn,
      closeModal: this.closeModal,
    };
    const parentMethodsForArticle = {
      callReturn: this.callReturn,
      closeModal: this.closeModal,
    };
    return (
      <PageHeaderLayout>
      <Card bordered={false}>
        <Divider orientation="left">选择音频</Divider>
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <FormItem {...formItemLayout} label="选择音频">
          <Row gutter={0}>
            <Col span={22}>
              {getFieldDecorator('code', {initialValue:formData.mediaAudioId ||'',
                rules: [{ required: true, message: '请选择音频!' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectAudioModel} icon="search"></Button>
            </Col>
          </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="音频ID">
            <input value={formData.mediaAudioId}  />
          </FormItem>
          <FormItem {...formItemLayout} label="音频名称">
            <input value={formData.audioName}  />
          </FormItem>
          <Divider orientation="left">选择音频</Divider>
          <FormItem {...formItemLayout} label="选择音频">
          <Row gutter={0}>
            <Col span={22}>
              {getFieldDecorator('code', {initialValue:formData.mediaVideoId ||'',
                rules: [{ required: true, message: '请选择视频!' }],
              })(
                <Input />
              )}
            </Col>
            <Col span={2}>
              <Button onClick={this.selectVideoModel} icon="search"></Button>
            </Col>
          </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="视频ID">
            <input value={formData.mediaVideoId}  />
          </FormItem>
          <FormItem {...formItemLayout} label="视频名称">
            <input value={formData.videoName}  />
          </FormItem>
          <Divider orientation="left">选择图文</Divider>
          <FormItem {...formItemLayout} label="选择图文">
          <Row gutter={0}>
            <Col span={22}>
              {getFieldDecorator('code', {initialValue:formData.mediaArticleId ||'',
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
          <FormItem {...formItemLayout} label="图文标题">
            <input value={formData.articleTitle}  />
          </FormItem>

          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              提交
            </Button>
            <Button style={{ marginLeft: 8 }}>返回</Button>
          </FormItem>
        </Form>
      </Card>
      <SelectAudio {...parentMethodsForAudio} modalVisible={audioModalVisible}/>
      <SelectVideo {...parentMethodsForVideo} modalVisible={videoModalVisible}/>
      <SelectArticle {...parentMethodsForArticle} modalVisible={articleModalVisible}/>
    </PageHeaderLayout>
    );
  }
}
