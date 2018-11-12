import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Card, Divider, Form, message, Modal, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './SysUser_edit';
import CreateFindForm from './SysUser_find';
import { defaultPage, formatTime } from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class SysUser extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: []
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
      type: 'tableData/add',
      path: 'user/getDataForAdd',
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
      path: 'user/getDataForUpdate',
      payload: { sysUserId: record.sysUserId }
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'user/page',
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
    this.setState({ page });
    this.refresh(formValues, page);
  };

  isEmptyObject = e => {
    let t;
    for (t in e) {
      if (Object.prototype.hasOwnProperty.call(e, t)) {
        return 1;
      } else {
        return 0;
      }
    }
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
          path: 'user/remove',
          payload: { sysUserId: record.sysUserId },
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

  add = fields => {
    const { dispatch, tableData } = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'user/add',
      payload: fields,
      callback: this.callback
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'user/getDataForAdd',
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
      path: 'user/update',
      payload,
      callback: this.callback
    });
  };

  renderForm() {
    const { options } = this.state;
    return CreateFindForm(this.props, this.query, this.formReset, this.isEmptyObject, options , this.getDataForAdd);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'sysUserId'
      },
      {
        title: '编号',
        dataIndex: 'userCode'
      },
      {
        title: '名称',
        dataIndex: 'userName'
      },
      {
        title: '是否停止',
        dataIndex: 'isStop',
        render: (text, record) => <Fragment>{record.isStop === 1 ? '是' : '否'}</Fragment>
      },
      {
        title: '备注',
        dataIndex: 'remark'
      },
      {
        title: '权限组ID',
        render(text, record) {
          const role = record => {
            let res = '';
            for (let i = 0; i < options.length; i += 1) {
              if (record.sysRoleId === options[i].sysRoleId) {
                res = options[i].roleName;
                break;
              }
            }
            return res;
          };
          return <Fragment>{role(record)}</Fragment>;
        }
      },
      {
        title: '藏书馆用户ID',
        dataIndex: 'userId'
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
      isEmptyObject: this.isEmptyObject,
      getDataForAdd: this.getDataForAdd
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
              rowKey="sysUserId"
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
      </PageHeaderLayout>
    );
  }
}
