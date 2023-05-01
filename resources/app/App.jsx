import React from "react";
import ReactDOM from 'react-dom';
import {connect, Provider} from 'react-redux';
import Login from "./component/page/Login";
import Main from "./component/page/Main";
import {store} from "./store";


function App(props) {
    if (!props.user) {
        return (<Login />)
    }else{
        return(
            <Provider store={store}>
            <Main/>
            </Provider>
        )
    }
}

if (document.getElementById('react')) {
    ReactDOM.render(<App />, document.getElementById('react'));
}


const mapState = (state) => ({
	user: state.userState.user
})
export default connect(mapState, null)(App)
