import client from "../../Client"

export const chatState = {
    state: {chat: [], user: null, index: 0}, // initial state
    reducers: {
        setChatList: (state, payload) => {
            return {
                ...state, chat: payload
            }
        },
        setUser: (state, payload) => {
            return {
                ...state, user: payload
            }
        },
        setIndex: (state, payload) => {
            return {
                ...state, index: payload
            }
        },
    },
    effects: (dispatch) => ({
        async getChatListAction() {
            dispatch.loadingState.toggleLoding()
            try {
                const data = (await client().get('/api/chat/get_chats')).data
                this.setChatList(data.entities)
                return data.entities
            } catch (e) {
                if (e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
                dispatch.loadingState.toggleLoding()
            }
            return []
        },
        async getCurrentChatMessageAction(payload, rootState) {
            if (!rootState.chatState.user) {
                return [];
            }
            try {
                let data = (await client().get('/api/chat/message', {params: {id: rootState.chatState.user}}))
                    .data
                    .entities

                const length = data.length;
                if (length > rootState.chatState.index) {

                    data = data.slice(rootState.chatState.index)
                    this.setIndex(length)

                    return data;

                }

                return [];
            } catch (e) {
                if (e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            } finally {
            }
            return []
        },
        async sendMessage({message, source}, rootState) {
            if (!rootState.chatState.user) {
                return [];
            }
            let formData = new FormData()
            formData.append('message', message)
            formData.append('target', rootState.chatState.user)
            formData.append('source', source)
            try {
                await client().post('/api/chat/send', formData)
            } catch (e) {
                if (e.response.status === 401) {
                    dispatch.userState.unsetUser()
                }
            }
            return true
        },
        mvIndex({count}) {
            this.setIndex(count);
        }
    })
}

