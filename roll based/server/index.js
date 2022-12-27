const express = require('express');
const cors = require('cors');
//const bodyparser = require('body-parser');
const connect = require('mysql');
const fileupload = require('express-fileupload');


const app = express();
app.use(cors());
app.use(fileupload());
//app.use(bodyparser.json());
app.use(express.json());
//app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static('public'));

let sqlconnect=connect.createConnection({
    host :"localhost",
    port :"3306",
    user : "root",
    password :"Kgisl@123",
    database : "registration"
})

sqlconnect.connect((error)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log("Database Connected")
    }
})

app.post('/register',(request,response)=>{
    let {firstnamerf,lastnamerf,emailrf,phonerf,passwordrf}=request.body;
    let sql='insert into register(First_name,Last_name,Email,Phone_no,Password) value(?,?,?,?,?)'
    sqlconnect.query(sql,[firstnamerf,lastnamerf,emailrf,phonerf,passwordrf],(error,result)=>{
        if(error){
            let a = {"status":"Syntax_error"}
            response.send(a);
        }
        else{
            let a = {"status":"success"};
            response.send(a);
        }

    })
})

app.post("/check",(request,response)=>{
    let {usernamelf,passwordlf}=request.body;
     
    let sql='select * from register where Phone_no=?'

    sqlconnect.query(sql,[usernamelf],(error,result)=>{
        if(error){
            let a = {"status":"Syntax_error"}
            response.send(a);
        }
        else if(result.length>0){
            let username1 =result[0].Phone_no;
            let password2 =result[0].Password;
            let Id =result[0].Id;

            if(username1 === usernamelf && password2 === passwordlf){
                let a ={"status":"success","Id":Id}
                response.send(a);
            }
            else{
                let a={"status":"Invaild_user"}
                response.send(a);
            }
        }
        else{
            let a={"status":"error"}
            response.send(a);
        }
    })

})

app.get('/take/:Id',(request,response)=>{

    let {Id}=request.params;

    let sql ='select * from register where Id=?';

    sqlconnect.query(sql,[Id],(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})
    

app.post('/delete',(request,response)=>{

        let Id=request.body.Id;

        let sql='delete from register where Id=?'

        sqlconnect.query(sql,[Id],(error,result)=>{
            if(error){
                let a={'status':'Syntax_error'}
                response.send(a);
            }
            else{
                let a={'status':'success'}
                response.send(a);
            }
        })

    })

app.get('/update/:Id',(request,response)=>{

        let {Id}=request.params;

        let sql='select * from register where id=?'

        sqlconnect.query(sql,[Id],(error,result)=>{
            if(error){
            response.send(error);
            }
            else{
                response.send(result);
            }
        })
})
    
app.put('/change/:Id',(request,response)=>{
    let {Id}=request.params;
    let {firstnameud,lastnameud,emailud,phoneud,passwordud}=request.body;

    let sql='update register set First_name=?,Last_name=?,Email =?,Phone_no =?,Password=? where Id=?';

    sqlconnect.query(sql,[firstnameud,lastnameud,emailud,phoneud,passwordud,Id],(error,result)=>{
        if(error){
            let a={'status':'Syntax_error'}
            response.send(a);
        }
        else{
            let a={'status':'success'}
            response.send(a);
        }
    })
})
app.listen(3002,()=>console.log("Server running port:3002"));