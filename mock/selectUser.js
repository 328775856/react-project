import { parse } from 'url';
let depts=[];
depts.push({
  code:  `001`,
  name: `体育部`,
})
depts.push({
  code:  `002`,
  name: `销售部`,
})
depts.push({
  code:  `003`,
  name: `研发部`,
})
let datas = [];
for (let i = 0; i < 46; i += 1) {
  var d=i % 3;
  datas.push({
    key: i,
    code:  `00${i}`,
    name: `名称${i}`,
    dept: depts[d].name,
    memo: `备注${i}`,
  });
}


function getPage(currentPage,pageSize){
  let startRecord=(currentPage-1)*pageSize;
  let endRecord=startRecord+pageSize-1;
  let filterDataSource=[];
  
  for(let i=0;i<datas.length;i++){
      if(i>=startRecord &&i<=endRecord){
        filterDataSource.push(datas[i]);
      }
  }
  console.log(filterDataSource);
  return filterDataSource;
}
export function getUserList(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
      url = req.url; // eslint-disable-line
    }
    const params = parse(url, true).query;
  
    let dataSource = [...datas];
  
    let pageSize = 10;
    let currentPage=1;
    if (params.pageSize) {
      pageSize =parseInt(params.pageSize) ;
    }
    if(params.currentPage){
      currentPage=parseInt(params.currentPage);
    }
    let page=getPage(currentPage,pageSize);
    const result = {
      status:200,
      message:'',
      data:{
        list: page,
        pagination: {
          total: dataSource.length,
          pageSize,
          current: currentPage,
        }
      }
      
    };
    res.json(result);
   
  
  }
 
  export function getDeptList(req, res, u) {
    const result = {
      status:200,
      message:'',
      data:depts
    };
    res.json(result);
  }  