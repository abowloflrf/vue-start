//全局注册组件
Vue.component('my-component', {
    template: '<span>asd</span>'
})
var vm1 = new Vue({
    el: "#root"
})
//局部注册组件
var template2 = {
    template: "<span>zxc</span>"
}
var vm2 = new Vue({
    el: "#component-2",
    components: {
        'my-component-2': template2
    }
})
//组件内data必须为函数
Vue.component('my-component-3', {
    template: '<button class="button" v-on:click="counter += 1">{{ counter }}</button>',
    data: function () {
        return {
            counter: 0
        }
    }
})
new Vue({
    el: "#component-3"
})
//Prop
Vue.component('child', {
    props: ['message'],
    template: '<span>{{message}}</span>'
})
new Vue({
    el: "#component-4"
})
//Prop验证,为Vue的组件传入一些属性验证规则，若不匹配规则则vue会发出警告
Vue.component('my-component-4', {
    props: {
        //基础类型检测，null可为任何类型
        propA: Number,
        //可为多种类型
        propB: [String, Number],
        //必须且是字符串
        propC: {
            type: String,
            require: true
        },
        //数值且有默认值
        propD: {
            type: Number,
            default: 10
        },
        //对象，默认值由一个工厂函数返回
        propE: {
            type: Object,
            default: function () {
                return {
                    message: 'hello'
                }
            }
        },
        //自定义验证
        propF: {
            validator: function (value) {
                return value > 10
            }
        }
    }
})
//自定义事件
Vue.component("button-counter", {
    template: '<button class="button" v-on:click="incrementCounter">{{counter}}</button>',
    data: function () {
        return {
            //子组件单独计数器
            counter: 0
        }
    },
    methods: {
        //只增加每个子组件的counter
        incrementCounter: function () {
            this.counter += 1
            //挂载一个increment事件，使用v-on:increment以绑定事件
            this.$emit('increment')
        }
    }
})
new Vue({
    el: "#component-5",
    data: {
        //父组件，即模板button-counter的计数器，唯一
        total: 0
    },
    methods: {
        //每次子组件执行increment事件时出发这个incrementTotal事件
        incrementTotal: function () {
            this.total += 1
        }
    }
})