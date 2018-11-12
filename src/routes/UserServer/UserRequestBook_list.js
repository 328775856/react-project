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
import CreateEditForm from './UserRequestBook_edit';
import CreateHandleForm from './UserRequestBook_handle';
import CreateFindForm from './UserRequestBook_find';
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
    options: {}
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'userRequestBook/page',
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
    console.log(response.data);
    console.log(JSON.parse(response.data));
    this.setState({
      options: JSON.parse(response.data)
    });

    console.log(this.state);
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
      path: 'userRequestBook/getDataForAdd',
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
      path: 'userRequestBook/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'userRequestBook/getDataForUpdate',
      payload: { userRequestBookId: record.userRequestBookId }
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
      path: 'userRequestBook/getDataForUpdate',
      payload: { userRequestBookId: record.userRequestBookId }
    });
    this.setState({
      modalHandleTitle: '错误处理',
      modalHandleVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'userRequestBook/getDataForAdd',
      payload: {},
      callback: this.initOptionsCallback
    });
  };

  update = fields => {
    const { dispatch, tableData } = this.props;
    const payload = {
      ...tableData.formData,
      ...fields
    };
    debugger;
    dispatch({
      type: 'tableData/update',
      path: 'userRequestBook/update',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.isEmptyObject, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options, modalHandleVisible, modalHandleTitle } = this.state;

    const columns = [
      {
        title: '系统Id',
        dataIndex: 'userRequestBookId'
      },
      {
        title: '用户Id',
        dataIndex: 'userId'
      },
      {
        title: '书名',
        dataIndex: 'bookName'
      },
      {
        title: '求书内容',
        dataIndex: 'requestContent',
        render(text, record) {
          return <Fragment>{text === '' ? '暂无内容' : text}</Fragment>;
        }
      },
      {
        title: '回复状态',
        dataIndex: 'isReply',
        render(text, record) {
          var dict = record => {
            var res = '';
            var myArray = options['5'];
            // eslint-disable-next-line vars-on-top
            for (var k in myArray) {
              if (record.isReply === myArray[k].itemNo) {
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
        title: '回复时间',
        dataIndex: 'replyTime',
        render(text, record) {
          return <Fragment>{text === 0 ? '暂无处理时间' : formatTime(text)}</Fragment>;
        }
      },
      {
        title: '回复内容',
        dataIndex: 'replyContent',
        render(text, record) {
          return <Fragment>{text === '' ? '暂无回复内容' : text}</Fragment>;
        }
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>详情</a>
            <Divider type="vertical" />
            <a onClick={() => this.getDataForHandle(record)}>处理</a>
          </Fragment>
        )
      }
    ];

    const parentMethods = {
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
              rowKey="userRequestBookId"
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
