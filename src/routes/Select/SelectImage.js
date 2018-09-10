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
import CreateConditionForm from './SelectImage_condition';
import { getUrl,postUrl } from '../../services/api';

@connect(({ selectData, loading }) => ({
  selectData,
  loading: loading.models.selectTable,
}))
@Form.create()
export default class SelectImage extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
  };
  constructor(props){
    super(props);

  }
  init= () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectData/init',
      path: 'media/imageGroup/getGroupPage',
      payload: {
        data: {},
        page: {
          pageSize:100,
          pageNo:1
        },
      },
    });
  }
  query=(params,page)=>{
    const { dispatch } = this.props;
    dispatch({
      type: 'selectData/query',
      path: 'media/image/getImagePage',
      payload: {
        data: params,
        page:page
      },
    });

  }

componentDidMount() {
  this.init();
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

  renderForm(groupList) {
   if(groupList==null || groupList==undefined ||  groupList.constructor != Array){
     return ;
   }
   return CreateConditionForm(this.props,this.formSubmit,this.formReset,groupList);

  }

  render() {

    const { selectData:{pageData},selectData:{formData},callReturn,closeModal, modalVisible } = this.props;

    const columns = [
      {
        title: '分组名称',
        dataIndex: 'mediaImageGroupName',
      },
       {
        title: '图片名称',
        dataIndex: 'imageName',
      },
      {
        title: '缩略图',
        dataIndex: 'imagePath',
        render: (text, record) => (
         <Fragment>
            <img alt="" style={{width:100,height:100}} src={record.domain}  />
         </Fragment>
        ),
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
      title="选择图片"
      visible={modalVisible}
      width={650}
      onOk={closeModal}
      onCancel={() => closeModal()}
      >

          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm(formData.rows)}</div>
            <Table
              dataSource={pageData.list}
              columns={columns}
              pagination={pageData.pagination}
              onChange={this.tableChange}
              rowSelection={rowSelection}
              rowKey="createTime"
             />
          </div>

      </Modal>
    );
  }
}
