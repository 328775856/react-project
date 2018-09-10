import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Form, message, Modal, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './SysDict_edit';
import CreateFindForm from './SysDict_find';
import { defaultPage } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud,
}))
@Form.create()
export default class SysDict extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'sysDict/page',
      payload: {
        data: values,
        page: page,
      },
    });
    this.setState({
      modalVisible: false,
    });
  };

  componentDidMount() {
    const { formValues, page } = this.state;
    this.refresh(formValues, page);
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    let page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current,
    };
    this.setState({
      page: page,
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
          path: 'sysDict/remove',
          payload: { sysDictId: record.sysDictId },
          callback: cb,
        });
      },
      onCancel() {},
    });
  };
  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      const page = defaultPage();
      this.setState({
        formValues: values,
        page: page,
      });
      this.refresh(values, page);
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'sysDict/getDataForAdd',
      payload: fields,
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'sysDict/add',
      payload: fields,
      callback: this.callback,
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'sysDict/getDataForUpdate',
      payload: { sysDictId: record.sysDictId },
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true,
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    let payload = {
      ...tableData.formData,
      ...fields,
    };
    dispatch({
      type: 'tableData/update',
      path: 'sysDict/update',
      payload: payload,
      callback: this.callback,
    });
  };

  detail = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/goUrl',
      path: '/systemServer/sysDictItem',
      payload: {
        sysDictId: record.sysDictId,
        dictNo: record.dictNo,
      },
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
        dataIndex: 'sysDictId',
      },
      {
        title: '字典组编号',
        dataIndex: 'dictNo',
      },
      {
        title: '字典组名称',
        dataIndex: 'dictName',
      },
      {
        title: '字典组备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.detail(record)}>明细</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
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
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="sysDictId"
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
