const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'SLTAIxGrbSAO9cD0ljS',
  accessKeySecret: 'Ts8giJOlrSrBTm73KohGGCfBtnwQlolvT',
  bucket: 'traile',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com'
});
module.exports = client;