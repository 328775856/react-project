import React, {Fragment, PureComponent} from 'react';
import {connect} from 'dva';
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
  Table,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './BookPrivate_edit';
import CreateFindForm from './BookPrivate_find';
import {defaultPage} from '../../utils/utils.js';

const FormItem = Form.Item;
@connect(({tableData, loading}) => ({
  tableData,
  loading: loading.models.crud,
}))
@Form.create()
export default class BookPrivate extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page:defaultPage(),

  };

  refresh = (values,page) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'bookPrivate/page',
      payload: {
        data: values,
        page,
      },
    });
    this.setState({
      modalVisible: false,
    });
  }

  componentDidMount() {
    const { formValues,page } = this.state;
    this.refresh(formValues,page);
  }


  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page={
      pageSize: pagination.pageSize,
      pageNo: pagination.current,
    }
    this.setState({
      page,
    })
    this.refresh(formValues,page);
  };



  formReset = () => {
    const {form} = this.props;
    form.resetFields();
  };

  callback = () => {
    const {tableData} = this.props;
    if (tableData.status == 200) {
      const { formValues,page } = this.state;
      this.refresh(formValues,page);
    } else {
      message.success(tableData.message);
    }
  };

  remove = (record) => {
    const {dispatch,tableData} = this.props;
    const cb=this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'bookPrivate/remove',
          payload: {bookId:record.bookId},
          callback:cb,
        });
      },
      onCancel() {
      },
    });
  };

  query = e => {
    e.preventDefault();
    const {dispatch, form} = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      const page=defaultPage();
      this.setState({
        formValues: values,
        page,
      });
      this.refresh(values,page);
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false,
    });
  };

  getDataForAdd = (fields) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'tableData/getDataForAdd',
      path: 'bookPrivate/getDataForAdd',
      payload: fields,
    });
    this.setState({
      modalTitle: '新增',
      modalVisible: true,
    });
  };

  add = fields => {
    const {dispatch,tableData} = this.props;
    dispatch({
      type: 'tableData/add',
      path: 'bookPrivate/add',
      payload: fields,
      callback:this.callback,
    });
  };


  getDataForUpdate = (record) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'bookPrivate/getDataForUpdate',
      payload: {bookId:record.bookId},
    });
    this.setState({
      modalTitle: '修改',
      modalVisible: true,

    });
  };

  update = fields => {
    const {dispatch, tableData} = this.props;
    const payload={
      ...tableData.formData,
      ...fields,
    }
    dispatch({
      type: 'tableData/update',
      path: 'bookPrivate/update',
      payload,
      callback: this.callback,
    });
  };


  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset);
  }

  render() {
    const {
      tableData,
      loading,
    } = this.props;
    const {modalVisible, modalTitle} = this.state;

    const columns = [
      {
        title:"系统id",
        dataIndex:"bookId",
      }
      ,{
        title:"图书编号",
        dataIndex:"bookCode",
      }
      ,{
        title:"图书名",
        dataIndex:"bookName",
      }
      ,{
        title:"图书属性",
        dataIndex:"bookPropName",
      }
      ,{
        title:"图书分类",
        dataIndex:"bookTypeName",
      }
      ,{
        title:"图书格式",
        dataIndex:"bookStyleName",
      }
      ,{
        title:"封面路径",
        dataIndex:"wholePhotoPath",
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 100, height: 100 }} src={record.wholePhotoPath} />
          </Fragment>
        ),
      }
      ,{
        title:"作者",
        dataIndex:"bookAuthor",
      }
      ,{
        title:"存储名",
        dataIndex:"bookStorageName",
      }
      ,{
        title:"存储文件名",
        dataIndex:"fileName",
      }
      ,{
        title:"资源大小",
        dataIndex:"fileSize",
      }
      ,
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>修改</a>
            <Divider type="vertical" />
            <a onClick={() => this.remove(record)}>删除</a>
          </Fragment>
        ),
      },
    ];


    const parentMethods = {
      add: this.add,
      update: this.update,
      closeModal: this.closeModal,
      dispatch: this.props.dispatch,
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
              rowKey="bookId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm {...parentMethods} modalVisible={modalVisible} formData={tableData.formData} title={modalTitle} />
      </PageHeaderLayout>
    );
  }
}
