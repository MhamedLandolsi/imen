import axios from "axios"

function client(){
    const instance = axios.create()
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + user.token
    }
    return instance

}

export default client
