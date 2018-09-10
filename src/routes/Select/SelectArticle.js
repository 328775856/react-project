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
  Table
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
const FormItem = Form.Item;
import CreateConditionForm from './SelectArticle_condition';
import { getUrl,postUrl } from '../../services/api';

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable,
}))
@Form.create()
export default class SelectArticle extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: true,
  };
  constructor(props){
    super(props);

  }

  initGroup = () => {
    const { dispatch } = this.props;
    dispatch({
        type: 'restTableData/initOptionElement',
        path:'media/articleGroup/page',
        payload:{
            data: {},
            page: {
                pageNo: 1,
                pageSize: 1000
            },
        },
        option: {
            optionKey: 'articleGroup',
            key: 'mediaArticleGroupId',
            value: 'groupName'
        },
    });
  }

  query=(params,page)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'media/article/page',
      payload: {
        data: params,
        page:page
      },
    });

  }

  componentDidMount () {
    this.init();
  }
  componentDidUpdate  () {
    const {  modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    this.setState({modalVisibleTemp: modalVisible});
    if (modalVisible === true) {
      this.init();
    }
  }
 
 init = () => {
  this.initGroup();
  this.query({},{pageNo:1,pageSize:10});
 }
  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    };
    this.query(formValues,page);
  };

  formReset = () => {
    const { form} = this.props;
    form.resetFields();

  };
  onRowClick = row => {
    this.setState({
      selectedRows: row,
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const {  form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue
      };
      this.setState({
        formValues: values,
      });
      this.query(values,{pageNo:1,pageSize:10});

    });
  };

  renderForm() {
    const {restTableData} = this.props;
   return CreateConditionForm(this.props,this.formSubmit,this.formReset,restTableData.articleGroup);

  }

  render() {

    const { restTableData,formData,loading,callReturn,closeModal, modalVisible } = this.props;

    const columns = [
      {
        title: '分组名称',
        dataIndex: 'mediaArticleGroupName',
      },
       {
        title: '图文标题',
        dataIndex: 'articleTitle',
      },
      {
        title: '图文描述',
        dataIndex: 'articleDesc',
      },
      {
        title: '上传时间',
        dataIndex: 'createTime',
      },
    ];


    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys,selectedRows)=>{
         //console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
      },
      onSelect: (record, selected, selectedRows)=>{
          //console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
          callReturn(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows)=>{
           //console.log('changeRows',changeRows);   //变化的每一项

      },
       onSelectInvert: (selectedRows)=>{
          //console.log('selectedRows',selectedRows);
      },
    }

    return (
      <Modal
      title="选择图文"
      visible={modalVisible}
      width={650}
      onOk={closeModal}
      onCancel={() => closeModal()}
      >

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <Table
              dataSource={restTableData.pageData.list}
              columns={columns}
              rowKey="mediaArticleId"
              pagination={restTableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
              rowSelection={rowSelection}
             />
          </div>

      </Modal>
    );
  }
}
