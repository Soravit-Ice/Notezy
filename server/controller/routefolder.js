const router = require('express').Router();
const db = require('../model/config');

const Folder = db.folder
const Note = db.note

router.get("/getallfoldernotezy/:id" , async (req ,res) => {
    const user_id = req.params.id;
    console.log(user_id)
    if(user_id !== null){
        const noteUser =  await Folder.findAll({where: {userId : user_id}}).then((data) =>{
            if(!data){
                res.json({data : "note not found"})
            }else{
                res.json({data : data})
            }
        });
    }else{
        res.json({data : "user not found"})
    }
});


router.post("/createfoldernotezy" , (req ,res ) => {
    console.log(req.body)
    const { nameFolder  , userId } = req.body;
    if(!nameFolder.trim() && !userId.trim()){
        res.json({data : "body not null"})
    }else{
        Folder.create({
            nameFolder: nameFolder,
            userId: userId,
        }).then(() => {
            res.json({data : "success"})
        }).catch( (err) => {
            if(err){
                console.log(err)
            res.json({data : "error"})
            }
        })
    }
    
})

router.put("/updatefoldernotezy" , (req , res) => {
    const {nameFolder , folderId , userId} = req.body
    if(!nameFolder.trim() && !folderId.trim() && !userId.trim()){
        res.json({data : "body not null"})
    }else{
        Folder.update({
                nameFolder:nameFolder,
        },{
            where : {folderId: folderId , userId:userId}
        }).then( () => {
            res.json({data : "success update"})
        }).catch((err) =>{
            res.json({error : err})
        })
    }
})

router.delete("/deletefoldernotezy"  , async (req, res) =>{
    const {folderId , userId} = req.body
    console.log("delete "+folderId)
    if(folderId !== null , userId !== null){
            await Folder.destroy({
                where : {folderId : folderId , userId:userId}
            }).then( async ()=>{
                await Note.destroy({
                    where : {folderId:folderId , userId:userId}
                }).then(()=>{
                    console.log("success to del AllNote")
                }).catch(err => {
                    console.log(err)
                })

                
                res.json({data : "success data deleted"})
            }).catch((err) =>{
                res.json({data : err})
            })
    }else{
        res.json({data : "id not null"})
    }

})


module.exports = router