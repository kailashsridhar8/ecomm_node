var bodyParser=require('body-parser');
var urlencodedParser=bodyParser.urlencoded({extended:false});
var data=[{item:'Shoes'},{item:'Shirts'},{item:'Gym Accesories'}];
var cartItem=[];

module.exports=function(app){

    app.get('/backlog',function(req,resp){
        resp.render('backlog',{list:data});
    });
    app.get('/cart',function(req,resp){
        resp.render('cart',{cartlist:cartItem});
    });

    app.post('/backlog',urlencodedParser,function(req,resp){
          
        data.push(req.body);
        resp.render('backlog',{list:data});
        
    });
    app.delete('/backlog/:item',function(req,resp){
       data=data.filter(function(list){
            return list.item.replace(/ /g,'-')!=req.params.item;
       });
            resp.render('backlog',{list:data});
        });
    
        app.post('/cart',urlencodedParser,function(req,resp){
           
            cartItem.push(req.body);
                 resp.render('cart',{cartlist:cartItem});
             });    


};