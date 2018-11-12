import React, { Fragment, PureComponent } from 'react';
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
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './topicEdit';
import CreateFindForm from './topicFind';
import CommendForm from './topicCommend';
import TimeToPublishForm from './topicTimeToPublish';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class DynaTopic extends PureComponent {
  state = {
    modalVisible: false,
    commendModalVisible: false,
    timeToPushModalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage()
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'dyna/topic/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false,
      commendModalVisible: false,
      timeToPushModalVisible: false
    });
  };

  componentWillMount() {
    const { restTableData } = this.props;
    restTableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.refresh(formValues, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { restTableData } = this.props;
    if (restTableData.status == 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.error(restTableData.message);
    }
  };

  delete = record => {
    const { dispatch, restTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'restTableData/delete',
          path: 'dyna/topic',
          payload: { dynaTopicId: record.dynaTopicId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue
      };
      values.publishTimeStart = values.publishTimeStart ?
        values.publishTimeStart.format('YYYYMMDDHHmmss') :
        '';
      values.publishTimeEnd = values.publishTimeEnd ?
        values.publishTimeEnd.format('YYYYMMDDHHmmss') :
        '';
      const page = defaultPage();
      this.setState({
        formValues: values,
        page
      });
      this.refresh(values, page);
    });
  };

  closeModal = key => {
    if (!key) {
      this.setState({
        modalVisible: false
      });
    } else {
      const newState = {};
      newState[key] = false;
      this.setState(newState);
    }
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForAdd',
      path: 'dyna/topic/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, restTableData } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'dyna/topic',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topic/getDataForUpdate',
      payload: { dynaTopicId: record.dynaTopicId },
      processor: this.updateDateProcessor
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  update = fields => {
    const { dispatch, restTableData } = this.props;
    const payload = {
      ...restTableData.formData,
      ...fields
    };
    dispatch({
      type: 'restTableData/update',
      path: 'dyna/topic',
      payload,
      callback: this.callback
    });
  };

  publish = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定上架吗?',
      onOk() {
        dispatch({
          type: 'restTableData/update',
          path: 'dyna/topic/publish',
          payload: { dynaTopicId: record.dynaTopicId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  off = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定下架吗?',
      onOk() {
        dispatch({
          type: 'restTableData/update',
          path: 'dyna/topic/off',
          payload: { dynaTopicId: record.dynaTopicId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  getDataForRecommend = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topic/getDataForUpdate',
      payload: { dynaTopicId: record.dynaTopicId },
      processor: this.updateDateProcessor
    });
    this.setState({
      modalTitle: '推荐',
      commendModalVisible: true
    });
  };

  recommend = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/update',
      path: 'dyna/topic/recommend',
      payload: {
        dynaTopicId: record.dynaTopicId,
        indexNo: record.indexNo
      },
      callback: this.callback
    });
  };

  getDataForTimeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topic/getDataForUpdate',
      payload: { dynaTopicId: record.dynaTopicId },
      processor: this.updateDateProcessor
    });
    this.setState({
      modalTitle: '定时发布',
      timeToPushModalVisible: true
    });
  };

  timeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/update',
      path: 'dyna/topic/timeToPublish',
      payload: {
        dynaTopicId: record.dynaTopicId,
        publishTime: record.publishTime
      },
      callback: this.callback
    });
  };

  showComment = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/goUrl',
      path: '/dyna/comment',
      payload: {
        dynaTopicId: record.dynaTopicId
      }
    });
  };

  updateDateProcessor = formData => {
    if (!formData) {
      return formData;
    }
    if (!formData.publishTime) {
      return formData;
    }
    const str = new String(formData.publishTime);
    const time = {
      year: str.substr(0, 4),
      month: parseInt(str.substr(4, 2)) + 1,
      date: str.substr(6, 2),
      hour: str.substr(8, 2),
      minute: str.substr(10, 2),
      second: str.substr(12, 2)
    };
    const momentTime = moment().set(time);
    formData.publishTime = momentTime;
    return formData;
  };

  formatState = text => {
    if (text == 0) {
      return '未发布';
    }
    if (text == 1) {
      return '已发布';
    } else if (text == 2) {
      return '定时发布';
    }
  };

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
      <Divider type="vertical" />
      <a onClick={() => this.showComment(record)}>查看评论</a>
    </Fragment>
  );

  unPublishOP = record => (
    <Fragment>
      <a onClick={() => this.publish(record)}>发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForTimeToPublish(record)}>定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForRecommend(record)}>推荐</a>
      <Divider type="vertical" />
      <a onClick={() => this.showComment(record)}>查看评论</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>修改</a>
      <Divider type="vertical" />
      <a onClick={() => this.delete(record)}>删除</a>
    </Fragment>
  );

  timingPublishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
      <Divider type="vertical" />
      <a onClick={() => this.showComment(record)}>查看评论</a>
    </Fragment>
  );

  renderPublishOP = record =>
    record.publishStatus === 0 ?
      this.unPublishOP(record) :
      record.publishStatus === 1 ?
        this.publishOP(record) :
        this.timingPublishOP(record);

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { restTableData, loading } = this.props;
    const { modalVisible, commendModalVisible, timeToPushModalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'dynaTopicId'
      },
      {
        title: '话题标题',
        dataIndex: 'topicTitle'
      },
      {
        title: '话题类型',
        dataIndex: 'topicType',
        render: (text, record) => {
          //话题类型(字典:1话题,2活动,3投票 默认为1)
          if (text == 1) {
            return <Fragment>话题</Fragment>;
          } else if (text == 2) {
            return <Fragment>活动</Fragment>;
          } else if (text == 3) {
            return <Fragment>投票</Fragment>;
          }
        }
      },
      {
        title: '浏览数',
        dataIndex: 'numView'
      },
      {
        title: '参与评论数',
        dataIndex: 'numComment'
      },
      {
        title: '总回复数',
        dataIndex: 'numReply'
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => <Fragment>{this.formatState(text)}</Fragment>
      },
      {
        title: '发布时间',
        dataIndex: 'publishTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '排序(0为不启用推荐)',
        dataIndex: 'indexNo'
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{this.renderPublishOP(record)}</Fragment>
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      recommend: this.recommend,
      timeToPublish: this.timeToPublish,
      closeModal: this.closeModal
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.getDataForAdd()}>
                新建
              </Button>
            </div>
            <Table
              dataSource={restTableData.pageData.list || []}
              columns={columns}
              rowKey="dynaTopicId"
              pagination={restTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={restTableData.formData}
          title={modalTitle}
        />
        <CommendForm
          {...parentMethods}
          commendModalVisible={commendModalVisible}
          formData={restTableData.formData}
          title={modalTitle}
        />
        <TimeToPublishForm
          {...parentMethods}
          timeToPushModalVisible={timeToPushModalVisible}
          formData={restTableData.formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
