import client from "../../Client"

export const userManagerState = {
    state: {users: []}, // initial state
    reducers: {
        setUsersList: (state, payload) => {
            return {
                users: payload
            }
        },
    },
    effects: (dispatch) => ({
        async getUserListAction() {
            dispatch.loadingState.toggleLoding()
            try {
                const data = (await client().get('/api/user_list')).data
                this.setUsersList(data.entities)
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return true
        },
        async saveUpdateUser({username, name,admin, doors}){
            dispatch.loadingState.toggleLoding()
            let userData = new FormData()
            userData.append('username', username)
            userData.append('name', name);
            userData.append('is_admin', admin ? '1' : '0');
            userData.append('doors', doors);
            try {
                await client().post('/api/update_user',userData)
                await this.getUserListAction();
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding();
            }
            return true;
        },
        async registerUser({username, name, password}){
            dispatch.loadingState.toggleLoding();
            let userData = new FormData();
            userData.append('username', username);
            userData.append('name', name);
            userData.append('password', password);
            try {
                await client().post('/api/register',userData)
                await this.getUserListAction();
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding();
            }
            return true;
        },
        async delete({code}){
            dispatch.loadingState.toggleLoding();
            let userData = new FormData();
            userData.append('username', code);

            try {
                await client().post('/api/delete_user',userData)
                await this.getUserListAction();
            } catch (e) {
                if(e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding();
            }
            return true;
        }
    })
}
