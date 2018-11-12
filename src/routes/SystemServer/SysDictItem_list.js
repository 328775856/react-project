import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Form, message, Modal, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './SysDictItem_edit';
import CreateFindForm from './SysDictItem_find';
import { defaultPage } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class SysDictItem extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    paramData: {},
    page: defaultPage()
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    const { paramData } = this.state;
    const params = {
      ...paramData,
      ...values
    };
    dispatch({
      type: 'tableData/list',
      path: 'sysDictItem/page',
      payload: {
        data: params,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    const { tableData } = this.props;
    const paramData = {
      ...tableData.formData
    };
    this.setState({
      paramData
    });
    this.refresh(paramData, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { paramData } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
    this.refresh(paramData, page);
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
          path: 'sysDictItem/remove',
          payload: { sysDictItemId: record.sysDictItemId },
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

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'sysDictItem/getDataForAdd',
      payload: fields
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    const { paramData } = this.state;
    const params = {
      ...fields,
      ...paramData
    };
    dispatch({
      type: 'tableData/add',
      path: 'sysDictItem/add',
      payload: params,
      callback: this.callback
    });
  };

  ret = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/systemServer/sysDict',
      payload: {}
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'sysDictItem/getDataForUpdate',
      payload: { sysDictItemId: record.sysDictItemId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
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
      path: 'sysDictItem/update',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'sysDictItemId'
      },
      {
        title: '字典项',
        dataIndex: 'itemNo'
      },
      {
        title: '字典名称',
        dataIndex: 'itemLabel'
      },
      {
        title: '备注',
        dataIndex: 'itemRemark'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
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
              <Button type="default" onClick={() => this.ret()}>
                返回
              </Button>
            </div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="sysDictItemId"
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
      </PageHeaderLayout>
    );
  }
}
