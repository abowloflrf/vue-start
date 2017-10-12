var vm=new Vue({
    el:"#watch-example",
    data:{
        question:"",
        answer:"Waiting for you to stop typing...",
    },
    watch:{
        question:function(){
            this.answer="Waiting for you to stop typing...",
            this.getAnswer()
        }
    },
    methods:{
        //_.debounce用户限制执行频率
        getAnswer:_.debounce(
            function(){
                if(this.question.indexOf('?')===-1){
                    this.answer="Questions usually contain a question mark. ;-)"
                    return
                }
                this.answer="Thinking..."
                var vm2=this
                axios.get('https://yesno.wtf/api')
                .then(function(response){
                    vm2.answer=_.capitalize(response.data.answer)
                })
                .catch(function(error){
                    vm2.answer="Error:"+error
                })
            },
            500
        )
    }
})

