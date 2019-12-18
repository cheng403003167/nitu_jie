const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'TLTAIxGrbAO9cD0lj',
  accessKeySecret: 'Ts8giJOlrSrBm73KohGGCfBtnwQlolv',
  bucket: 'traile',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com'
});
module.exports = client;