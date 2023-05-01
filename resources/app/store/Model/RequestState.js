import client from "../../Client"

export const requestState = {
    state: {request: []}, // initial state
    reducers: {
        setRequestList: (state, payload) => {
            return {
                request: payload
            }
        },
    },
    effects: (dispatch) => ({
        async getRequestListAction() {
            dispatch.loadingState.toggleLoding()
            try {
                const data = (await client().get('/api/request/get')).data
                this.setRequestList(data.entities)
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return []
        },
        async validateRequest({id, validation}){
            dispatch.loadingState.toggleLoding()
            let data = new FormData()
            data.append('validation', validation)
            data.append('request_id', id)
            try {
                await client().post('/api/request/validation',data)
                await this.getRequestListAction()
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return true
        },
    })
}

