import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll =()=>{
    const req =axios.get(baseUrl)
    return req.then(res=>res.data).catch(err=>console.log(err))
}

const createNumber = (newObj)=>{
    const req = axios.post(baseUrl, newObj)
    return req.then(res=>res.data).catch(err=>console.log(err))
}

const deleteNumber = (obj)=>{
    const delUrl = baseUrl+`/${obj.id}`
    const req = axios.delete(delUrl)
    return req.then(res=>console.log(res.data)).catch(err=>console.log(err))
}
export default {getAll, createNumber, deleteNumber}