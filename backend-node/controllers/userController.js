import User from "../models/User.js"


export const getAllStudent = async (req, res) => {
  try {
    const students = await User.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(404).send(err.message);
  }
};

export const getuserbyId = async(req,res)=>{
  try{
    const id = req.params.userID;
    const user = await User.findById(id);
    if(!user){
      return res.status(404).send("user not found")
    }
    return res.status(200).json(user)
  }catch(err){
    return res.status(200).send(err.mmessage)
  }
}