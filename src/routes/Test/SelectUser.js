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
import CreateConditionForm from './SelectUser_condition';
import { getUrl, postUrl } from '../../services/api';

const FormItem = Form.Item;

@connect(({ selectData, loading }) => ({
  selectData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectUser extends React.Component {
  state = {
    selectedRows: [],
    formValues: {}
  };

  constructor(props) {
    super(props);
  }

  init = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectData/init',
      path: 'api/select/getDeptList',
      payload: {}
    });
  };

  query = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectData/query',
      path: 'api/select/getUserList',
      payload: params
    });
  };

  componentDidMount() {
    this.init();
    this.query({});
  }

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues
    };
    this.query(params);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {}
    });
    this.query({});
  };

  onRowClick = row => {
    this.setState({
      selectedRows: row
    });
  };

  formSubmit = e => {
    e.preventDefault();
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue
      };
      this.setState({
        formValues: values
      });
      this.query(values);
    });
  };

  renderForm(deptList) {
    if (deptList == null || deptList == undefined || deptList.constructor != Array) {
      return;
    }
    return CreateConditionForm(this.props, this.formSubmit, this.formReset, deptList);
  }

  render() {
    const {
      selectData: { pageData },
      selectData: { formData },
      callReturn,
      closeModal,
      modalVisible
    } = this.props;

    const columns = [
      {
        title: '系统ID',
        dataIndex: 'key'
      },
      {
        title: '编号',
        dataIndex: 'code'
      },
      {
        title: '名称',
        dataIndex: 'name'
      },
      {
        title: '部门',
        dataIndex: 'dept'
      },
      {
        title: '备注',
        dataIndex: 'memo'
      }
    ];

    const rowSelection = {
      // 注意这里的radio需要加上引号。
      type: 'radio',
      // 去掉全选和反选两个默认选项，暂时不起作用，不知道为什么
      // 现在可以了，因为给false没加引号的缘故。
      hideDefaultSelections: 'true',
      // 选择框的默认属性配置
      getCheckboxProps: record => ({
        // 禁止掉的就是Disabled User这一项，也就是不能点
        // disabled : record.name === 'Disabled User',
      }),
      // 在这个里面我们将会得到什么信息呢？
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRowKeys',selectedRowKeys); //得到每一项下标的信息[1],是一个数组，选一项数组中就有一项，选多项就有多项。
        // 如果选中一项就是[{}],选中多项就是[{},{},{}]
        console.log('selectedRows', selectedRows); // 得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
      },
      // onSelect 用户手动选择／取消选择 某列的回调。
      onSelect: (record, selected, selectedRows) => {
        // console.log('record',record); //选中的每行，是一个对象
        // console.log('seleted',selected); //true或者false
        console.log('selectedRows', selectedRows); // 选中的每行信息，是一个数组
        callReturn(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log('是否全选');
        // console.log('selected',selected); //是否选中
        // console.log('selectedRows',selectedRows); //选中的每一项
        console.log('changeRows', changeRows); // 变化的每一项
      },
      // 用户手动选择反选的回调
      onSelectInvert: selectedRows => {
        console.log('selectedRows', selectedRows);
      }
    };

    return (
      <Modal
        title="选择用户"
        visible={modalVisible}
        width={650}
        onOk={closeModal}
        onCancel={() => closeModal()}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm(formData)}</div>
          <Table
            dataSource={pageData.list}
            columns={columns}
            pagination={pageData.pagination}
            onChange={this.tableChange}
            rowSelection={rowSelection}
          />
        </div>
      </Modal>
    );
  }
}
