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
import styles from '../../assets/styles.less';
import CreateConditionForm from './SelectCourseInfo_condition';

const FormItem = Form.Item;

@connect(({ restTableData, loading }) => ({
  restTableData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectCourseInfo extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: false
  };

  constructor(props) {
    super(props);
  }

  query = (params, page) => {
    const { dispatch, courseId } = this.props;
    this.setState({ courseId: courseId });
    dispatch({
      type: 'restTableData/list',
      path: 'courseInfo/page',
      payload: {
        data: params,
        page
      }
    });
  };

  // componentDidMount() {
  //   this.query({}, { pageNo: 1, pageSize: 10 });
  // }

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    if (modalVisible === true) {
      const { restTableData } = this.props;
      restTableData.pageData.list = '';
      this.init();
    }
    this.setState({ modalVisibleTemp: modalVisible });
  }

  init = () => {
    this.query({}, { pageNo: 1, pageSize: 10 });
  };

  tableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state;
    const page = {
      pageNo: pagination.current,
      pageSize: pagination.pageSize
    };
    this.query(formValues, page);
  };

  formReset = () => {
    const { form } = this.props;
    form.resetFields();
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
      this.query(values, { pageNo: 1, pageSize: 10 });
    });
  };

  renderForm() {
    return CreateConditionForm(this.props, this.formSubmit, this.formReset);
  }

  render() {
    const { restTableData, callReturn, closeModal, modalVisible, form } = this.props;

    const { selectedRows } = this.state;

    const okHandle = () => {
      if (selectedRows.length < 1) {
        message.success('请选择一条数据');
      } else {
        callReturn(selectedRows);
      }
    };

    const cancelHandle = () => {
      form.resetFields();
      closeModal();
    };

    const columns = [
      {
        title: '系统id',
        dataIndex: 'courseId'
      },

      {
        title: '课程名称',
        dataIndex: 'courseName'
      },
      {
        title: '课程封面',
        dataIndex: 'wholeCoverPath',
        render: (text, record) => (
          <Fragment>
            <img alt="" style={{ width: 50, height: 50 }} src={record.wholeCoverPath} />
          </Fragment>
        )
      },

      {
        title: '价格',
        dataIndex: 'upCourse'
      },
      {
        title: '上架状态',
        dataIndex: 'shelfStatus',
        render: (text, record) => (
          <Fragment>
            {record.shelfStatus === 1 ? '上架' : record.shelfStatus === 0 ? '未上架' : '已下架'}
          </Fragment>
        )
      },
      {
        title: '是否首页推荐',
        dataIndex: 'isRecommend',
        render: (text, record) => <Fragment>{record.isRecommend === 1 ? '是' : '否'}</Fragment>
      }
    ];

    const rowSelection = {
      type: 'radio',
      hideDefaultSelections: 'true',
      onChange: (selectedRowKeys, selectedRows) => {
        // console.log('selectedRows',selectedRows);//得到每一项的信息，也就是每一项的信息[{key: 1, name: "花骨朵", age: 18, hobby: "看书"}]
        console.log(selectedRows[0].courseId);
        this.setState({ courseId: selectedRows[0].courseId });
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
        // callReturn(selectedRows);
        this.onRowClick(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log('changeRows',changeRows);   //变化的每一项
      },
      onSelectInvert: selectedRows => {
        // console.log('selectedRows',selectedRows);
      },
      getCheckboxProps: record => {
        const { courseId } = this.state;
        return {
          checked: record.courseId === courseId
        };
      }
    };

    return (
      <Modal
        title="选择标签"
        visible={modalVisible}
        width={650}
        onOk={okHandle}
        onCancel={cancelHandle}
      >
        <div className={styles.tableList}>
          <div className={styles.tableListForm}>{this.renderForm()}</div>
          <Table
            dataSource={restTableData.pageData.list}
            columns={columns}
            pagination={restTableData.pageData.pagination}
            onChange={this.tableChange}
            rowSelection={rowSelection}
            rowKey="courseId"
          />
        </div>
      </Modal>
    );
  }
}
