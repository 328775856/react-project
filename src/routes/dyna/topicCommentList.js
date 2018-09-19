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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './topicCommentEdit';
import CreateFindForm from './topicCommentFind';
import ContentForm from './topicCommentContent';
import FavorForm from './topicCommentFavor';
import { defaultPage } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class DynaTopicComment extends PureComponent {
  state = {
    modalVisible: false,
    contentModalVisible: false,
    favorModalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage()
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'dyna/topicComment/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false,
      contentModalVisible: false,
      favorModalVisible: false
    });
  };

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
      message.success(restTableData.message);
    }
  };

  formatTime = text => {
    if (text == null || text === 0) {
      return '';
    }
    const str = new String(text);
    const time = {
      year: str.substr(0, 4),
      month: parseInt(str.substr(4, 2)) + 1,
      date: str.substr(6, 2),
      hour: str.substr(8, 2),
      minute: str.substr(10, 2),
      second: str.substr(12, 2)
    };
    return moment()
      .set(time)
      .format('YYYY-MM-DD HH:mm:ss');
  };

  delete = record => {
    const { dispatch, restTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'restTableData/delete',
          path: 'dyna/topicComment',
          payload: { dynaTopicCommentId: record.dynaTopicCommentId },
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
      path: 'dyna/topicComment/getDataForAdd',
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
      path: 'dyna/topicComment',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topicComment/getDataForUpdate',
      payload: { dynaTopicCommentId: record.dynaTopicCommentId }
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
      path: 'dyna/topicComment',
      payload,
      callback: this.callback
    });
  };

  getDataForComment = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topicComment/getDataForUpdate',
      payload: { dynaTopicCommentId: record.dynaTopicCommentId }
    });
    this.setState({
      modalTitle: '修改',
      contentModalVisible: true
    });
  };

  showReply = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/goUrl',
      path: '/dyna/reply',
      payload: {
        dynaTopicCommentReplyId: record.dynaTopicCommentReplyId
      }
    });
  };

  hiddenComment = record => {
    const { dispatch, callback } = this.props;

    Modal.confirm({
      title: '确定隐藏评论吗?',
      onOk() {
        dispatch({
          type: 'restTableData/update',
          path: 'dyna/topicComment/hiddenComment',
          payload: {
            dynaTopicCommentId: record.dynaTopicCommentId
          },
          callback
        });
      },
      onCancel() {}
    });
  };

  getDataForFavor = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getDataForUpdate',
      path: 'dyna/topicComment/getDataForUpdate',
      payload: record
    });
    this.setState({
      modalTitle: '点赞数',
      favorModalVisible: true
    });
  };

  setFavorNum = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/update',
      path: 'dyna/topicComment/setFavorNum',
      payload: {
        dynaTopicCommentId: fields.dynaTopicCommentId,
        numFavor: fields.numFavor
      },
      callback: this.callback
    });
  };

  renderForm() {
    const { restTableData } = this.props;
    const dynaTopicId = restTableData.formData ? restTableData.formData.dynaTopicId : '';
    return CreateFindForm(this.props, this.query, this.formReset, dynaTopicId);
  }

  render() {
    const { restTableData, loading } = this.props;
    const { modalVisible, contentModalVisible, favorModalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: 'id',
        dataIndex: 'dynaTopicCommentId'
      },
      {
        title: '发表人id',
        dataIndex: 'userId'
      },
      {
        title: '回复数',
        dataIndex: 'numReply'
      },
      {
        title: '点赞数',
        dataIndex: 'numFavor'
      },
      {
        title: '评论内容',
        dataIndex: 'commentContent'
      },
      {
        title: '发表时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{this.formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForComment(record)}>查看评论</a>
            <Divider type="vertical" />
            <a onClick={() => this.showReply(record)}>查看回复</a>
            <Divider type="vertical" />
            <a onClick={() => this.hiddenComment(record)}>隐藏评论</a>
            <Divider type="vertical" />
            <a onClick={() => this.getDataForFavor(record)}>设置点赞数</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      setFavorNum: this.setFavorNum,
      closeModal: this.closeModal
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              dataSource={restTableData.pageData.list}
              columns={columns}
              rowKey="dynaTopicCommentId"
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
        <ContentForm
          {...parentMethods}
          contentModalVisible={contentModalVisible}
          formData={restTableData.formData}
          title={modalTitle}
        />
        <FavorForm
          {...parentMethods}
          favorModalVisible={favorModalVisible}
          formData={restTableData.formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
