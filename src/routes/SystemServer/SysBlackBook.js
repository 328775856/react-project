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
  Table
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './SysBlackBook_edit';
import CreateFindForm from './SysBlackBook_find';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.crud
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {},
    page: defaultPage()
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'blackBook/getBlackBookPage',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
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
    this.setState({ page });
    this.refresh(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  callback = () => {
    const { restTableData } = this.props;
    if (restTableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(restTableData.message);
    }
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

  add = fields => {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'restTableData/add',
    //   path: 'blackBook/getDataForAdd',
    //   payload: fields
    // });
    this.setState({
      modalTitle: '新增黑名单书库',
      modalVisible: true
    });
  };

  addSave = fields => {
    const { dispatch, restTableData } = this.props;
    dispatch({
      type: 'restTableData/add',
      path: 'blackBook/addBlackBook',
      payload: fields,
      callback: this.callback
    });
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/getData',
      path: 'blackBook/getBlackBook',
      payload: { blackBookId: record.blackBookId }
    });
    this.setState({
      modalTitle: '修改黑名单书库',
      modalVisible: true
    });
  };

  updateSave = fields => {
    const { dispatch, restTableData } = this.props;
    const payload = {
      ...restTableData.formData,
      ...fields
    };
    dispatch({
      type: 'restTableData/update',
      path: 'blackBook/updateBlackBook',
      payload,
      callback: this.callback
    });
  };

  delete = record => {
    const { dispatch, restTableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'restTableData/delete',
          path: 'blackBook/deleteBlackBook',
          payload: { blackBookId: record.blackBookId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { restTableData, loading } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'blackBookId'
      },
      {
        title: '书名',
        dataIndex: 'bookName'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        render(text, record) {
          if ((text || '.').length > 40) {
            return `${text.substring(0, 40)}......`;
          }
          return text;
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.update(record)}>修改{record.key}</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除{record.key}</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      addSave: this.addSave,
      updateSave: this.updateSave,
      closeModal: this.closeModal
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
            <Table
              dataSource={restTableData.pageData.list || []}
              columns={columns}
              rowKey="blackBookId"
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
      </PageHeaderLayout>
    );
  }
}
