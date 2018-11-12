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
import CreateEditForm from './UploadBook_edit';
import CreateFindForm from './UploadBook_find';
import CreateAuditForm from './UploadBook_audit';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class UploadBook extends PureComponent {
  state = {
    modalVisible: false,
    modalAuditVisible: false,
    modalTitle: '',
    modalAuditTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {}
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    const paramData = {
      bookStorageType: 3,
      ...values
    };
    dispatch({
      type: 'tableData/list',
      path: 'uploadBook/page',
      payload: {
        data: paramData,
        page
      }
    });
    this.setState({
      modalVisible: false,
      modalAuditVisible: false
    });
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page, options } = this.state;
    this.initOptions();
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

  isEmptyObject = e => {
    let t;
    for (t in e) return !1;
    return !0;
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
    }
  };

  initOptionsCallback = response => {
    this.setState({
      options: JSON.parse(response.data)
    });
  };

  remove = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'uploadBook/remove',
          payload: { bookUserId: record.bookUserId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  getDataForAudit = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'uploadBook/getDataForUpdate',
      payload: { bookUserId: record.bookUserId }
    });
    this.setState({
      modalAuditTitle: '审核',
      modalAuditVisible: true
    });
  };

  auditcallback = () => {
    const { tableData } = this.props;
    if (tableData.status === 200) {
      const { formValues, page } = this.state;
      this.refresh(formValues, page);
    } else {
      message.success(tableData.message);
    }
  };

  query = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      let values = {
        ...fieldsValue
      };
      values.createTimeStart = values.createTimeStart ?
        values.createTimeStart.format('YYYYMMDDHHmmss') :
        '';
      values.createTimeEnd = values.createTimeEnd ?
        values.createTimeEnd.format('YYYYMMDDHHmmss') :
        '';
      const page = defaultPage();
      this.setState({
        formValues: values,
        page: page
      });
      this.refresh(values, page);
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalAuditVisible: false
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'uploadBook/getDataForAdd',
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
      path: 'uploadBook/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'uploadBook/getDataForUpdate',
      payload: { bookUserId: record.bookUserId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'uploadBook/getDataForAdd',
      payload: {
        data: {},
        page: { pageNo: 1, pageSize: 10 }
      },
      callback: this.initOptionsCallback
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'uploadBook/update',
      payload,
      callback: this.callback
    });
  };

  audit = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'uploadBook/audit',
      payload,
      callback: this.auditcallback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.isEmptyObject, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, modalAuditTitle, modalAuditVisible, options } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'bookUserId'
      },
      {
        title: '图书ID',
        dataIndex: 'bookId'
      },
      {
        title: '上传用户ID',
        dataIndex: 'userId'
      },
      {
        title: '上传用户昵称',
        dataIndex: 'uploaderName'
      },
      {
        title: '图书名',
        dataIndex: 'bookName'
      },
      {
        title: '封面路径',
        dataIndex: 'wholePhotoPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholePhotoPath} />
          </Fragment>
        )
      },

      {
        title: '图书格式',
        dataIndex: 'bookStyleName'
      },
      {
        title: '上传时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            {/* <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
            <Divider type="vertical" />*/}
            <a onClick={() => this.getDataForAudit(record)}>审核</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      add: this.add,
      update: this.update,
      audit: this.audit,
      closeModal: this.closeModal,
      isEmptyObject: this.isEmptyObject,
      dispatch: this.props.dispatch
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
              rowKey="bookUserId"
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
        <CreateAuditForm
          {...parentMethods}
          modalVisible={modalAuditVisible}
          formData={tableData.formData}
          title={modalAuditTitle}
          options={options}
        />
      </PageHeaderLayout>
    );
  }
}
