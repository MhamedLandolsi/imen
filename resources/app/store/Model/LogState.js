import client from "../../Client";

export const logState = {
    state: {log: []}, // initial state
    reducers: {
        setLogList: (state, payload) => {
            return {
                log: payload
            };
        },
    },
    effects: (dispatch) => ({
        async getLogListAction() {
            dispatch.loadingState.toggleLoding();
            try {
                const data = (await client().get('/api/logs')).data
                this.setLogList(data.entities)
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding();
            }
            return [];
        },
    })
}

