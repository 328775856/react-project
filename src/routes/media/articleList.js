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
import CreateEditForm from './articleEdit';
import CreateFindForm from './articleFind';
import {defaultPage} from '../../utils/utils.js';
import Ueditor from '../../components/Ueditor/Ueditor';
const FormItem = Form.Item;
@connect(({restTableData, loading}) => ({
restTableData,
loading: loading.models.crud,
}))
@Form.create()
export default class MediaArticle extends PureComponent {
state = {
modalVisible: false,
modalTitle: '',
formValues: {},
page:defaultPage()

};

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
refresh = (values,page) => {
const {dispatch} = this.props;
dispatch({
type: 'restTableData/list',
path: 'media/article/page',
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
const { formValues,page } = this.state;
this.initGroup();
this.refresh(formValues,page);
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
const {restTableData} = this.props;
if (restTableData.status == 200) {
const { formValues,page } = this.state;
this.refresh(formValues,page);
} else {
message.success(restTableData.message);
}
};

delete = (record) => {
const {dispatch,restTableData} = this.props;
const cb=this.callback;
Modal.confirm({
title: '确定删除吗?',
onOk() {
dispatch({
type: 'restTableData/delete',
path: 'media/article',
payload: {mediaArticleId:record.mediaArticleId},
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
type: 'restTableData/getDataForAdd',
path: 'media/article/getDataForAdd',
payload: fields,
});
this.setState({
modalTitle: '新增',
modalVisible: true,
});
};

add = fields => {
const {dispatch,restTableData} = this.props;
dispatch({
type: 'restTableData/add',
path: 'media/article',
payload: fields,
callback:this.callback
});
};


getDataForUpdate = (record) => {
const {dispatch} = this.props;
dispatch({
type: 'restTableData/getDataForUpdate',
path: 'media/article/getDataForUpdate',
payload: {mediaArticleId:record.mediaArticleId},
});
this.setState({
modalTitle: '修改',
modalVisible: true,

});
};

update = fields => {
const {dispatch, restTableData} = this.props;
let payload={
...restTableData.formData,
...fields
}
dispatch({
type: 'restTableData/update',
path: 'media/article',
payload: payload,
callback: this.callback
});
};


renderForm() {
const {restTableData} = this.props;
return CreateFindForm(this.props, this.query, this.formReset, restTableData.articleGroup);
}

render() {
const {
restTableData,
loading,
} = this.props;
const {modalVisible, modalTitle} = this.state;

const columns = [
 {
     title:"系统id",
     dataIndex:"mediaArticleId"
  }
  ,{
     title:"分组ID",
     dataIndex:"mediaArticleGroupId"
   }
  ,{
     title:"标题",
     dataIndex:"articleTitle"
   }
  ,{
     title:"作者",
     dataIndex:"articleAuthor"
   }
,
{
title: '操作',
render: (text, record) => (
<Fragment>
    <a onClick={() => this.getDataForUpdate(record)}>修改</a>
    <Divider type="vertical"/>
    <a onClick={() => this.delete(record)}>删除</a>
</Fragment>
),
},
];


const parentMethods = {
add: this.add,
update: this.update,
closeModal: this.closeModal,
isEmptyObject : this.isEmptyObject,
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
                    dataSource={restTableData.pageData.list}
                    columns={columns}
                    rowKey="mediaArticleId"
                    pagination={restTableData.pageData.pagination}
                    loading={loading}
                    onChange={this.tableChange}
            />
        </div>
    </Card>
    <CreateEditForm {...parentMethods} modalVisible={modalVisible} formData={restTableData.formData} title={modalTitle} Ueditor={Ueditor} articleGroup={restTableData.articleGroup} />
</PageHeaderLayout>
);
}
}
