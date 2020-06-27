import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll =()=>{
    const req =axios.get(baseUrl)
    return req.then(res=>{
        console.log(res.data)
        return res.data
    }).catch(err=>console.log(err))
}

const createNumber = (newObj,setNotification)=>{
    console.log(newObj)
    const req = axios.post(baseUrl, newObj)
    //should return the new object that was created
    return req.then(res=>{
        setNotification(`${newObj.name} has been added successfully`)
        console.log(res.data)
        return res.data
    }).catch(err=>console.log(err))
}

const deleteNumber = (obj, setNotification)=>{
    const delUrl = baseUrl+`/${obj.id}`
    const req = axios.delete(delUrl)
    return req.then(res=>{
        setNotification(`${obj.name} has been deleted successfully`)
        return res.data
    }).catch(err=>console.log(err))
}

const updateNumber = (obj,setNotification)=>{
    const putUrl = baseUrl+`/${obj.id}`
    const req = axios.put(putUrl,obj)
    return req.then(res=>{
        setNotification(`${obj.name} has been updated successfully`)
        return res.data
     }).catch(err=> console.log(err))
}

export default {getAll, createNumber, deleteNumber, updateNumber}