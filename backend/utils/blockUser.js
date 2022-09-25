const blockUser=(user)=>{
    if(user?.isBlocked){
        throw new Error(`Access Denied ${user?.firstName} You are blocked`)
    }
}

module.exports=blockUser