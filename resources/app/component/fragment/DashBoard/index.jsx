import * as React from 'react'
import {useEffect} from 'react'
import store from "../../../store"
import {connect} from "react-redux"
import DataTable from "../../atom/DataTable";

function DashBoard(props) {
    useEffect(() => {
        store.dispatch.logState.getLogListAction().then(() => {})
    }, [])

    return (
        <>
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">DashBoard</h1>
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h6 className="m-0 font-weight-bold text-primary">Access Log History</h6>
                </div>
                <div className="card-body">
                    <div className="card-body">
                        <div className="table-responsive">
                            <DataTable
                                head={['Locker code', 'User Username', 'Authorized', 'Date']}
                                data={props.log.map((item) => {
                                    return [
                                        item.rasberry_pi_code,
                                        item.username, item.accept ? 'YES' : 'NO',
                                        item.date
                                    ]
                                })
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


const mapState = (state) => ({
    log: state.logState.log
})
export default connect(mapState, null)(DashBoard)
