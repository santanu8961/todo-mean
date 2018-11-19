const express = require('express');
const router = express.Router();

var todoSchema = require('../models/todoSchema');


// get todos 
router.get('/todos',(req,res,next)=>{
    todoSchema.find({},(err,doc)=>{
        err ? res.send(err) : res.send(doc);
    })
});


// get single todos 
router.get('/todo/:_id',(req,res,next)=>{
    var id = req.params._id;
    // console.log(id);

    todoSchema.findOne({_id:req.params._id},(err,doc)=>{
        err ? res.send(err) : res.send(doc);
        console.log(doc)
    });
});



// save todo
router.post('/todo',(req,res,next)=>{
    var todo = req.body;
    console.log("hIT",todo);
    var todosave = new todoSchema({
        'text':todo.text,
        'isCompleted':todo.isCompleted
    });
    console.log('hi :' + todo.text)
    if(!todo.text || !(todo.isCompleted + ``)){
        res.status(400);
        res.json({
            "error":"Invalid Data"
        });
    }else{
        todosave.save((err,result)=>{
            err ? console.log(err) : res.send(result)
        });
    }
});

// Update todo
router.post('/todo/:_id',(req,res,next)=>{
    var id = req.params._id;
    var query = {'_id':id};
    var todo = req.body
    var updatedtodo = {
        "text": todo.text,
        "isCompleted":todo.isCompleted
    };

    // if(todo.isCompleted){
    //     updatedtodo.isCompleted = todo.isCompleted
    // }

    // if(todo.text){
    //     updatedtodo.text = todo.text
    // }
    console.log(updatedtodo)
    console.log(query)

    if(!updatedtodo){
        res.status(400);
        res.json({'error':'invalid data'});
    } else {
        todoSchema.updateOne(query,updatedtodo,(err,result)=>{
            err ? res.send(err) : res.send(result);
        })
    }
});



// delete todo
router.delete('/todo/:_id',(req,res,next)=>{
    console.log("this is the request body"+ "  "+ req.params._id)
todoSchema.deleteOne({"_id":req.params._id},(err,result) => {
   err ? res.send(err) : res.send(result)
});
});

module.exports = router; 