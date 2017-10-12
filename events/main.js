var vm1 = new Vue({
    el:"#event-1",
    data:{count:0}
})
var vm2=new Vue({
    el:"#event-2",
    data:{
        message:"lol"
    },
    methods:{
        greet:function(envetn){
            alert("Hello: "+this.message)
            if(event){
                alert(event.target.tagName)
            }
        }
    }
})