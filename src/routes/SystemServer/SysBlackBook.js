import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
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
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
const FormItem = Form.Item;
import CreateEditForm from './SysBlackBook_edit';
import CreateFindForm from './SysBlackBook_find';
@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {},
  };
  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path: 'blackBook/getBlackBookPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      },
    });
    this.setState({
      modalVisible: false,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    debugger;
    dispatch({
      type: 'crud/list',
      path: 'blackBook/getBlackBookPage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      },
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    debugger;
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      page: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize,
      },
      ...formValues,
    };
    dispatch({
      type: 'crud/list',
      path: 'blackBook/getBlackBookPage',
      payload: params,
    });
  };

  formReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'crud/list',
      path: 'blackBook/getBlackBookPage',
      payload: {},
    });
  };
  batchDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if (selectedRows.length === 0) {
      message.error('请选择记录');
      return;
    }
    Modal.confirm({
      title: '确定批量审核吗?',
      onOk() {
        dispatch({
          type: 'crud/batchDelete',
          path: 'api/crud/batchDelete',
          payload: {
            key: selectedRows.map(row => row.key).join(','),
          },
        });
        message.success('批量审核成功');
        dispatch({
          type: 'crud/list',
          path: 'blackBook/getBlackBookPage',
          payload: {},
        });
      },
      onCancel() {},
    });
  };

  selectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        data: {
          ...fieldsValue,
        },
        page: {
          pageNo: 1,
          pageSize: 10,
        },
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'crud/list',
        path: 'blackBook/getBlackBookPage',
        payload: values,
      });
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  add = fields => {
    const { dispatch } = this.props;
    /* dispatch({
      type: 'crud/add',
      path:'api/crud/add',
      payload: fields,
    });*/
    this.setState({
      modalTitle: '新增黑名单书库',
      modalVisible: true,
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/addSave',
      path: 'blackBook/addBlackBook',
      payload: fields,
    });
    message.success('保存成功');
    this.refresh();
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/update',
      path: 'blackBook/getBlackBook',
      payload: { blackBookId: record.blackBookId },
    });
    this.setState({
      modalTitle: '修改黑名单书库',
      modalVisible: true,
    });
  };

  updateSave = fields => {
    const { dispatch, formData } = this.props;
    dispatch({
      type: 'crud/updateSave',
      path: 'blackBook/updateBlackBook',
      payload: fields,
    });
    message.success('修改保存成功');
    this.refresh();
  };

  delete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/delete',
      path: 'blackBook/deleteBlackBook',
      payload: { blackBookId: record.blackBookId },
    });
    message.success('删除成功');
    this.refresh();
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const {
      crud: { pageData },
      crud: { formData },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统id',
        dataIndex: 'blackBookId',
      },
      {
        title: '书名',
        dataIndex: 'bookName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.update(record)}>修改{record.key}</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除{record.key}</a>
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      addSave: this.addSave,
      updateSave: this.updateSave,
      closeModal: this.closeModal,
    };

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.add()}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={pageData}
              columns={columns}
              onSelectRow={this.selectRows}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          {...parentMethods}
          modalVisible={modalVisible}
          formData={formData}
          title={modalTitle}
        />
      </PageHeaderLayout>
    );
  }
}
