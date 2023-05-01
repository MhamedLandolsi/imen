export const loadingState = {
    state: { isloading: false }, // initial state
    reducers: {
      toggleLoding(state){
        return  {
            isloading: !state.isloading
        }
      }
    },
}

