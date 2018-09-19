import React, { createElement } from 'react';
import { Spin } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Loadable from 'react-loadable';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // register models
  models.forEach(model => {
    if (modelNotExisted(app, model)) {
      // eslint-disable-next-line
      app.model(require(`../models/${model}`).default);
    }
  });

  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache
      });
    };
  }
  // () => import('module')
  return Loadable({
    loader: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache
          });
      });
    },
    loading: () => <Spin
      size="large"
      className="global-spin"
    />
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout'))
    },
    '/dashboard/workplace': {
      component: dynamicWrapper(app, [], () => import('../routes/Dashboard/Workplace'))
    },

    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403'))
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404'))
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500'))
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      )
    },

    '/user': { component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')) },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login'))
    },

    '/systemServer/crud': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/Test/Crud'))
    },
    '/systemServer/selectTest': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/Test/SelectTest'))
    },
    '/systemServer/selectAudio': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/Test/SelectAudio'))
    },
    '/systemServer/sysParam': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysParam_list'))
    },

    '/media/imageGroup': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/media/imageGroup'))
    },
    '/media/image': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/media/image'))
    },
    '/media/videoGroup': {
      component: dynamicWrapper(app, [], () => import('../routes/media/videoGroupList'))
    },
    '/media/video': {
      component: dynamicWrapper(app, [], () => import('../routes/media/videoList'))
    },
    '/media/audioGroup': {
      component: dynamicWrapper(app, [], () => import('../routes/media/audioGroupList'))
    },
    '/media/audio': {
      component: dynamicWrapper(app, [], () => import('../routes/media/audioList'))
    },
    '/media/articleGroup': {
      component: dynamicWrapper(app, [], () => import('../routes/media/articleGroupList'))
    },
    '/media/article': {
      component: dynamicWrapper(app, [], () => import('../routes/media/articleList'))
    },

    '/systemServer/sysDict': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysDict_list'))
    },
    '/systemServer/sysDictItem': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysDictItem_list'))
    },
    '/systemServer/sysRole': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysRole_list'))
    },
    '/systemServer/sysUser': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysUser_list'))
    },
    '/systemServer/sysSensitive': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysSensitive_list'))
    },
    '/systemServer/sysSensitiveType': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/SystemServer/SysSensitiveType_list')
      )
    },
    '/systemServer/sysChannel': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysChannel_list'))
    },
    '/systemServer/sysChannelItem': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/SystemServer/SysChannelItem_list')
      )
    },
    '/systemServer/sysLabel': {
      component: dynamicWrapper(app, [], () => import('../routes/SystemServer/SysLabel_list'))
    },

    '/orderServer/orderProduct': {
      component: dynamicWrapper(app, [], () => import('../routes/OrderServer/OrderProduct_list'))
    },
    '/orderServer/orderProductType': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/OrderServer/OrderProductType_list')
      )
    },

    '/courseServer/courseAuthor': {
      component: dynamicWrapper(app, [], () => import('../routes/CourseServer/CourseAuthor_list'))
    },
    '/courseServer/courseColumn': {
      component: dynamicWrapper(app, [], () => import('../routes/CourseServer/CourseColumn_list'))
    },
    '/courseServer/courseTag': {
      component: dynamicWrapper(app, [], () => import('../routes/CourseServer/CourseTag_list'))
    },
    '/courseServer/courseInfo': {
      component: dynamicWrapper(app, [], () => import('../routes/CourseServer/CourseInfo_list'))
    },
    '/courseServer/courseChapter': {
      component: dynamicWrapper(app, [], () => import('../routes/CourseServer/CourseChapter_list'))
    },
    '/courseServer/courseChapterAudio': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/CourseServer/CourseChapterAudio_list')
      )
    },
    '/courseServer/courseChapterNote': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/CourseServer/CourseChapterNote_list')
      )
    },

    '/courseServer/courseChapterVideo': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/CourseServer/CourseChapterVideo_list')
      )
    },
    '/courseServer/courseRelChapter': {
      component: dynamicWrapper(app, [], () =>
        import('../routes/CourseServer/CourseRelChapter_list')
      )
    },

    '/priServer/priFunction': {
      component: dynamicWrapper(app, [], () => import('../routes/PriServer/PriFunction_list'))
    },
    '/priServer/priPackage': {
      component: dynamicWrapper(app, [], () => import('../routes/PriServer/PriPackage_list'))
    },
    '/priServer/priPackageItem': {
      component: dynamicWrapper(app, [], () => import('../routes/PriServer/PriPackageItem_list'))
    },

    '/vipServer/vipCourse': {
      component: dynamicWrapper(app, [], () => import('../routes/VipServer/VipCourse_list'))
    },
    '/vipServer/vipCourseDemo': {
      component: dynamicWrapper(app, [], () => import('../routes/VipServer/VipCourseDemo_list'))
    },
    '/vipServer/vipCourseType': {
      component: dynamicWrapper(app, [], () => import('../routes/VipServer/VipCourseType_list'))
    },
    '/vipServer/vipPackage': {
      component: dynamicWrapper(app, [], () => import('../routes/VipServer/VipPackage_list'))
    },

    '/systemServer/sysBlackBook': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/SystemServer/SysBlackBook'))
    },
    '/systemServer/gateClient': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/AuthServer/GateClient'))
    },
    '/systemServer/sysCarousel': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/SystemServer/SysCarousel_list')
      )
    },
    '/systemServer/sysCheckRule': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/SystemServer/SysCheckRule_list')
      )
    },
    '/systemServer/sysTerminalAccess': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/SystemServer/SysTerminalAccess_list')
      )
    },

    '/bookServer/bookStyle': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/BookServer/BookStyle_list'))
    },
    '/bookServer/bookReadnote': {
      component: dynamicWrapper(app, [], () => import('../routes/BookServer/BookReadnote_list'))
    },
    '/bookServer/bookProp': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/BookServer/BookProp_list'))
    },
    '/bookServer/bookType': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/BookServer/BookType_list'))
    },
    '/bookServer/bookStorage': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/BookServer/BookStorage_list')
      )
    },
    '/bookServer/bookUserGood': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/BookServer/BookUserGood_list')
      )
    },
    '/bookServer/bookBuy': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/BookServer/BookBuy_list'))
    },
    '/bookServer/bookPrivate': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/BookServer/BookPrivate_list')
      )
    },
    '/bookServer/bookShare': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/BookServer/BookShare_list'))
    },

    '/userServer/userFeedback': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/UserServer/UserFeedback_list')
      )
    },

    '/uploadbookServer/uploadBook': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/UploadBookServer/UploadBook_list')
      )
    },

    '/systemServer/gateClientService': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/AuthServer/GateClientService')
      )
    },
    '/dyna/topic': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/dyna/topicList'))
    },
    '/dyna/complaint': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/dyna/topicComplaintList'))
    },
    '/dyna/comment': {
      component: dynamicWrapper(app, ['crud'], () => import('../routes/dyna/topicCommentList'))
    },
    '/dyna/reply': {
      component: dynamicWrapper(app, [], () => import('../routes/dyna/topicCommentReplyList'))
    },

    '/FindServer/findList': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindList/FindList_list')
      )
    },
    '/FindServer/findListBook': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindList/FindListBook_list')
      )
    },
    '/FindServer/findSpec': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindSpec/FindSpec_list')
      )
    },
    '/FindServer/findSpecBook': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindSpec/FindSpecBook_list')
      )
    },
    '/FindServer/findSpecCourse': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindSpec/FindSpecCourse_list')
      )
    },
    '/FindServer/findChannel': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindChannel/FindChannel_list')
      )
    },
    '/FindServer/findUnscramble': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindUnscramble/FindUnscramble_list')
      )
    },
    '/FindServer/findSuggestBook': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindSuggestBook/FindSuggestBook_list')
      )
    },
    '/FindServer/findTop': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindTop/FindTop_list')
      )
    },
    '/FindServer/findTopBook': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/FindServer/FindTop/FindTopBook_list')
      )
    },
    '/systemServer/sysAnalysisTag': {
      component: dynamicWrapper(app, ['crud'], () =>
        import('../routes/SystemServer/SysAnalysisTag_list')
      )
    }

    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb
    };
    routerData[path] = router;
  });
  return routerData;
};
