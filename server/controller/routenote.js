const router = require('express').Router();
const db = require('../model/config');




const Note = db.note;
const Folder = db.folder;

router.get("/getallnotezy/:id" , async (req ,res) => {
    const user_id = req.params.id;
    console.log(user_id)
    if(user_id !== null){
        const noteUser =  await Note.findAll({where: {userId : user_id}}).then((data) =>{
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

router.post("/createnotezy" , async (req ,res ) => {
    console.log(req.body)
    const { title , information , userId , folderId } = req.body;
    if(!title.trim() && !information.trim() && !userId.trim()){
        res.json({data : "body not null"})
    }else{
         await Note.create({
            title: title,
            information: information,
            userId: userId,
            folderId: folderId,
        }).then( async () => {
            const totalNote = await countNoteFn(folderId);
            console.log(totalNote)
            await Folder.update({
                countNote: parseInt(totalNote)
            } , { 
                where : {folderId:folderId}
            }).then( () => {
                console.log("update countNote success")
            }).catch( err => {
                console.log(err)
            })
            res.json({data : "success"})
        }).catch( (err) => {
            if(err){
                console.log(err)
            res.json({data : "error"})
            }
        })
    }
    
})

router.put("/updatenotezy" , async (req , res) => {
    const {title , information , noteId , userId} = req.body
    if(!title.trim() && !information.trim() && !noteId.trim()){
        res.json({data : "body not null"})
    }else{
       await Note.update({
                title:title,
                information: information ,
        },{
            where : {noteId: noteId , userId:userId}
        }).then( () => {
            res.json({data : "success update"})
        }).catch((err) =>{
            res.json({error : err})
        })
    }
})

router.delete("/deletenotezy/:idnote"  , (req, res) =>{
    const idNote = req.params.idnote
    console.log("delete "+idNote)
    if(idNote !== null){
            Note.destroy({
                where : {noteId : idNote}
            }).then( ()=>{
                res.json({data : "success data deleted"})
            }).catch((err) =>{
                res.json({data : err})
            })
    }else{
        res.json({data : "id not null"})
    }

})

async function countNoteFn (folderId){
    let totalNote = 0;
    await Note.findAll({
        where : {folderId: folderId}
    }).then( (data) => {
        
        if(data){
        data.forEach( () => {
            totalNote++;
        })
        }
    })
    return totalNote ;
}


module.exports = router