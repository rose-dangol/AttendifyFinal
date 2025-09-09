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
};

export const deleteuserbyId = async(req,res)=>{
  try{
  const id = req.params.userID;
    // First, check if the user exists
    const userExists = await User.findById(id);
    
    if (!userExists) {
      console.log("User not found before deletion attempt for ID:", id);
      return res.status(404).send("User not found");
    }
    // If user exists, then try to delete
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send("User not found after findByIdAndDelete");
    }

    res.status(200).send("User deleted successfully");
  } catch (err) {
    console.error("Error deleting user:", err); // Log the actual error
    res.status(500).send("Server error");
  }
};

export const updateUser = async (req, res) => {
  try{
    const {id}= req.params.userID;
    const updateUser = await User.findByIdAndUpdate(
      id, 
      {$set:req.body},{new:true}
    );
    if(!updateUser){
      return res.status(404).send("Error updating user!");
    }
    return res.send("User updated sucessfully!")
  }catch(error){
    return res.send(500).send("Error");
  }
};
