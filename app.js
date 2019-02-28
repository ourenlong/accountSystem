//1、引入express
var express=require('express');
//搭建服务
var app=express();
//配置静态资源路径
app.use(express.static(__dirname+'/public'));
//
//req.query.accountNum
app.get('/login',function (req,res) {
    var  sql = 'SELECT password FROM Admin where accountNum='+'req.query.accountNum';
    var connection= connect();
    connection.query(sql,function (err, result)
    {

        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        if(result.length==0){
            blogin=false;
        }

        if(req.query.password==result[0].password){
            console.log("正确");
            // req.session.isLogined=true;
            // req.session.accountNum=req.query.accountNum;
            //
            // req.session.uJst=result[0].root;
            res.send({"error":0,"txt":"成功"});
            blogin=true;
        }else{
            console.log("错误");
            res.send({"error":1,"txt":"失败"})
            blogin= false;
        }
    }
    );

    connection.end();
});
//配置端口号
app.listen(4399,function () {
    console.log('启动了')
});
// login();


function connect(){
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
        host: "127.0.0.1",
        user     : 'root',
        password : 'root',
        database : 'accountsystem'
    });
    connection.connect();
    return connection;
}
function login() {
    var  sql = 'SELECT * FROM admin ';
    var connection= connect();
    connection.query(sql,function (err,result)
        {
            console.log(result);
            // console.log(result[0].password);

            console.log("aaaaaa")
        }
    );

    connection.end();

}