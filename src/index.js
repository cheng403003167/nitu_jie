const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const fs = require('fs');
const koaBody = require('koa-body');
const bodyParser = require('koa-bodyparser');
const mysqlClass = require('./mysql');
const client = require('./aliOss')
const app = new Koa();
app.use(koaBody({
  multipart: true
}))
app.use(bodyParser());
const router = new Router();
const mysql = new mysqlClass();
router.get('/api/getBookType',async (ctx,next)=>{
  let s = await mysql.getBookType();
  ctx.body = s;
})
router.post('/api/addBookType',async (ctx,next)=>{
  let s = await mysql.addBookType(ctx.request.body.type);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/delBookType',async (ctx,next)=>{
  let s = await mysql.delBookType(ctx.request.body.id);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/updateBookType',async (ctx,next)=>{
  let s = await mysql.updateBookType(ctx.request.body.id,ctx.request.body.type);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.get('/api/getJokeType',async (ctx,next)=>{
  let s = await mysql.getJokeType();
  ctx.body = s;
})
router.post('/api/addJokeType',async (ctx,next)=>{
  let s = await mysql.addJokeType(ctx.request.body.type);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/delJokeType',async (ctx,next)=>{
  let s = await mysql.delJokeType(ctx.request.body.id);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/updateJokeType',async (ctx,next)=>{
  let s = await mysql.updateJokeType(ctx.request.body.id,ctx.request.body.type);
  if(s.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/imgFile',async (ctx) =>{
  const file = ctx.request.files.file;
  var fileFormat = file.name.split('.');
  let newFile = Date.now() + '.' + fileFormat[fileFormat.length - 1];
  const reader = fs.createReadStream(file.path);
  let result = await client.putStream('nitu/front/'+newFile,reader);
  ctx.body = result;
})
router.post('/api/imgList',async (ctx) =>{
  let marker = ctx.request.body.market || 'nitu/front/';
  let resultArr = [];
  async function getF(){
    let result = await client.list({
      prefix: 'nitu/front/',
      'max-keys': 1000,
      marker: marker
    });
    resultArr = resultArr.concat(result.objects);
    if(result.isTruncated){
      await getF(marker);
    }
  }
  await getF();
  ctx.body = resultArr.reverse();
})
router.post('/api/articleCon',async (ctx) => {
  let data = ctx.request.body.forms;
  let result = await mysql.newArticle(data);
  if(result.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/articleConUpdate',async (ctx) => {
  let data = ctx.request.body.forms;
  let arId = ctx.request.body.id;
  let result = await mysql.ArticleUpdate(data,arId);
  if(result && result.affectedRows && result.affectedRows>0){
    ctx.body = {addData: true}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/getArticleList',async (ctx) =>{
  let data = ctx.request.body.arId;
  let pages = ctx.request.body.page || 1;
  let leng = await mysql.getArticleLength(data);
  let lastId = leng[0].leng + 5;
  let startP = 0;
  if(pages != 1){
    startP = lastId-(pages-1)*5+1;
  }else{
    startP = lastId + 1;
  }
  let result = await mysql.getArticleList(data,startP,pages);
  if(result.length>0){
    ctx.body = result
  }else{
    ctx.body = {addData: false}
  }
})
router.get('/api/getArticleIdList',async (ctx) =>{
  let result = await mysql.getArticleIdList();
  if(result.length>0){
    ctx.body = result;
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/getArticleItem',async (ctx) =>{
  let data = ctx.request.body.id;
  let result = await mysql.getArticleItem(data);
  if(result.length>0){
    ctx.body = result
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/getArticleListAndType',async (ctx) =>{
  let data = ctx.request.body.arId;
  let pages = ctx.request.body.page || 1;
  let leng = await mysql.getArticleLength(data);
  let lastId = leng[0].leng + 5;
  let startP = 0;
  if(pages != 1){
    startP = lastId-(pages-1)*5+1;
  }else{
    startP = lastId + 1;
  }
  let result = await mysql.getArticleList(data,startP,pages);
  let s = await mysql.getBookType();
  if(result.length>0){
    ctx.body = {article_list:result,article_type:s,leng:leng[0].leng}
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/getArticleLength',async (ctx) =>{
  let data = ctx.request.body.arId;
  let result = await mysql.getArticleLength(data);
  if(result.length>0){
    ctx.body = result;
  }else{
    ctx.body = {addData: false}
  }
})
router.post('/api/getArticleConAndType',async (ctx) =>{
  let data = parseInt(ctx.request.body.arId);
  let result = await mysql.getArticleItem(data);
  let prevResult = await mysql.getArticleItemPrev(data);
  let nextResult = await mysql.getArticleItemNext(data);
  let getTuijian = await mysql.getTuijian(result[0].type, result[0].id);
  let s = await mysql.getBookType(result.type, result.id);
  if(result.length>0){
    ctx.body = {article_con:result,article_prev:prevResult,article_next:nextResult,article_type:s,getTuijian:getTuijian}
  }else{
    ctx.body = {addData: false}
  }
})
router.get('/api/getTuijian', async (ctx) =>{
  let getTuijian = await mysql.getTuijian(3);
  ctx.body = getTuijian
})
router.post('/api/getSearchArticleListAndType',async (ctx) =>{
  let data = ctx.request.body.search;
  let result = await mysql.getSearchArticleList();
  let tempArr = [];
  let resArr = [];
  for(var st = 0;st<result.length;st++){
    if(result[st].title.indexOf(data)>=0){
      tempArr.push(result[st]);
    }
  }
  if(tempArr.length>0){
    for(var t = 0;t<tempArr.length;t++){
      let resT = await mysql.getArticleItem(tempArr[t].id);
      resArr = resArr.concat(resT);
    }
  }
  let ss = await mysql.getBookType();
  if(result.length>0){
    ctx.body = {article_list:resArr,article_type:ss}
  }else{
    ctx.body = {addData: false}
  }
})

app.use(cors());
app.use(router.routes()).use(router.allowedMethods());
app.listen(8080);