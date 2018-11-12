import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '工作台',
    icon: 'dashboard',
    path: 'dashboard',
    children: [{ name: '欢迎页', path: 'workplace' }]
  },
  // {
  //   name: '媒体管理',
  //   icon: 'table',
  //   path: 'media',
  //   children: [
  //     { name: '图片分组管理', path: 'imageGroup' },
  //     { name: '图片管理', path: 'image' },
  //     { name: '视频分组管理', path: 'videoGroup' },
  //     { name: '视频管理', path: 'video' },
  //     { name: '音频分组管理', path: 'audioGroup' },
  //     { name: '音频管理', path: 'audio' },
  //     { name: '图文分组管理', path: 'articleGroup' },
  //     { name: '图文管理', path: 'article' }
  //   ]
  // },
  {
    name: '图书管理',
    icon: 'table',
    path: 'bookServer',
    children: [
      { name: '上传图书', path: 'bookShare' },
      { name: '发行图书', path: 'bookBuy' },
      { name: '图书格式', path: 'bookStyle' },
      { name: '图书属性', path: 'bookProp' },
      { name: '图书分类', path: 'bookType' },
      { name: '图书存储', path: 'bookStorage' },
      { name: '初始化MongoDB', path: 'initHistoryUploadBookMongo' }
      /* { name: '优质图书', path: 'bookUserGood' }, */

      /* { name: '私有图书', path: 'bookPrivate' }, */
      /* { name: '笔记', path: 'bookReadnote' }, */
    ]
  },
  {
    name: '用户管理',
    icon: 'table',
    path: 'userServer',
    children: [
      { name: '用户反馈', path: 'userFeedback' },
      { name: '用户类型', path: 'userType' },
      { name: '用户吐槽', path: 'userAdvise' },
      { name: '用户信息', path: 'userInfo' }
    ]
  },
  {
    name: '审核管理',
    icon: 'table',
    path: 'uploadbookServer',
    children: [
      { name: '待审核图书', path: 'uploadBook' },
      { name: '审核不通过图书', path: 'uploadBookUnPassed' }
    ]
  },
  {
    name: '订单管理',
    icon: 'table',
    path: 'orderServer',
    children: [
      { name: '产品类型', path: 'orderProductType' },
      { name: '产品管理', path: 'orderProduct' },
      { name: '订单列表', path: 'orderInfo' }
    ]
  },
  {
    name: '课程管理',
    icon: 'table',
    path: 'courseServer',
    children: [
      { name: '作者管理', path: 'courseAuthor' },
      { name: '专栏管理', path: 'courseColumn' },
      { name: '标签管理', path: 'courseTag' },
      { name: '课程管理', path: 'courseInfo' },
      { name: '章节管理', path: 'courseChapter' }
    ]
  },
  {
    name: 'VIP管理',
    icon: 'table',
    path: 'vipServer',
    children: [
      { name: 'VIP课程', path: 'vipCourse' },
      { name: 'VIP试听课程', path: 'vipCourseDemo' },
      { name: 'VIP包', path: 'vipPackage' },
      { name: 'VIP课程分类', path: 'vipCourseType' },
      { name: '权益管理', path: 'priFunction' },
      { name: '权益包', path: 'priPackage' }
    ]
  },
  {
    name: '找书频道',
    icon: 'table',
    path: 'findServer',
    children: [
      { name: '书单管理', path: 'findList' }, // sy
      { name: '专题管理', path: 'findSpec' }, // qx
      { name: '栏目管理', path: 'findChannel' }, // qx
      { name: '好书解读', path: 'findUnscramble' }, // lj
      { name: '荐书管理', path: 'findSuggestBook' }, // sy
      { name: '榜单管理', path: 'findTop' }, // lj
      { name: '荐读管理', path: 'findRecommend' },
      { name: '找书公告', path: 'findNotice' }, //jmc
      { name: '找书借阅榜单统计', path: 'findBorrowBookStat' } //jmc
    ]
  },
  {
    name: '动态管理',
    icon: 'table',
    path: 'dyna',
    children: [
      {
        name: '话题管理',
        path: 'topic'
      },
      {
        name: '举报管理',
        path: 'complaint'
      },
      {
        name: '书摘管理',
        path: 'digest'
      }
    ]
  },
  {
    name: '消息管理',
    icon: 'table',
    path: 'msgServer',
    children: [{ name: '用户消息', path: 'msgUser' }, { name: '消息推送', path: 'messagePush' }]
  },
  {
    name: '系统管理',
    icon: 'table',
    path: 'systemServer',
    children: [
      { name: '系统参数', path: 'sysParam' },
      { name: '黑名单书库', path: 'sysBlackBook' },
      { name: '服务管理', path: 'gateClient' },
      { name: '服务授权', path: 'gateClientService' },
      { name: '系统字典', path: 'sysDict' },
      { name: '权限组', path: 'sysRole' },
      { name: '操作员', path: 'sysUser' },
      { name: '敏感词汇', path: 'sysSensitive' },
      { name: '敏感词分类', path: 'sysSensitiveType' },
      { name: '渠道管理', path: 'sysChannel' },
      { name: '标签设置', path: 'sysLabel' },
      // { name: '选择测试', path: 'selectTest' },
      // { name: '选择音频测试', path: 'selectAudio' },
      { name: '轮播图', path: 'sysCarousel' },
      { name: '手机校验规则', path: 'sysCheckRule' },
      { name: '终端访问管理', path: 'sysTerminalAccess' },
      { name: '用户分析标签', path: 'sysAnalysisTag' },
      { name: '消息模板', path: 'sysMsgTemplate' }
    ]
  }
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = { ...item, path, authority: item.authority || parentAuthority };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData2 = () => formatter(menuData);
