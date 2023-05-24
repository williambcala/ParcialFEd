const {Schema,model} = require('mongoose')

const TaskScheme = Schema({
    title:{
        type:String,
        required: true
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'Usuario'
    },
},{
    toJSON:{
        virtuals:true
    },
    toOBject:{
        virtuals:true

    }
});

TaskScheme.method('toJson',function(){
    const{__v,_id,...object} = this.toOBject();
    object.id = _id;
    return object;
})

module.exports = model('Task', TaskScheme);