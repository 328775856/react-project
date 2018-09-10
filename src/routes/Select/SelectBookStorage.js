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
  Table,
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateConditionForm from './SelectBookStorage_condition';
import { getUrl,postUrl } from '../../services/api';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable,
}))
@Form.create()
export default class SelectBookStorage extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
  };

  constructor(props){
    super(props);

  }

  query=(params,page)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'restTableData/list',
      path: 'bookStorage/page',
      payload: {
        data: params,
        page,
      },
    });

  }

  componentDidMount () {
    this.query({}, { pageNo: 1, pageSize: 10 });
  }

  componentDidUpdate  () {
    const {  modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    this.setState({modalVisibleTemp: modalVisible});
    if (modalVisible === true) {
      this.query({},{pageNo:1,pageSize:10});
    }
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
        ...fieldsValue,
      };
      this.setState({
        formValues: values,
      });
      this.query(values,{pageNo:1,pageSize:10});

    });
  };

  renderForm() {
    const {restTableData} = this.props;
   return CreateConditionForm(this.props,this.formSubmit,this.formReset,restTableData);

  }

  render() {

    const { restTableData,loading,callReturn,closeModal, modalVisible } = this.props;

    const columns = [
      {
        title:"系统id",
        dataIndex:"bookStorageId",
      }
      ,{
        title:"图书存放类型(字典)：0:待审核,1:流通书(上传书),2:流通书(购买书),3:不流通书",
        dataIndex:"bookStorageType",
      }
      ,{
        title:"图书格式",
        dataIndex:"bookStyleId",
      }
      ,{
        title:"存储名",
        dataIndex:"storageName",
      }
      ,{
        title:"存储地址",
        dataIndex:"storagePath",
      }
      ,{
        title:"访问url",
        dataIndex:"accessUrl",
      }
      ,{
        title:"是否已满（1是,0否,默认0）",
        dataIndex:"isFull",
      }
      ,
    ];


    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys,selectedRows)=>{
         // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
      },
      onSelect: (record, selected, selectedRows)=>{
          // console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
          callReturn(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows)=>{
           // console.log('changeRows',changeRows);   //变化的每一项

      },
       onSelectInvert: (selectedRows)=>{
          // console.log('selectedRows',selectedRows);
      },
    }

    return (
      <Modal
        title="选择图书存储"
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
            rowKey="bookStorageId"
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
