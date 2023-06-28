import axios from 'axios'
const rootUrl = process.env.NODE_ENV === "production" ? "https://social-media-api.adaptable.app" : ""

  
export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${rootUrl}/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${rootUrl}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${rootUrl}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${rootUrl}/api/${url}`, post, {
        headers: { Authorization: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${rootUrl}/api/${url}`, {
        headers: { Authorization: token}
    })
    return res;
}