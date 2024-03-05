//import project model
const projects = require('../Modals/projectSchema');

exports.addProject = async(req,res)=>{
    console.log('insert the project controller');
     userId = req.payload
    console.log('userId:',userId);

    const projectImage = req.file.filename
    console.log(projectImage);

    const {title,language,github,website,overview} =req.body
    console.log(`${title},${language},${github},${website},${overview},${projectImage},${userId}`);

    try{const existingProject = await projects.findOne({github})
    if(existingProject){
        res.status(406).json('project alrady exist...please add new project')

    }
    else{
        const newProject = new projects({
            title,language,github,website,overview,projectImage,userId
        })
        await newProject.save()

        res.status(200).json(newProject)
    }
    }
    catch(err){
        res.status(401).json(`request failed due to ${err}`)
    }

    

}

//home project


exports.gethomeProject = async(req,res)=>{
    try{
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }catch (err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//get all project
exports.getallProject = async(req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        //reguler expresion , options:'i' - it removes case sencitive
        language:{
            $regex:searchKey,$options:'i'
        }
    }

    try{
        const allPrject = await projects.find(query)
        res.status(200).json(allPrject)
    }catch (err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//userProject
exports.getUserProject = async(req,res)=>{
    try{
        const userId = req.payload
        const userProject = await projects.find({userId})
        res.status(200).json(userProject)
    }catch (err){
        res.status(401).json(`Request failed due to ${err}`)
    }
}

//edit user project
exports.editUserProject = async(req,res)=>{
    const {id} = req.params
    const userId = req.payload
    const{title,language,github,website,overview,projectImage} = req.body
    const uploadProjectImage = req.file?req.file.filename:projectImage

    try {
        const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,website,overview,projectImage:uploadProjectImage,userId},{new:true})

        await updateProject.save()
        res.status(200).json(updateProject)


    } catch (err) {
        res.status(401).json(err)
    }

}

//delete user project
exports.deleteUserProject = async(req,res)=>{
    const {id} = req.params
    try {
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
        
    } catch (err) {
        res.status(401).json(err)
    }
}