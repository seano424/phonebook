import axios from 'axios'

const baseurl = 'http://localhost:3001/api/persons'

const getAll = async () => {
    const request = axios.get(baseurl)
    const res = await request
    return res.data
}

const create = async (newObj) => {
    const request = axios.post(baseurl, newObj)
    try {
        const response = await request
        return response.data
    } catch (error) {
        console.log(error.response.data)
    }
}

const destroy = (id) => {
    const request = axios.delete(`${baseurl}/${id}`)
    return request
}

const update = async (id, updatedPerson) => {
    const request = axios.put(`${baseurl}/${id}`, updatedPerson)
    const res = await request
    return res.data
}

const exportedObj = { getAll, create, destroy, update }

export default exportedObj
