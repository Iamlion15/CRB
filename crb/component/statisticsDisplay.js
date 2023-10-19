import ErrorReportedExcel from "../Helpers/generateExcel";

const StatisticsDisplay=({statistics,toggleErrorModal,showDownload,data})=>{
    return(
        <>
             <div className="card mt-3 mx-3 shadow">
                            <div className="card-body">
                                <div>
                                    <div className="d-flex justify-content-center">
                                        <p className="lead">Statistics</p>
                                    </div>
                                    <table className="table table-borderless">
                                        <tbody>
                                            <tr>
                                                <td>Successfully sent : </td>
                                                <td>{statistics.successNumber}</td>
                                            </tr>
                                            <tr>
                                                <td>Error : </td>
                                                <td>{statistics.errorNumber}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-between">
                                <div>
                                    {showDownload && (
                                        <button className="btn btn-primary" onClick={()=>toggleErrorModal()}>View error details</button>
                                    )}
                                </div>
                                <div>
                                {showDownload && (
                                        <button className="btn btn-primary" onClick={()=>ErrorReportedExcel(data,"ERROR IN COLATERAL")}>Download erroneous data</button>
                                    )}
                                </div>
                                </div>
                            </div>
                        </div>
        </>
    )
}


export default StatisticsDisplay;