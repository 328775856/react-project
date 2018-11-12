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
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './UserInfo_edit';
import CreateFindForm from './UserInfo_find';
import CreateHandleForm from './UserInfo_handle';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class UserFeedback extends PureComponent {
  state = {
    modalVisible: false,
    modalHandleVisible: false,
    modalTitle: '',
    modalHandleTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {},
    userType: []
  };

  refresh = (values, page) => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'userInfo/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false,
      modalHandleVisible: false
    });
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page, options } = this.state;
    this.initOptions();
    this.initOptionsForType();
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

  initOptionsForUserTypeCallback = response => {
    this.setState({
      userType: response.data.rows
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
      modalVisible: false,
      modalHandleVisible: false
    });
  };

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'userInfo/getDataForAdd',
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
      path: 'userInfo/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'userInfo/getDataForUpdate',
      payload: { userId: record.userId }
    });
    this.setState({
      modalTitle: '详情',
      modalVisible: true
    });
  };

  getDataForHandle = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'userExtend/getDataForUpdate',
      payload: { userId: record.userId }
    });
    this.setState({
      modalHandleTitle: '冻结处理',
      modalHandleVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'userInfo/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  initOptionsForType = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'userInfo/getUserTypeForAdd',
      payload: {},
      callback: this.initOptionsForUserTypeCallback
    });
  };

  updateUserExtend = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'userExtend/frozen',
      payload,
      callback: this.callback
    });
  };

  unFrozen = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'userInfo/update',
      payload,
      callback: this.callback
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
      path: 'userInfo/update',
      payload,
      callback: this.callback
    });
  };

  updateUnFrozen = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'userInfo/unFrozen',
      payload,
      callback: this.callback
    });
  };

  frozen = record => <a onClick={() => this.getDataForHandle(record)}>冻结</a>;

  unFrozen = record => <a onClick={() => this.updateUnFrozen(record)}>解冻</a>;

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.isEmptyObject, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const {
      modalVisible,
      modalHandleVisible,
      modalTitle,
      modalHandleTitle,
      options,
      userType
    } = this.state;

    const columns = [
      {
        title: '用户ID',
        dataIndex: 'userId'
      },
      {
        title: '用户昵称',
        dataIndex: 'nickname'
      },
      {
        title: '用户类型',
        dataIndex: 'userTypeId',
        render(text, record) {
          var dict = record => {
            var res = '';
            var myArray = userType;
            // eslint-disable-next-line vars-on-top
            for (var k in myArray) {
              if (record.userTypeId === myArray[k].userTypeId) {
                res = myArray[k].userTypeName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(record)}</Fragment>;
        }
      },
      {
        title: '用户来源',
        dataIndex: 'regSource',
        render(text, record) {
          var dict = record => {
            var res = '';
            var myArray = options['7'];
            // eslint-disable-next-line vars-on-top
            for (var k in myArray) {
              if (record.regSource === myArray[k].itemNo) {
                res = myArray[k].itemLabel;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(record)}</Fragment>;
        }
      },
      {
        title: '最近登陆时间',
        dataIndex: 'loginDate',
        render(text) {
          return <Fragment>{text === undefined ? '最近没有登录记录' : formatTime(text)}</Fragment>;
        }
      },
      {
        title: '注册时间',
        dataIndex: 'regTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '状态',
        dataIndex: 'userStatus',
        render(text) {
          var dict = text => {
            var res = '';
            var myArray = options['4'];
            // eslint-disable-next-line vars-on-top
            for (var k in myArray) {
              if (text === myArray[k].itemNo) {
                res = myArray[k].itemLabel;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(text)}</Fragment>;
        }
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>详情</a>
            <Divider type="vertical" />
            {record.userStatus === 1 ? this.frozen(record) : this.unFrozen(record)}
          </Fragment>
        )
      }
    ];

    const parentMethods = {
      updateUserExtend: this.updateUserExtend,
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      isEmptyObject: this.isEmptyObject
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="userTypeId"
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
          userType={userType}
        />
        <CreateHandleForm
          {...parentMethods}
          modalVisible={modalHandleVisible}
          formData={tableData.formData}
          title={modalHandleTitle}
          options={options}
        />
      </PageHeaderLayout>
    );
  }
}
