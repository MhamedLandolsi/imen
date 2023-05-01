import * as React from "react";
import {useState} from "react";

export default function DataTable(props) {
    const [page, setPage] = useState(0);
    const limit = 10;
    const total = props.data.length;
    let toShow = page * limit + limit;
    if (toShow > total) {
        toShow = total;
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-12 col-md-8">
                    <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">
                        Showing {page * limit + 1} to {toShow} of {total} entries
                    </div>
                </div>
                {(total > limit) &&
                <div className="col-sm-12 col-md-3">
                    <div className="dataTables_paginate paging_simple_numbers">
                        <ul className="pagination">
                            {[...Array((Math.ceil(total / limit)))].map((i, item) => (
                                <li className="paginate_button page-item" key={item}>
                                    <a className={'page-link' + (item === page ? ' active' : '')}
                                       onClick={() => setPage(item)}
                                    >
                                        {item + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                }
            </div>
            <div className="table-responsive">
                <table className="table table-bordered datatable" width="100%" cellSpacing="0">
                    <thead>
                    <tr>
                        {props.head.map((h, i) =>
                            (<th key={i}>{h}</th>)
                        )}

                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        {props.head.map((h, i) =>
                            (<th key={i}>{h}</th>)
                        )}
                    </tr>
                    </tfoot>
                    <tbody>
                    {props.data.length > 0 ? props.data.slice(page * limit, page * limit + limit).map((it, i) => (
                        <tr key={i}>
                            {it.map((item, j) => (
                                <td key={j}>
                                    {item}
                                </td>
                            ))}
                        </tr>
                    )) : <tr><td colSpan={props.head.length} style={{textAlign:'center'}}> Data was not supplied. </td></tr>}
                    </tbody>
                </table>
            </div>
        </>
    )

}
