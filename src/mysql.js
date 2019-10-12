const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'nitu_data'
});
class mysqlClass {
  constructor(){

  }
  getBookType(){
    return new Promise((res,rej)=>{
      pool.query('SELECT * FROM article_type', (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  addBookType(type){
    return new Promise((res,rej)=>{
      pool.query('INSERT INTO article_type SET type=?' ,type , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  delBookType(id){
    return new Promise((res,rej)=>{
      pool.query('DELETE FROM article_type WHERE id=?' ,id , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  updateBookType(id,type){
    return new Promise((res,rej)=>{
      pool.query('UPDATE article_type SET type=? WHERE id=?' ,[type,id] , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getJokeType(){
    return new Promise((res,rej)=>{
      pool.query('SELECT * FROM joke_type', (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  addJokeType(type){
    return new Promise((res,rej)=>{
      pool.query('INSERT INTO joke_type SET type=?' ,type , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  delJokeType(id){
    return new Promise((res,rej)=>{
      pool.query('DELETE FROM joke_type WHERE id=?' ,id , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  updateJokeType(id,type){
    return new Promise((res,rej)=>{
      pool.query('UPDATE joke_type SET type=? WHERE id=?' ,[type,id] , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  newArticle(data){
    return new Promise((res,rej)=>{
      pool.query('INSERT INTO article SET ?' ,data , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getArticleList(data){
    return new Promise((res,rej)=>{
      let SQL ='';
      if(!data){
        SQL = 'SELECT id,front_img,type,title,content FROM article ORDER BY id DESC LIMIT 5 ';
      }else{
        SQL = 'SELECT id,front_img,type,title,content FROM article WHERE type='+parseInt(data)+' ORDER BY id DESC LIMIT 5';
      }
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        var filterHTMLTag = function(msg) {
          var msg = msg.replace(/<\/?[^>]*>/g, "");
          msg = msg.replace(/[|]*\n/, "");
          msg = msg.replace(/&npsp;/gi, "");
          msg = msg.replace(/&nbsp;/gi, "");
          return msg;
        };
        result.forEach(function(item) {
          item.content = filterHTMLTag(item.content).slice(0, 90) + "...";
        });
        res(result);
        return result;
      })
    })
  }
  getArticleLength(data){
    let SQL ='';
    if(!data){
      SQL = 'SELECT COUNT(*) AS leng FROM article';
    }else{
      SQL = 'SELECT COUNT(*) AS leng FROM article WHERE type='+parseInt(data);
    }
    pool.query(SQL , (err,result)=>{
      if(err){
        console.log(err);
      }
      res(result);
      return result;
    })
  }
  getArticleIdList(){
    return new Promise((res,rej)=>{
      let SQL ='';
      SQL = 'SELECT id FROM article';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getArticleItem(data){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT * FROM `article` WHERE `id` = "'+data+'"';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getArticleItemPrev(data){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT id,title FROM `article` WHERE `id` =(select max(id) from article where id<'+data+')';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getArticleItemNext(data){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT id,title FROM `article` WHERE `id` =(select min(id) from article where id>'+data+')';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  ArticleUpdate(data,arId){
    return new Promise((res,rej)=>{
      let SQL = 'UPDATE `article` SET title="'+data.title+'",type='+parseInt(data.type)+',date="'+data.date+'",front_img="'+data.front_img+'",keyword="'+data.keyword+'",descript="'+data.descript+'",content=?,`update`='+parseInt(data.update)+' WHERE `id`='+parseInt(arId)+'';
      pool.query(SQL,[data.content], (err,result)=>{
        if(err){
          console.log(err);
        }
        console.log(result)
        res(result);
        return result;
      })
    })
  }
  getSearchArticleList(){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT id,title FROM article';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
}
module.exports = mysqlClass;