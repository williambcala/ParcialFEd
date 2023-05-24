const crearTask = async(req,res = express.request) =>{
    const task = new Task(req.body);

    try{
        task.user = req.uid;
        const saved = await task.save();
        res.json({
            ok:true,
            task:saved
        })
    }catch(error){
        res.status(500).json({
            ok:false,
            task: 'error'
        })
    }
}