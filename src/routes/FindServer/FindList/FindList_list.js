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
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindList_edit';
import CreateFindForm from './FindList_find';
import { defaultPage, formatDate } from '../../../utils/utils.js';
import TimeToPublishForm from './ListTimeToPublish';

const FormItem = Form.Item;
@connect(({ tableData, restTableData, loading }) => ({
  tableData,
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindList extends PureComponent {
  state = {
    modalVisible: false,
    timeToPushModalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: []
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'findList/page',
      payload: {
        data: values,
        page: page
      }
    });
    this.setState({
      modalVisible: false,
      timeToPushModalVisible: false
    });
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    let page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page: page
    });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { tableData } = this.props;
    if (tableData.status == 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(tableData.message);
    }
  };

  remove = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'findList/remove',
          payload: { findListId: record.findListId },
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
      values.publishDateStart = values.publishDateStart ?
        values.publishDateStart.format('YYYYMMDD') :
        '';
      values.publishDateEnd = values.publishDateEnd ? values.publishDateEnd.format('YYYYMMDD') : '';
      const page = defaultPage();
      this.setState({
        formValues: values,
        page: page
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
      let newState = {};
      newState[key] = false;
      this.setState(newState);
    }
  };

  initOptionsCallback = response => {
    const { page } = this.state;
    const result = JSON.parse(response.data);
    this.setState({
      options: result
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'findList/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  publish = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定发布吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findList/publish',
          payload: {
            findListId: record.findListId
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  off = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定取消发布吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findList/off',
          payload: {
            findListId: record.findListId
          },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  getDataForTimeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findList/getDataForUpdate',
      payload: { findListId: record.findListId }
    });
    this.setState({
      modalTitle: '定时发布',
      timeToPushModalVisible: true
    });
  };

  timeToPublish = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/update',
      path: 'findList/timeToPublish',
      payload: {
        findListId: record.findListId,
        publishDate: record.publishDate
      },
      callback: this.callback
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'findList/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'findList/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findList/getDataForUpdate',
      payload: { findListId: record.findListId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    let payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'findList/update',
      payload: payload,
      callback: this.callback
    });
  };

  formatState = text => {
    if (text == 0) {
      return '未发布';
    } else if (text == 1) {
      return '已发布';
    } else {
      return '定时发布';
    }
  };

  showBookList = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/FindServer/findListBook',
      payload: {
        listId: record.findListId
      }
    });
  };

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
      <Divider type="vertical" />
      <a onClick={() => this.showBookList(record)}>图书列表</a>
    </Fragment>
  );

  unPublishOP = record => (
    <Fragment>
      <a onClick={() => this.publish(record)}>发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForTimeToPublish(record)}>定时发布</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>修改</a>
      <Divider type="vertical" />
      <a onClick={() => this.remove(record)}>删除</a>
      <Divider type="vertical" />
      <a onClick={() => this.showBookList(record)}>图书列表</a>
    </Fragment>
  );

  timingPublishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
      <Divider type="vertical" />
      <a onClick={() => this.showBookList(record)}>图书列表</a>
    </Fragment>
  );

  renderPublishOP = record =>
    record.publishStatus === 0 ?
      this.unPublishOP(record) :
      record.publishStatus === 1 ?
        this.publishOP(record) :
        this.timingPublishOP(record);

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.getDataForAdd);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options, timeToPushModalVisible } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'findListId'
      },
      {
        title: '所属栏目ID',
        dataIndex: 'findChannelId',
        render(text, record) {
          const dict = () => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (record.findChannelId === options[i].findChannelId) {
                res = options[i].channelName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict()}</Fragment>;
        }
      },
      {
        title: '书单名称',
        dataIndex: 'listName'
      },
      {
        title: '推荐人',
        dataIndex: 'nickname'
      },
      {
        title: '书单图片',
        dataIndex: 'wholePhotoPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholePhotoPath} />
          </Fragment>
        )
      },
      {
        title: '书单介绍',
        dataIndex: 'listIntro'
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => <Fragment>{this.formatState(text)}</Fragment>
      },
      {
        title: '发布时间',
        dataIndex: 'publishDate',
        render: (text, record) => <Fragment>{formatDate(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{this.renderPublishOP(record)}</Fragment>
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      dispatch: this.props.dispatch,
      timeToPublish: this.timeToPublish,
      getDataForAdd: this.getDataForAdd
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator} />
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="findListId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={tableData.formData}
          title={modalTitle}
          options={options}
        />
        <TimeToPublishForm
          {...parentMethods}
          timeToPushModalVisible={timeToPushModalVisible}
          formData={tableData.formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
