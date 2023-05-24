const{Schema,model} = require('mongoose')

const PedidosSchema = Schema({
    id:{
        type:Number,
        required:true

    },
    fecha:{
        type:Date,
        required:true
    }
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
});

PedidosSchema.virtual('tarea',{
    ref:'Task',
    localField:'id',
    foreignField:'user',
    justOne:false,
})

module.exports = model('Pedido',PedidosSchema);