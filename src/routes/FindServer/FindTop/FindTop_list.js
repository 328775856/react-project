import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Button, Modal, message, Divider, Table } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import styles from '../../../assets/styles.less';
import CreateEditForm from './FindTop_edit';
import fetch from '../../../utils/fetch';
import { formatTime } from '../../../utils/utils';

@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class FindTop extends PureComponent {
  state = {
    page: {},
    paramData: {},
    formValues: {},
    modalTitle: '',
    modalVisible: false,
    TableData: []
  };

  componentWillMount() {
    const { formValues } = this.state;
    this.refresh(formValues);
  }

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'findTop/getDataForAdd',
      payload: fields
    });

    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'findTop/getDataForUpdate',
      payload: { findTopId: record.findTopId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  refresh = values => {
    const { tableData } = this.props;
    const { page } = this.state;
    fetch('findTop/page', 'post', {
      data: values,
      page
    }).then(res => {
      if (res.err) {
        return;
      }
      if (res.data.status === 200) {
        tableData.pageData.list = res.data.data.rows;
        tableData.pageData.pagination = {
          total: res.data.data.total
        };
        this.setState({
          TableData: res.data.data.rows
        });
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  tableChange = pagination => {
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
    const { tableData } = this.props;
    if (tableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(tableData.message);
      this.setState({
        modalVisible: false
      });
    }
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  add = fields => {
    const { dispatch, paramData } = this.props;
    const params = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'tableData/add',
      path: 'findTop/add',
      payload: params,
      callback: this.callback
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...tableData.formData,
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'tableData/update',
      path: 'findTop/update',
      payload,
      callback: this.callback
    });
  };

  release = record => {
    const { dispatch, tableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...tableData.formData,
      ...record,
      ...paramData
    };
    const cb = this.callback;
    Modal.confirm({
      title: '确定要启用?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findTop/release',
          payload,
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  unRelease = record => {
    const { dispatch, tableData } = this.props;
    const { paramData } = this.state;
    const payload = {
      ...tableData.formData,
      ...record,
      ...paramData
    };
    const cb = this.callback;
    Modal.confirm({
      title: '确定要停用?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'findTop/unRelease',
          payload,
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  detail = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/FindServer/findTopBook',
      payload: {
        findTopId: record.findTopId
      }
    });
  };

  remove = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'findTop/remove',
          payload: { findTopId: record.findTopId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  tableChange = pagination => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.refresh(formValues, page);
  };

  publishRelease = record => (
    <Fragment>
      <a onClick={() => this.unRelease(record)}>停用</a>
      <Divider type="vertical" />
      <a onClick={() => this.detail(record)}>图书列表</a>
    </Fragment>
  );

  publishUnRelease = record => (
    <Fragment>
      <a onClick={() => this.release(record)}>启用</a>
      <Divider type="vertical" />
      <a onClick={() => this.detail(record)}>图书列表</a>
      <Divider type="vertical" />
      <a onClick={() => this.getDataForUpdate(record)}>修改</a>
      <Divider type="vertical" />
      <a onClick={() => this.remove(record)}>删除</a>
    </Fragment>
  );

  renderPublishStatus = record =>
    record.publishStatus === 1 ? this.publishRelease(record) : this.publishUnRelease(record);

  render() {
    const { add, update, tableChange, closeModal, isEmptyObject } = this;
    const { dispatch, loading, tableData } = this.props;
    const { modalVisible, modalTitle, TableData } = this.state;
    const parentMethods = {
      add,
      update,
      closeModal,
      dispatch,
      isEmptyObject
    };

    const columns = [
      { title: '系统ID', dataIndex: 'findTopId' },
      { title: '榜单名称', dataIndex: 'topName' },
      {
        title: '榜单图片',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },
      { title: '介绍', dataIndex: 'intro' },
      {
        title: '是否推荐',
        dataIndex: 'isRecc',
        render: (text, record) => <Fragment>{record.isRecc === 0 ? '未推荐' : '已推荐'}</Fragment>
      },
      {
        title: '是否固定首页',
        dataIndex: 'isIndex',
        render: (text, record) => <Fragment>{record.isIndex === 0 ? '否' : '是'}</Fragment>
      },
      {
        title: '发布状态',
        dataIndex: 'publishStatus',
        render: (text, record) => (
          <Fragment>{record.publishStatus === 0 ? '停用' : '启用'}</Fragment>
        )
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => <Fragment>{this.renderPublishStatus(record)}</Fragment>
      }
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.getDataForAdd()}>
                新建
              </Button>
            </div>
            <Table
              dataSource={TableData}
              columns={columns}
              rowKey="findTopId"
              loading={loading}
              onChange={tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={tableData.formData}
          title={modalTitle}
          state={this.state}
        />
      </PageHeaderLayout>
    );
  }
}
