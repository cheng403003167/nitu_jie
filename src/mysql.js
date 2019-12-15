const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '3203550Cheng',
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
        SQL = 'SELECT id,front_img,type,title,content FROM article';
      }else{
        SQL = 'SELECT id,front_img,type,title,content FROM article WHERE type='+parseInt(data);
      }
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
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
      let SQL = 'SELECT * FROM `article` WHERE `id` =(select max(id) from article where id<'+data+')';
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
      let SQL = 'SELECT * FROM `article` WHERE `id` =(select min(id) from article where id>'+data+')';
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
        return result;
      })
    })
  }
  getTuijian(type,id){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT id FROM `article` WHERE `type` ='+type;
      pool.query(SQL , (err,result)=>{
        if(err){
          console.log(err);
        }
        res(result);
      })
    }).then((res) => {
      let len = res.length;
      let tui_id = [];
      while(true){
        let temp_id = parseInt(Math.random()*len);
        if(res[temp_id].id != id && tui_id.indexOf(res[temp_id].id) < 0){
          tui_id.push(res[temp_id].id);
        }
        if(tui_id.length==3){
          break;
        }
      }
      return tui_id;
    }).then(async (res)=>{
      var article_list = [];
      let s1 = await this.getTuiArticle(res[0]);
      let s2 = await this.getTuiArticle(res[1]);
      let s3 = await this.getTuiArticle(res[2]);
      article_list.push(s1[0], s2[0], s3[0]);
      return article_list;
    })
  }
  getTuiArticle(id){
    return new Promise((res,rej)=>{
      let SQL = 'SELECT id,title,front_img FROM `article` WHERE `id` = "'+id+'"';
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