var STORAGE_KEY = "todo_vue"
var todoStorage = {
    fetch: function () {
        //从LocalStorage中读取todos数组并转化为JSON对象，若找不到k指定key的数据则返回空数组
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        //遍历每一项对象并添加数据id为数组的下标
        todos.forEach(function (todo, index) {
            todo.id = index
        });
        //为todoStorage对象设置一个uid为todo的个数以供新添加的todo设置id
        todoStorage.uid = todos.length
        return todos
    },
    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}
//根据url过滤
var filters = {
    all: function (todos) {
        return todos
    },
    active: function (todos) {
        return todos.filter(function (todo) {
            return !todo.completed
        })
    },
    completed: function (todos) {
        return todos.filter(function (todo) {
            return todo.completed
        })
    }
}
var app = new Vue({
    data: {
        //获取浏览器的todoStorage
        todos: todoStorage.fetch(),
        //与输入框中的值绑定
        newTodo: '',
        //与双击编辑后的todo对象绑定
        editedTodo: null,
        //默认显示全部
        visibility: 'all'
    },
    watch: {
        todos: {
            //当监听到todos有变化时调用
            handler: function (todos) {
                todoStorage.save(todos)
            },
            //监听的值为对象内部的变化需要加上选项deep:true
            deep: true
        }
    },
    computed: {
        //过滤过的todo
        filteredTodos: function () {
            return filters[this.visibility](this.todos)
        },
        remaining: function () {
            return filters.active(this.todos).length
        },
        allDone: {
            get: function () {
                return this.remaining === 0
            },
            set: function (value) {
                this.todos.forEach(function (todo) {
                    todo.completed = value
                })
            }
        }
    },
    filters: {
        //未完成todo的个数判断显示item还是items
        pluralize: function (n) {
            return n === 1 ? 'item' : 'items'
        }
    },
    methods: {
        //添加一个todo
        addTodo: function () {
            //检查输入的todo是否为空
            var value = this.newTodo && this.newTodo.trim()
            if (!value) {
                return
            }
            //添加到todos数组中
            this.todos.push({
                id: todoStorage.uid++,
                title: value,
                completed: false
            })
            //将输入新todo的输入框置空
            this.newTodo = ''
        },
        //删除一个指定的todo
        removeTodo: function (todo) {
            //splice：a.splice(b,c,d)在数组a的第b的位置向后删除c个元素并添加元素d
            this.todos.splice(this.todos.indexOf(todo), 1)
        },
        //双击一个todo进入编辑状态
        editTodo: function (todo) {
            //beforeEditCache储存编辑前的title以供不保存还原
            this.beforeEditCache = todo.title
            //将当前todo赋值给editedTodo
            this.editedTodo = todo
        },
        //完成编辑一个todo并保存
        doneEdit: function (todo) {
            if (!this.editedTodo) {
                return
            }
            this.editedTodo = null
            todo.title = todo.title.trim()
            if (!todo.title) {
                this.removeTodo(todo)
            }
        },
        //取消编辑，不保存
        cancelEdit: function (todo) {
            this.editedTodo = null
            todo.title = this.beforeEditCache
        },
        //清除所有已完成的todo
        removeCompleted: function () {
            this.todos = filters.active(this.todos)
        }
    },
    //自定义指令
    directives: {
        //自定义指令的参数el:所绑定的元素,binding:对象包含属性[name]指令名，[value]指定绑定值,[oldValue]指令绑定前一个值,[expression]绑定值的字符串形式,[arg]传给指令参数,[modifier]一个包含修饰符的对象
        'todo-focus': function (el, binding) {
            if (binding.value) {
                el.focus()
            }
        }
    }
})
//路由控制。分别显示[全部][未完成][已完成]
function onHashChange() {
    //获取url中的hash，以正则去掉首位的#或#/
    var visibility = window.location.hash.replace(/#\/?/, '')
    //hash是否存在于三个选项之中
    if (filters[visibility]) {
        app.visibility = visibility
    } else {
        //若为找到指定的hash值匹配则修改url的hash值为空，默认可见为全部
        window.location.hash = ""
        app.visibility = 'all'
    }
}
//hashchange时间url最后'#'部分包括'#'发生改变
window.addEventListener('hashchange', onHashChange)
onHashChange()
//vue绑定
app.$mount('.todoapp')