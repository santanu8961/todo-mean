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
    // console.log(todo);
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
        todosave.save(err=>{
            err ? console.log(err) : console.log('your data has been saved');
        });
    }
});


// Update todo
router.post('/todo/:_id',(req,res,next)=>{
    var query = {'_id':req.params.id};
    var todo = req.body
    var updatedtodo = {};

    if(todo.isCompleted){
        updatedtodo.isCompleted = todo.isCompleted
    }

    if(todo.text){
        updatedtodo.text = todo.text
    }

    if(!updatedtodo){
        res.status(400);
        res.json({'error':'invalid data'});
    } else {
        todoSchema.update(query,updatedtodo,(err,result)=>{
            err ? res.send(err) : res.send(result);
        })
    }
});



// delete todo
router.post('/todo/:_id',(req,res,next)=>{
    var query = {'_id':req.params.id};
todoSchema.remove(query,err => {
   err ? res.send(err) : res.send('successfully deleted!')
});
});

module.exports = router; 