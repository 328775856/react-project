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
import CreateConditionForm from './SelectCourseInfo_condition';
import { getUrl, postUrl } from '../../services/api';

const FormItem = Form.Item;

@connect(({ selectData, loading }) => ({
  selectData,
  loading: loading.models.selectTable
}))
@Form.create()
export default class SelectCourseInfo extends React.Component {
  state = {
    selectedRows: [],
    formValues: {},
    modalVisibleTemp: true
  };

  constructor(props) {
    super(props);
  }

  query = (params, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'selectData/query',
      path: 'courseInfo/page',
      payload: {
        data: params,
        page
      }
    });
  };

  componentDidMount() {
    this.query({}, { pageNo: 1, pageSize: 10 });
  }

  componentDidUpdate() {
    const { modalVisible } = this.props;
    if (modalVisible === this.state.modalVisibleTemp) {
      return;
    }
    this.setState({ modalVisibleTemp: modalVisible });
    if (modalVisible === true) {
      this.init();
    }
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

  renderForm(groupList) {
    return CreateConditionForm(this.props, this.formSubmit, this.formReset);
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
            <img
              alt=""
              style={{ width: 100, height: 100 }}
              src={record.wholeCoverPath}
            />
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
      },
      onSelect: (record, selected, selectedRows) => {
        // console.log('selectedRows',selectedRows); //选中的每行信息，是一个数组
        callReturn(selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        // console.log('changeRows',changeRows);   //变化的每一项
      },
      onSelectInvert: selectedRows => {
        // console.log('selectedRows',selectedRows);
      }
    };

    return (
      <Modal
        title="选择标签"
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