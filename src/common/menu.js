import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: '工作台',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '欢迎页',
        path: 'workplace',
      },
    ],
  },
  {
    name: '媒体管理',
    icon: 'table',
    path: 'media',
    children: [
      {
        name: '图片分组管理',
        path: 'imageGroup',
      },
      {
        name: '图片管理',
        path: 'image',
      },
      {
        name: '视频分组管理',
        path: 'videoGroup',
      },
      {
        name: '视频管理',
        path: 'video',
      },
      {
        name: '音频分组管理',
        path: 'audioGroup',
      },
      {
        name: '音频管理',
        path: 'audio',
      },
      {
        name: '图文分组管理',
        path: 'articleGroup',
      },
      {
        name: '图文管理',
        path: 'article',
      },
    ],
  },
  {
    name: '系统管理',
    icon: 'table',
    path: 'systemServer',
    children: [
      {
        name: '系统参数',
        path: 'sysParam',
      },
      {
        name: '黑名单书库',
        path: 'sysBlackBook',
      },
      {
        name: '服务管理',
        path: 'gateClient',
      },
      {
        name: '服务授权',
        path: 'gateClientService',
      },
      {
        name: '系统字典',
        path: 'sysDict',
      },
      {
        name: '权限组',
        path: 'sysRole',
      },
      {
        name: '操作员',
        path: 'sysUser',
      },
      {
        name: '敏感词汇',
        path: 'sysSensitive',
      },
      {
        name: '敏感词分类',
        path: 'sysSensitiveType',
      },
      {
        name: '渠道',
        path: 'sysChannel',
      },
      {
        name: '标签设置',
        path: 'sysLabel',
      },
      {
        name: '选择测试',
        path: 'selectTest',
      },
      {
        name: '选择音频测试',
        path: 'selectAudio',
      },
      {
        name: '轮播图',
        path: 'sysCarousel',
      },
      {
        name: '手机校验规则',
        path: 'sysCheckRule',
      },
      {
        name: '终端访问管理',
        path: 'sysTerminalAccess',
      },
    ],
  },
  {
    name: '图书',
    icon: 'table',
    path: 'bookServer',
    children: [
      {
        name: '图书格式',
        path: 'bookStyle',
      },
      {
        name: '图书属性',
        path: 'bookProp',
      },
      {
        name: '图书分类',
        path: 'bookType',
      },
      {
        name: '图书存储',
        path: 'bookStorage',
      },
      {
        name: '优质图书',
        path: 'bookUserGood',
      },
      {
        name: '购买图书',
        path: 'bookBuy',
      },
      {
        name: '上传图书',
        path: 'bookShare',
      },
      {
        name: '私有图书',
        path: 'bookPrivate',
      },
      {
        name: '笔记',
        path: 'bookReadnote',
      },
    ],
  },
  {
    name: '用户',
    icon: 'table',
    path: 'userServer',
    children: [
      {
        name: '用户反馈',
        path: 'userFeedback',
      },
    ],
  },
  {
    name: '用户上传图书',
    icon: 'table',
    path: 'uploadbookServer',
    children: [
      {
        name: '用户上传的图书信息',
        path: 'uploadBook',
      },
    ],
  },
  {
    name: '订单',
    icon: 'table',
    path: 'orderServer',
    children: [
      {
        name: '订单产品类型',
        path: 'orderProductType',
      },
      {
        name: '产品',
        path: 'orderProduct',
      },
    ],
  },
  {
    name: '课程',
    icon: 'table',
    path: 'courseServer',
    children: [
      {
        name: '作者',
        path: 'courseAuthor',
      },
      {
        name: '专栏',
        path: 'courseColumn',
      },
      {
        name: '标签',
        path: 'courseTag',
      },
      {
        name: '课程',
        path: 'courseInfo',
      },
      {
        name: '章节',
        path: 'courseChapter',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
