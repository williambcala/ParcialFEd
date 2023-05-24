

const listarPedidos = async(req,res = express.request) =>{
    const pedidos = await PedidosScheme.find()
    .populate('tareas','tittle');

    try{
        res.status(200).json({
            ok:true,
            pedidos,

        })
    }catch(error){
        console.log(error)

        res.status(500).json({
            ok:false,
            msg: 'Eerror'
        })
    }
}