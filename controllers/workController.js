
const User = require("../models/UserSchema")
const Work = require("../models/WorkSchema")

const workController = {

    getWorks:async(req,res)=>{
        const userid = req.params.userid;
        console.log('myuser',userid)
 
        try {
            const works = await Work.find({ user: userid });
            res.send(works);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
  }
    },
    getWorksall:async(req,res)=>{
        const userid = req.params.userid;
        console.log("withoutd",userid)
        try {
            const worksall=await Work.find({ user: { $ne: userid } })
            res.send(worksall);
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
  }

       

    },

    addWork: async (req, res) => {
        console.log('hello','hello')
        const { title,description, price, userid,mediaPath } = req.body
        if (!userid)
            res.status(400).json({ message: "missing fields" })
        if (!description || !title )
            res.status(400).json({ message: "missing fields" })
        const work = await Work.create({ title : title,description: description,  user: userid, price:price,mediaPath:mediaPath })
        const user = await User.findById(userid)
        console.log('work',work)
        if (work)
            if (user)
                user.works.push(work.id)
                await user.save();
        res.status(201).json({ message: "success" , work: work })
    },

    updateWork: async (req, res) => {
        const { title,description, price, _id,mediaPath } = req.body
        if (!_id)
            res.status(400).json({ message: "missing fields" })
        if (!title && !description && !price && !mediaPath)
            res.status(400).json({ message: "missing fields" })

        const work = await Work.findById(_id)
        /* const user = work.user
      
        if (user == userid) { */
            const updatedwork = await Work.findByIdAndUpdate(work.id, {title:title,description: description, price:price,mediaPath:mediaPath})

            res.status(200).json({ message: "success", work: updatedwork })
      /*   } else {
            res.status(401).json({ message: "unauthorized" })
        } */

    },

    deleteWork: async (req, res) => {
        const _id= req.body
        console.log('body',_id)
        if (!_id)
            res.status(400).json({ message: "missing fields" })
    
       // const user = work.user */
     //   if (user == userid) {
        console.log('todelete',_id)
        const work   = await Work.findByIdAndDelete(_id) 

            res.status(200).json({ message: "success", work: work })
     /*    } else {
            res.status(401).json({ message: "unauthorized" })
        } */

    }



}

module.exports = workController
