
import {Component, OnInit} from '@angular/core';
import { TodoService} from '../services/todos.service'
import {Todo} from '../Todo'
@Component({
    moduleId:module.id,
  selector: 'todos',
  templateUrl: `todos.component.html`,

})
export class TodosComponent implements OnInit { 
    todos: Todo[];
    constructor(private _todoService:TodoService ){
        
    }
    ngOnInit(){
       this.init();
       
    }
    // ngOnInit() {
    //     this.init();
    //     this.refreshData();
    //     this.interval = setInterval(() => { 
    //         this.refreshData(); 
    //     }, 5000);
    // }
    // refreshData(){
    //     this._todoService.getTodos()
    //         .subscribe(todos => {
    //             this.todos = todos;
    //         })
        
    // }

    

    init(){
        this.todos = [];
        this._todoService.getTodos()
        .subscribe(todos =>{
            console.log(`all todos ${todos}`);
            
            this.todos = todos;
        });
    }
    addTodo(event:any,todoText:any){
        console.log(todoText.value)
        
        // var result;
        var newTodo:Todo = {
            _id:'',
            text: todoText.value,
            isCompleted : false
        };
        console.log("To be saved",newTodo);
       this._todoService.saveTodo(newTodo)
        .subscribe(x =>{
            this.init();
            todoText.value = '';
        })
        
    }
    setEditState(todo:any,state:any){
        if(state){
            todo.isEditMode = state;
        }else{
            delete todo.isEditMode;
        }
    }
    updateStatus(todo:Todo){
        var _todo = {
            _id:todo._id,
            text: todo.text,
            isCompleted:!todo.isCompleted
        };
       this._todoService.updateTodo(_todo)
       .subscribe(() =>{
           this.init();
       }) ;
    }
    updateTodoText(event:any,todo:any){
     console.log(arguments);
     
        if(event.which === 13){
            todo.text = event.target.value;
            var _todo = {
                _id:todo._id,
                text:todo.text,
                isCompleted: todo.isCompleted
            };
            this._todoService.updateTodo(_todo)
            .subscribe(()=>{
                this.setEditState(todo,false);
            })
        };
    }
    deleteTodo(todo:any){
        var todos = this.todos;

        this._todoService.deleteTodo(todo._id)
        .subscribe(data =>{
            this.init();
        })
    }
}
