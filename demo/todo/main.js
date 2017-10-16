var STORAGE_KEY="todo_vue"
var todoStorage={
    fetch:function(){

    },
    save:function(todos){

    }
}
var app= new Vue({
    data:{
        todos:todoStorage.fetch(),
        newTodo:'',
        editTodo:null,
        visibility:'all'
    }
})