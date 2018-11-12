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
import moment from 'moment/moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './BookBuy_edit';
import CreateFindForm from './BookBuy_find';
import { defaultPage, isEmpty, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class BookBuy extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {}
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = [];
  }

  componentDidMount() {
    const { formValues, page, options } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

  getDataForAdd = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'bookBuy/getDataForAdd',
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
      path: 'bookBuy/getDataForUpdate',
      payload: { bookId: record.bookId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  setUserGood = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.userGoodCallback;
    Modal.confirm({
      title: '确定设置优质图书吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'bookBuy/setUserGood',
          payload: { bookId: record.bookUserId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  unSetUserGood = record => {
    const { dispatch, tableData } = this.props;
    const cb = this.userGoodCallback;
    Modal.confirm({
      title: '确定取消优质图书吗?',
      onOk() {
        dispatch({
          type: 'tableData/update',
          path: 'bookBuy/unSetUserGood',
          payload: { bookUserId: record.bookUserId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'bookBuy/add',
      payload: fields,
      callback: this.callback
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'bookBuy/page',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

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
          path: 'bookBuy/remove',
          payload: { bookId: record.bookId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  userGoodCallback = () => {
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

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'bookProp/getDataForAdd',
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
    dispatch({
      type: 'tableData/update',
      path: 'bookBuy/update',
      payload,
      callback: this.callback
    });
  };

  isHiddenAdminChange = fields => {
    const { dispatch, tableData } = this.props;

    const payload = {
      ...tableData.formData,
      ...fields
    };
    dispatch({
      type: 'tableData/update',
      path: 'bookBuy/isHiddenAdminChange',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options } = this.state;
    const columns = [
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
        dataIndex: 'nickName'
      },
      {
        title: '图书名',
        dataIndex: 'bookName'
      },
      {
        title: '封面',
        dataIndex: 'wholePhotoPath',
        render: (text, record) => {
          if (!isEmpty(record.wholePhotoPath)) {
            return (
              <Fragment>
                <img alt="" style={{ width: 50, height: 50 }} src={record.wholePhotoPath} />
              </Fragment>
            );
          }
        }
      },
      {
        title: '图书分类',
        dataIndex: 'bookTypeName'
      },
      {
        title: '用户设置属性',
        dataIndex: 'isHiddenUser',
        render: (text, record) => (
          <Fragment>{record.isHiddenAdmin === 1 ? '私藏' : '公开'}</Fragment>
        )
      },
      {
        title: '是否屏蔽',
        dataIndex: 'isHiddenAdmin',
        render: (text, record) => <Fragment>{record.isHiddenAdmin === 1 ? '是' : '否'}</Fragment>
      },
      {
        title: '图书简介',
        dataIndex: 'bookIntro',
        render(text, record) {
          if ((text || '.').length > 25) {
            return `${text.substring(0, 25)}......`;
          }
          return text;
        }
      },
      {
        title: '图书格式',
        dataIndex: 'bookStyleName'
      },
      {
        title: '是否优质图书',
        dataIndex: 'isBookGood',
        render(text, record) {
          const dict = () => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (record.isBookGood === options[i].itemNo) {
                res = options[i].itemLabel;
                break;
              }
            }
            return res;
          };
          return <Fragment>{dict(record)}</Fragment>;
        }
      },
      {
        title: '审核时间',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a
              onClick={() =>
                record.isBookGood === 0 ? this.setUserGood(record) : this.unSetUserGood(record)
              }
            >
              {record.isBookGood === 0 ? '设置优质' : '取消优质'}
            </a>
            <Divider type="vertical" />
            <a onClick={() => this.isHiddenAdminChange(record)}>
              {record.isHiddenAdmin === 0 ? '屏蔽' : '取消屏蔽'}
            </a>
          </Fragment>
        )
      }
    ];

    const { dispatch } = this.props;
    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      dispatch
    };
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="bookId"
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
