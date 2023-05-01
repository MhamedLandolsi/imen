import axios from "axios"

export const userState = {
    state: {user: JSON.parse(localStorage.getItem('user'))}, // initial state
    reducers: {
        unsetUser: () => {
            localStorage.removeItem('user')
            return {
                user: null
            }
        },
        setUser: (state, payload) => {
            localStorage.setItem('user', JSON.stringify(payload))
            return {
                user: payload
            }
        }
    },
    effects: (dispatch) => ({
        async doLogin({username, password}) {
            let loginData = new FormData()
            loginData.append('username', username)
            loginData.append('password', password)
            dispatch.loadingState.toggleLoding()
            try {
                const data = (await axios.post('/api/login', loginData)).data
                const user = {
                    token: data.authorization.token,
                    ...data.entity
                }
                if(!user.is_admin){
                    return  false
                }
                this.setUser(user)
            } catch (e) {
                return false
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return true
        }
    })
}

