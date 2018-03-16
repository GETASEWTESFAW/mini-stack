var express=require('express'),
     app=express(),
     bodyParser=require('body-parser'),
     mongojs=require('mongojs')
     db=mongojs('todo',['todo']);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.get('/',function(req,res){
    res.sendFile(__dirname+'/public/views/index.html');
});
app.get('/list',function(req,res){  
	 //console.log("getdone1");
	 db.todo.find({},function(err,docs){
	 	    res.json(docs);
	 });
});
app.get('/archive',function(req,res){  
	// console.log("getdone2");
	 db.todo.find({'done':false},function(err,docs){
	 	    res.json(docs);
	 });
});
app.get('/remain',function(req,res){  
     db.todo.find({'done':false},function(err,docs){
            res.json(docs);
     });
});

app.get('/edit/:id',function(req,res){  
	// console.log("getdone3");
	 var id=req.params.id;
	 db.todo.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
	 	    res.json(docs);
	 });
});


app.post('/addtodoList',function(req,res){
	//console.log("postdone"); 
	db.todo.insert(req.body,function(err,docs){
		res.json(docs);
	});
});
app.put('/done/:id',function(req,res){
    // console.log("putdone1");
    var id=req.params.id;
    var data=req.body.done;
   // console.log(data);
    db.todo.findAndModify({
    	query:{_id:mongojs.ObjectId(id)},
        update:{$set:{'done':data}}},function(err,docs){
        res.json(docs); 
    });

    // if (data) {
    //  db.todo.findAndModify({
    //  	query:{},
    //     update:{$inc:{doneNumber:1}}},function(err,docs){
    //    // res.json(docs); 
    // });

    // }else{
    // 	db.todo.findAndModify({
    // 	query:{doneNumber:{$gt:0}},	
    //     update:{$inc:{doneNumber:-1}}},function(err,docs){
    //    // res.json(docs); 
    // });
    // }

});

app.get('/checkAll',function(req,res){
    db.todo.update({'done':false},{$set:{'done':true}},{multi:true},function(err,docs){
        res.json(docs); 
    });
 });
 app.get('/uncheckAll',function(req,res){
    db.todo.update({'done':true},{$set:{'done':false}},{multi:true},function(err,docs){
        res.json(docs); 
    });
 });      
app.put('/update/:id',function(req,res){
    var data=req.body.name;
    var id=req.params.id;
    db.todo.findAndModify({
    	query:{_id:mongojs.ObjectId(id)},
        update:{$set:{'name':data}}},function(err,docs){
        res.json(docs); 
    });
});
app.delete('/delete',function(req,res){
	// console.log("delete");
    db.todo.remove({done:true},function(err,docs){
    	res.json(docs);
    });     
});
app.listen(8001);
console.log('server has started');