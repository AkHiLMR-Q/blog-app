import { serverURL } from "./serverURL.js";
import { commonAPI } from "./commonAPI.js";


//register API call
export const registerAPI=async(user)=>{
    return await commonAPI("post",`${serverURL}/register`,user,"")
};

//login  API call
export const loginAPI=async(user)=>{
    return await commonAPI("post",`${serverURL}/login`,user,"")
};

//add project api call
export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${serverURL}/project/add-project`,reqBody,reqHeader)
}

//get homeproject api call

export const getHomeProjectAPI=async()=>{
    return await commonAPI("get",`${serverURL}/project/home-project`,"","")
}

//get all users project api call

export const getUsersProjectAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("get",`${serverURL}/project/all-user-project?search=${searchKey}`,"",reqHeader)
}

//get perticular user project api call
export const getAUsersProjectAPI=async(reqHeader)=>{
    return await commonAPI("get",`${serverURL}/project/get-auser-project`,"",reqHeader)
}

//delete perticular user project api call
export const deleteAUserProjectAPI=async(projectId,reqHeader)=>{
    return await commonAPI("delete",`${serverURL}/project/delete-user-project/${projectId}`,{},reqHeader)
}

//update a user project api call
export const updateAUserProjectAPI=async(projectId,reqBody,reqHeader)=>{
    return await commonAPI("put",`${serverURL}/project/update-user-project/${projectId}`,reqBody,reqHeader)
}

