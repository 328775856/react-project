/* eslint-disable vars-on-top */
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
import CreateEditForm from './UserAdvise_edit';
import CreateFindForm from './UserAdvise_find';
import { defaultPage, formatTime } from '../../utils/utils.js';
import CreateHandleForm from './UserAdvise_handle';
import { isEmpty } from '../../utils/utils';

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
      path: 'userAdvise/page',
      payload: {
        data: values,
        page
      }
    });
    this.closeModal();
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
      this.closeModal();
    }
  };

  initOptionsCallback = response => {
    this.setState({
      options: JSON.parse(response.data)
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
      path: 'userAdvise/getDataForAdd',
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
      path: 'userAdvise/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'userAdvise/getDataForUpdate',
      payload: { userAdviseId: record.userAdviseId }
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
      path: 'userAdvise/getDataForUpdate',
      payload: { userAdviseId: record.userAdviseId }
    });
    this.setState({
      modalHandleTitle: '吐槽处理',
      modalHandleVisible: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'userAdvise/getDataForAdd',
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
      path: 'userAdvise/update',
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
        title: '昵称',
        dataIndex: 'nickname',
        width: '10%'
      },
      {
        title: '吐槽内容',
        dataIndex: 'adviceContent',
        render(text, record) {
          if ((text || '.').length > 25) {
            return `${text.substring(0, 25)}......`;
          }
          return text;
        }
      },
      {
        title: '吐槽图片',
        dataIndex: 'wholeAdvicePic',
        width: '20%',
        render(text, record) {
          return (
            <Fragment>
              {(text || '')
                .split(',')
                .map(list => (
                  <img alt="" key={text} style={{ width: 50, height: 50 }} src={list} />
                ))}
            </Fragment>
          );
        }
      },
      {
        title: '处理状态',
        dataIndex: 'dealStatus',
        render(text, record) {
          var dict = record => {
            var res = '';
            var myArray = options['5'];
            for (var k in myArray) {
              if (record.dealStatus === myArray[k].itemNo) {
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
        title: '处理时间',
        dataIndex: 'dealTime',
        render(text, record) {
          return <Fragment>{text === 0 ? '暂无处理时间' : formatTime(text)}</Fragment>;
        }
      },
      {
        title: '处理内容',
        dataIndex: 'dealContent',
        render(text, record) {
          return <Fragment>{text === ' ' ? '暂无处理内容' : text}</Fragment>;
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
              rowKey="userAdviseId"
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
