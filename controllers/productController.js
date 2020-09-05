var bodyParser=require('body-parser');
var mongoose = require('mongoose');
var mongodb=require('mongodb');
//var data=[{item:'get milk'},{item:'walk the dog'}, {item:'learn NodeJS'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});
var mongoClient=mongodb.MongoClient;
var url='mongodb+srv://test:test@cluster0.6xplf.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
var itemSchema=new mongoose.Schema({
    item: String 
  
     }); //Schema definition
var Item = mongoose.model('backlog',itemSchema); //Data model = Database in RDBMS
module.exports=function(app){
    app.get('/backlog',function(req,resp){
        Item.find({},function(err,data){
            if(err) throw err;
            resp.render('backlog',{list:data});
        });
        
    });
    app.get('/cart',function(req,resp){
        Item.find({},function(err,data){
            if(err) throw err;
            resp.render('cart',{list:data});
        });
        
    });
    app.post('/backlog',urlencodedParser,function(req,resp){
        var newItem=Item(req.body).save(function(err,data){
             if (err) throw err;
             resp.render('backlog',{list:data});
        }) ;
    });
    app.delete('/backlog/:item',function(req,resp){
       Item.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
           if (err) throw err;
           resp.render('backlog',{list:data});
       });
    });
};