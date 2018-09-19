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
  Divider
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './GateClientService_edit';
import CreateFindForm from './GateClientService_find';

const FormItem = Form.Item;

@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    selectedRows: [],
    formValues: {},
    gateClientOptions: {}
  };

  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path: 'gateClientService/getGateClientServicePage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10
        }
      }
    });
    this.setState({
      modalVisible: false
    });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path: 'gateClientService/getGateClientServicePage',
      payload: {
        page: {
          pageNo: 1,
          pageSize: 10
        }
      }
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      page: {
        pageNo: pagination.current,
        pageSize: pagination.pageSize
      },
      ...formValues
    };
    dispatch({
      type: 'crud/list',
      path: 'gateClientService/getGateClientServicePage',
      payload: params
    });
  };

  formReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    console.log('000000000000000');
    dispatch({
      type: 'crud/list',
      path: 'gateClientService/getGateClientServicePage',
      payload: {}
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
            key: selectedRows.map(row => row.key).join(',')
          }
        });
        message.success('批量审核成功');
        dispatch({
          type: 'crud/list',
          path: 'gateClientService/getGateClientServicePage',
          payload: {}
        });
      },
      onCancel() {}
    });
  };

  selectRows = rows => {
    this.setState({
      selectedRows: rows
    });
  };

  query = e => {
    console.log(1111111111111111111);
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        data: {
          ...fieldsValue
        },
        page: {
          pageNo: 1,
          pageSize: 10
        }
      };

      this.setState({
        formValues: values
      });

      dispatch({
        type: 'crud/list',
        path: 'gateClientService/getGateClientServicePage',
        payload: values
      });
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  add = () => {
    debugger;
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/selectOld',
      path: 'gateClient/genGateClientOptions',
      payload: {}
    });
    this.setState({
      modalTitle: '新增服务管理',
      modalVisible: true
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/addSave',
      path: 'gateClientService/addGateClientService',
      payload: fields
    });
    message.success('保存成功');
    this.refresh();
  };

  update = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/selectOld',
      path: 'gateClient/genGateClientOptions',
      payload: {}
    });
    dispatch({
      type: 'crud/update',
      path: 'gateClientService/getGateClientService',
      payload: { id: record.id }
    });
    this.setState({
      modalTitle: '修改服务管理',
      modalVisible: true
    });
  };

  updateSave = fields => {
    const { dispatch, formData } = this.props;
    dispatch({
      type: 'crud/updateSave',
      path: 'gateClientService/updateGateClientService',
      payload: fields
    });
    message.success('修改保存成功');
    this.refresh();
  };

  delete = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/delete',
      path: 'gateClientService/deleteGateClientService',
      payload: { id: record.id }
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
      crud: { gateClientOptions },
      loading
    } = this.props;
    const { selectedRows, modalVisible, modalTitle } = this.state;

    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: 'serviceId',
        dataIndex: 'serviceId'
      },
      {
        title: 'clientId',
        dataIndex: 'clientId'
      },
      {
        title: 'description',
        dataIndex: 'description'
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.update(record)}>修改-{record.key}</a>
            <Divider type="vertical" />
            <a onClick={() => this.delete(record)}>删除-{record.key}</a>
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
              <Button
                type="primary"
                onClick={() => this.add()}
              >
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
          gateClientOptions={gateClientOptions}
        />
      </PageHeaderLayout>
    );
  }
}
