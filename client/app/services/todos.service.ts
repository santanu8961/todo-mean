import {Injectable} from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import { Todo } from '../Todo';

@Injectable()
export class TodoService{
    constructor(private _http:Http){
        

    }

    getTodos(){
        return this._http.get('/api/v1/todos')
        .map(res => res.json());
    }

    saveTodo(todo:Todo){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post('/api/v1/todo',JSON.stringify(todo),{headers: headers});
    }
    updateTodo(todo:any){
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log(todo)
        return this._http.post('/api/v1/todo/'+todo._id,JSON.stringify(todo),{headers: headers});
    }
    deleteTodo(id:any){
        console.log();
        return this._http.delete('/api/v1/todo/'+id)
        .map(res =>{res.json()});
    }
}
