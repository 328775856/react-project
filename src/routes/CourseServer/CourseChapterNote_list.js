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
Table
} from 'antd';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from '../../assets/styles.less';
import CreateEditForm from './CourseChapterNote_edit';
import CreateFindForm from './CourseChapterNote_find';
import {defaultPage} from '../../utils/utils.js';
const FormItem = Form.Item;
@connect(({commonTableData, loading}) => ({
commonTableData,
loading: loading.models.crud,
}))
@Form.create()
export default class CourseChapterNote extends PureComponent {
state = {
modalVisible: false,
modalTitle: '',
formValues: {},
page:defaultPage(),
  paramData: {},
};

refresh = (values,page) => {
const {dispatch} = this.props;
  const { paramData } = this.state;
  let params = {
    ...paramData,
    ...values,
  };
dispatch({
type: 'commonTableData/list',
path: 'courseChapterNote/page',
payload: {
data: values,
page: page
}
});
this.setState({
modalVisible: false,
});
}

  componentDidMount() {
    const { formValues, page } = this.state;
    const { commonTableData } = this.props;
    const paramData = {
      ...commonTableData.formData,
    };
    this.setState({
      paramData: paramData,
    });
    this.refresh(paramData, page);
  }


tableChange = (pagination, filtersArg, sorter) => {
const { formValues } = this.state;
let page={
pageSize: pagination.pageSize,
pageNo: pagination.current
}
this.setState({
page: page
})
this.refresh(formValues,page);
};



formReset = () => {
const {form} = this.props;
form.resetFields();
};

callback = () => {
const {commonTableData} = this.props;
if (commonTableData.status == 200) {
const { formValues,page } = this.state;
this.refresh(formValues,page);
} else {
message.success(commonTableData.message);
}
};

remove = (record) => {
const {dispatch,commonTableData} = this.props;
const cb=this.callback;
Modal.confirm({
title: '确定删除吗?',
onOk() {
dispatch({
type: 'commonTableData/remove',
path: 'courseChapterNote/remove',
payload: {courseChapterNoteId:record.courseChapterNoteId},
callback:cb
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
...fieldsValue
};
const page=defaultPage();
this.setState({
formValues: values,
page:page
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
type: 'commonTableData/getDataForAdd',
path: 'courseChapterNote/getDataForAdd',
payload: fields,
});
this.setState({
modalTitle: '新增',
modalVisible: true,
});
};

add = fields => {
  debugger;
const {dispatch,commonTableData} = this.props;
  const { paramData } = this.state;
  let params = {
    ...fields,
    ...paramData,
  };
dispatch({
type: 'commonTableData/add',
path: 'courseChapterNote/add',
payload: params,
callback:this.callback
});
};


getDataForUpdate = (record) => {
const {dispatch} = this.props;
dispatch({
type: 'commonTableData/getDataForUpdate',
path: 'courseChapterNote/getDataForUpdate',
payload: {courseChapterNoteId:record.courseChapterNoteId},
});
this.setState({
modalTitle: '修改',
modalVisible: true,

});
};

update = fields => {
const {dispatch, commonTableData} = this.props;
  const { paramData } = this.state;
  let payload = {
    ...commonTableData.formData,
    ...fields,
    ...paramData,
  };
dispatch({
type: 'commonTableData/update',
path: 'courseChapterNote/update',
payload: payload,
callback: this.callback
});
};

  back = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonTableData/goUrl',
      path: '/courseServer/courseChapter',
      payload: {},
    });
  };

renderForm() {
return CreateFindForm(this.props, this.query, this.formReset);
}

render() {
const {
commonTableData,
loading,
} = this.props;
const {modalVisible, modalTitle} = this.state;

const columns = [
 {
     title:"系统id",
     dataIndex:"courseChapterNoteId"
  }

  ,{
     title:"笔记标题",
     dataIndex:"notesTitle"
   }
  ,{
     title:"顺序",
     dataIndex:"indexNo"
   }
,
{
title: '操作',
render: (text, record) => (
<Fragment>
    <a onClick={() => this.getDataForUpdate(record)}>修改</a>
    <Divider type="vertical"/>
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

              <Button type="default" onClick={() => this.back()}>
                返回
              </Button>
            </div>
            <Table
                    dataSource={commonTableData.pageData.list}
                    columns={columns}
                    rowKey="courseChapterNoteId"
                    pagination={commonTableData.pageData.pagination}
                    loading={loading}
                    onChange={this.tableChange}
            />
        </div>
    </Card>
    <CreateEditForm {...parentMethods} modalVisible={modalVisible} formData={commonTableData.formData} title={modalTitle}/>
</PageHeaderLayout>
);
}
}
