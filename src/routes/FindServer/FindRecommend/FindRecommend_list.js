import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Modal, message, Divider, Table, Button } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindRecommend_edit';
import CreateFindForm from './FindRecommend_find';
import { defaultPage, formatDate } from '../../../utils/utils.js';
import TimeToPublishForm from './RecommendTimeToPublish';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindRecommend extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    timeToPushModalVisible: false
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'findRecommend/page',
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
    tableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page } = this.state;
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
          path: 'findRecommend/remove',
          payload: { findRecommendId: record.findRecommendId },
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

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'findRecommend/getDataForAdd',
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
      path: 'findRecommend/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findRecommend/getDataForUpdate',
      payload: { findRecommendId: record.findRecommendId }
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
      path: 'findRecommend/update',
      payload: payload,
      callback: this.callback
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
          path: 'findRecommend/publish',
          payload: {
            findRecommendId: record.findRecommendId
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
          path: 'findRecommend/off',
          payload: {
            findRecommendId: record.findRecommendId
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
      path: 'findRecommend/getDataForUpdate',
      payload: { findRecommendId: record.findRecommendId }
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
      path: 'findRecommend/timeToPublish',
      payload: {
        findRecommendId: record.findRecommendId,
        publishDate: record.publishDate
      },
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

  publishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
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
    </Fragment>
  );

  timingPublishOP = record => (
    <Fragment>
      <a onClick={() => this.off(record)}>下架</a>
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
    const { modalVisible, modalTitle, timeToPushModalVisible } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'findRecommendId'
      },
      {
        title: '标题',
        dataIndex: 'recommendTitle'
      },
      {
        title: '封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      {
        title: '简介',
        dataIndex: 'recommendIntro',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '顺序',
        dataIndex: 'indexNo'
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
              rowKey="findRecommendId"
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
