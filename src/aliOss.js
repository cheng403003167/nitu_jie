const OSS = require('ali-oss');
const client = new OSS({
  accessKeyId: 'LTAIxGrbAO9cD0lj',
  accessKeySecret: 's8giJOlrSrBm73KohGGCfBtnwQlolv',
  bucket: 'traile',
  endpoint: 'oss-cn-shenzhen.aliyuncs.com'
});
module.exports = client;