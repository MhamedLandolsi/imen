import { connect } from 'react-redux'
import './loader.css'
 function Loader (props){
    return(
        props.isloading ? <div className="lds-hourglass"/> : ''
    )
}

const mapState = (state) => ({
	 ...state.loadingState
})
export default connect(mapState, null)(Loader)
