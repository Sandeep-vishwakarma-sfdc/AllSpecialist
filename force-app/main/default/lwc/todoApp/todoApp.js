import { LightningElement,track } from 'lwc';

export default class TodoApp extends LightningElement {
    newTask = '';
    todoTasks = [
        {id:1,name:'Task 1'}
    ];

    updateNewTask(event){
        this.newTask = event.target.value;
    }

    addTaskToList(){
        
    }
}