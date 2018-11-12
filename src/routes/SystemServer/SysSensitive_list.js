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
import CreateEditForm from './SysSensitive_edit';
import CreateFindForm from './SysSensitive_find';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class SysSensitive extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {}
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'sysSensitive/page',
      payload: {
        data: values,
        page
      }
    });
    console.log(this.state);
    this.setState({
      modalVisible: false
    });
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
    if (tableData.status == 200) {
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
          path: 'sysSensitive/remove',
          payload: { sysSensitiveId: record.sysSensitiveId },
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
      type: 'tableData/clear',
      payload: {}
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
      path: 'sysSensitive/add',
      payload: fields,
      callback: this.callback
    });
  };

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'sysSensitive/getDataForUpdate',
      payload: { sysSensitiveId: record.sysSensitiveId }
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
      path: 'sysSensitive/getDataForAdd',
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
      path: 'sysSensitive/update',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.isEmptyObject, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options } = this.state;

    const isTrue = {
      1: '是',
      0: '否'
    };

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'sysSensitiveId'
      },
      {
        title: '敏感词分类',
        render(text, record) {
          const sysSensitiveType = record => {
            let res = '';
            for (let i = 0; i < options.length; i++) {
              if (record.sysSensitiveTypeId === options[i].sensitiveTypeId) {
                res = options[i].typeName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{sysSensitiveType(record)}</Fragment>;
        }
      },
      {
        title: '敏感词',
        dataIndex: 'sensitiveName'
      },
      {
        title: '处理方式',
        render: (text, record) => (
          <Fragment>{record.dealWay === 1 ? '替换处理' : '禁止传播'}</Fragment>
        ),
        dataIndex: 'dealWay'
      },
      {
        title: '是否停用',
        render: (text, record) => <Fragment>{record.isStop === 1 ? '是' : '否'}</Fragment>,
        dataIndex: 'isStop'
      },
      {
        title: '是否在书名中使用',
        render: (text, record) => <Fragment>{record.isBookScope === 1 ? '是' : '否'}</Fragment>,
        dataIndex: 'isBookScope'
      },
      {
        title: '是否在话题中使用',
        render: (text, record) => <Fragment>{record.isTopicScope === 1 ? '是' : '否'}</Fragment>,
        dataIndex: 'isTopicScope'
      },
      {
        title: '是否在呢称中使用',
        render: (text, record) => <Fragment>{record.isNicknameScope === 1 ? '是' : '否'}</Fragment>,
        dataIndex: 'isNicknameScope'
      },
      {
        title: '替换值',
        dataIndex: 'replaceValue'
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
      closeModal: this.closeModal,
      isEmptyObject: this.isEmptyObject
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
              rowKey="sysSensitiveId"
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
          state={this.state}
        />
      </PageHeaderLayout>
    );
  }
}
