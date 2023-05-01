import client from "../../Client"

export const doorState = {
    state: {doors: []}, // initial state
    reducers: {
        setDoorsList: (state, payload) => {
            return {
                doors: payload
            }
        },
    },
    effects: (dispatch) => ({
        async getDoorsListAction() {
            dispatch.loadingState.toggleLoding()
            try {
                const data = (await client().get('/api/all_doors')).data
                this.setDoorsList(data.entities)
                return data.entities
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return []
        },
        async saveUpdateDoor({code, description}){
            dispatch.loadingState.toggleLoding()
            let formData = new FormData()
            formData.append('rasberry_pi_code', code)
            formData.append('description', description)
            try {
                await client().post('/api/create_door',formData)
                await this.getDoorsListAction()
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return true
        },
        async delete({code}){
            dispatch.loadingState.toggleLoding()
            let formData = new FormData()
            formData.append('rasberry_pi_code', code)
            try {
                await client().post('/api/delete_door',formData)
                await this.getDoorsListAction()
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return true
        }
    })
}

