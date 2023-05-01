import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {store} from "./store"
import App from './App'
import Loader from './component/atom/loader'
import 'bootstrap/dist/css/bootstrap.min.css'
import './static/sb-admin-2.min.css'
import './static/all.css'

export default function StartPoint() {

}
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Loader/>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('react')
)
