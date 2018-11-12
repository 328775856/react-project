import React, { Fragment, PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Form, Modal, message, Table } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './OrderInfo_edit';
import CreateFindForm from './OrderInfo_find';
import { defaultPage, formatTime } from '../../utils/utils.js';

@connect(({ tableData, loading }) => ({
  tableData,
  loading: loading.models.crud
}))
@Form.create()
export default class OrderInfo extends PureComponent {
  state = {
    modalVisible: false,
    modalTitle: '',
    formValues: {},
    page: defaultPage(),
    options: {}
  };

  componentWillMount() {
    const { tableData } = this.props;
    tableData.pageData.list = '';
  }

  componentDidMount() {
    const { formValues, page } = this.state;
    this.initOptions();
    this.refresh(formValues, page);
  }

  getDataForUpdate = record => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/getDataForUpdate',
      path: 'orderInfo/orderDetail',
      payload: { orderId: record.orderId }
    });
    this.setState({
      modalTitle: '详情',
      modalVisible: true,
      isEdit: true
    });
  };

  initOptions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/initOptions',
      path: 'orderInfo/getOptions',
      payload: {},
      callback: response => {
        this.setState({
          options: JSON.parse(response.data)
        });
      }
    });
  };

  refresh = (values, page) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tableData/list',
      path: 'orderInfo/orderList',
      payload: {
        data: values,
        page
      }
    });
    this.setState({
      modalVisible: false
    });
  };

  tableChange = pagination => {
    const { formValues } = this.state;
    const page = {
      pageSize: pagination.pageSize,
      pageNo: pagination.current
    };
    this.setState({
      page
    });
    this.refresh(formValues, page);
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

  remove = record => {
    const { dispatch } = this.props;
    const cb = this.callback;
    Modal.confirm({
      title: '确定删除吗?',
      onOk() {
        dispatch({
          type: 'tableData/remove',
          path: 'orderInfo/remove',
          payload: { orderId: record.orderId },
          callback: cb
        });
      },
      onCancel() {}
    });
  };

  query = e => {
    e.preventDefault();
    const { form } = this.props;
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

  renderForm() {
    return CreateFindForm(this.props, this.query, this.formReset, this.state);
  }

  render() {
    const { tableData, loading } = this.props;
    const { modalVisible, modalTitle, options } = this.state;

    const columns = [
      {
        title: '订单编号',
        dataIndex: 'sn'
      },
      {
        title: '商品名称',
        dataIndex: 'productName'
      },
      {
        title: '商品类型',
        dataIndex: 'productTypeName'
      },
      {
        title: '商品价格',
        dataIndex: 'upProduct'
      },
      {
        title: '购买人昵称',
        dataIndex: 'nickname'
      },
      {
        title: '支付渠道',
        dataIndex: 'payType',
        render(text, record) {
          const { payType } = record;
          let str = '';
          if (payType === 0) {
            str = '苹果余额';
          } else if (payType === 1) {
            str = '微信支付';
          } else if (payType === 2) {
            str = '支付宝支付';
          } else if (payType === 3) {
            str = '苹果支付';
          } else if (payType === 4) {
            str = '微信h5支付';
          }
          return <Fragment>{str}</Fragment>;
        }
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        render(text, record) {
          const { orderStatus } = record;
          let str = '';
          if (orderStatus === 0) {
            str = '待支付';
          } else if (orderStatus === 1) {
            str = '订单超时';
          } else if (orderStatus === 2) {
            str = '交易成功';
          }
          return <Fragment>{str}</Fragment>;
        }
      },
      {
        title: '实收金额',
        dataIndex: 'amtFact'
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '支付时间',
        dataIndex: 'payDateTime',
        render: (text, record) => <Fragment>{formatTime(text)}</Fragment>
      },
      {
        title: '操作',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.getDataForUpdate(record)}>详情</a>
          </Fragment>
        )
      }
    ];

    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator} />
            <Table
              dataSource={tableData.pageData.list}
              columns={columns}
              rowKey="orderId"
              pagination={tableData.pageData.pagination}
              loading={loading}
              onChange={this.tableChange}
            />
          </div>
        </Card>
        <CreateEditForm
          closeModal={this.closeModal}
          modalVisible={modalVisible}
          formData={tableData.formData}
          title={modalTitle}
          options={options}
        />
      </PageHeaderLayout>
    );
  }
}
