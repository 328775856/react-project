import { parse } from 'url';

let datas = [];
for (let i = 0; i < 46; i += 1) {
  datas.push({
    key: i,
    code: `编号 ${i}`,
    name: `名称 ${i}`,
    memo: `备注 ${i}`
  });
}

function getPage(currentPage, pageSize) {
  const startRecord = (currentPage - 1) * pageSize;
  const endRecord = startRecord + pageSize - 1;
  const filterDataSource = [];

  for (let i = 0; i < datas.length; i++) {
    if (i >= startRecord && i <= endRecord) {
      filterDataSource.push(datas[i]);
    }
  }
  console.log(filterDataSource);
  return filterDataSource;
}
export function getCrudList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;

  const dataSource = [...datas];

  let pageSize = 10;
  let currentPage = 1;
  if (params.pageSize) {
    pageSize = parseInt(params.pageSize);
  }
  if (params.currentPage) {
    currentPage = parseInt(params.currentPage);
  }
  const page = getPage(currentPage, pageSize);
  const result = {
    status: 200,
    message: '',
    data: {
      list: page,
      pagination: {
        total: dataSource.length,
        pageSize,
        current: currentPage
      }
    }
  };
  console.log(result);
  res.json(result);
}
export function addSaveCrud(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const code = params.code;
  const name = params.name;
  const memo = params.memo;
  const newDatas = [];
  newDatas.push({
    key: datas.length,
    code,
    name,
    memo
  });
  for (let i = 0; i < datas.length; i++) {
    newDatas.push(datas[i]);
  }
  datas = newDatas;
  const result = {
    status: 200,
    message: '新增保存成功'
  };
  res.json(result);
}

export function batchDeleteCrud(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }
  const params = parse(url, true).query;
  const key = `,${params.key},`;
  const newDatas = [];
  for (let i = 0; i < datas.length; i++) {
    const k = `,${datas[i].key},`;
    if (key.indexOf(k) < 0) {
      newDatas.push(datas[i]);
    }
  }
  datas = newDatas;
  const result = {
    status: 200,
    message: '批量删除成功'
  };
  res.json(result);
}

export function updateCrud(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url;
  }
  const params = parse(url, true).query;
  const key = parseInt(params.key, 0);
  let entity = {};
  for (let i = 0; i < datas.length; i++) {
    const k = datas[i].key;
    if (key === k) {
      entity = datas[i];
      break;
    }
  }
  const result = {
    status: 200,
    message: '批量删除成功',
    data: entity
  };
  console.log(result);
  res.json(result);
}

export function updateSaveCrud(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url;
  }
  const params = parse(url, true).query;
  const key = parseInt(params.key, 0);
  let entity = {};
  for (let i = 0; i < datas.length; i++) {
    const k = datas[i].key;
    if (key === k) {
      entity = datas[i];
      break;
    }
  }
  const code = params.code;
  const name = params.name;
  const memo = params.memo;
  entity.code = code;
  entity.name = name;
  entity.memo = memo;
  const result = {
    status: 200,
    message: '修改成功',
    data: entity
  };
  res.json(result);
}

export function addCrud(req, res, u) {
  const result = {
    status: 200,
    message: '',
    data: { code: 'test', name: 'test', memo: 'test' }
  };
  console.log(result);
  res.json(result);
}
