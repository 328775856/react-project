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
import CreateEditForm from './Crud_edit';
import CreateFindForm from './Crud_find';


@connect(({ crud, loading }) => ({
  crud,
  loading: loading.models.crud,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle:'',
    selectedRows: [],
    formValues: {},
  };
  refresh() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path:'api/crud/list',
      payload:{
        pageNumber:1,
        pageSize:10
      }
    });
    this.setState({
      modalVisible: false,
    });
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/list',
      path:'api/crud/list',
      payload:{
        pageNumber:1,
        pageSize:10
      }
    });
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues
    };
    dispatch({
      type: 'crud/list',
      path:'api/crud/list',
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
      path:'api/crud/list',
      payload: {},
    });
  };
  batchDelete = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;
    if(selectedRows.length==0){
      message.error("请选择记录");
      return;
    }
    Modal.confirm({
      title: '确定批量审核吗?',
      onOk() {
        dispatch({
          type: 'crud/batchDelete',
          path:'api/crud/batchDelete',
          payload: {
            key: selectedRows.map(row => row.key).join(',')
          },
        });
        message.success('批量审核成功');
        dispatch({
          type: 'crud/list',
          path:'api/crud/list',
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
        ...fieldsValue
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'api/crud/list',
        path:'api/crud/list',
        payload: values,
      });
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };
  add = (fields) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/add',
      path:'api/crud/add',
      payload: fields,
    });
    this.setState({
      modalTitle: '新增Demo',
      modalVisible: true,
    });
  };

  addSave = fields => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/addSave',
      path:'api/crud/addSave',
      payload: fields,
    });
    message.success('保存成功');
    this.refresh();
    

  };
  
 

  update = (record) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'crud/update',
      path:'api/crud/update',
      payload: {key:record.key},
    });
    this.setState({
      modalTitle: '修改Demo',
      modalVisible: true,
     
    });
  };

  updateSave = fields => {
    const { dispatch,formData } = this.props;
    dispatch({
      type: 'crud/updateSave',
      path:'api/crud/updateSave',
      payload: fields,
    });
    message.success('修改保存成功');
    this.refresh();
  };


  renderForm() {
    return CreateFindForm(this.props,this.query,this.formReset);
  }

  render() {
    const {
      crud:{pageData},
      crud:{formData},
      loading,
    } = this.props;
    const { selectedRows, modalVisible,modalTitle } = this.state;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'key',
      },
      {
        title: '编号',
        dataIndex: 'code',
      },
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '备注',
        dataIndex: 'memo',
      },
      {
        title: '操作',
        render: (text,record) => (
          <Fragment>
            <a onClick={() => this.update(record)} >修改-{record.key}</a>
            <Divider type="vertical" />
            <a href="">删除</a>
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
              <Button  type="primary" onClick={() => this.add()}>
                新建
              </Button>
              <Button  type="primary" onClick={() => this.batchDelete()}>
                审核
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
        <CreateEditForm {...parentMethods} modalVisible={modalVisible}  formData={formData} title={modalTitle} />
      </PageHeaderLayout>
    );
  }
}
