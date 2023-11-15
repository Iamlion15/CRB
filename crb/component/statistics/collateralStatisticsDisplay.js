import { useState } from "react";
import ErrorReportedExcel from "../../Helpers/generateExcel";
import MissingFileModal from "../Modals/MissingFileModal";

const StatisticsDisplay = ({ statistics, toggleErrorModal, showDownload, data, errorInfo, file, onStart }) => {
    const [isMissingFileModalOpen, setMissingFileModalOpen] = useState(false)

    const toggleModal=()=>{
        setMissingFileModalOpen(!isMissingFileModalOpen)
    }
    const prepareErrorneousData = () => {
        return new Promise((resolve, reject) => {
            const erroneousData = [];
            erroneousData.length = 0;
            const dataStructure = {
                accountNumber: "",
                collateralExpiryDate: "",
                collateralValue: "",
                collateralLastValuationDate: "",
                collateralType: "",
                Collateral_ID: "",
            }
            for (let i = 0; i < file.length; i++) {
                dataStructure.accountNumber = file[i][0]
                dataStructure.collateralExpiryDate = file[i][1]
                dataStructure.collateralValue = file[i][2]
                dataStructure.collateralLastValuationDate = file[i][3]
                dataStructure.collateralType = file[i][4]
                dataStructure.Collateral_ID = file[i][5]
                for (let a = 0; a < errorInfo.length; a++) {
                    if (errorInfo[a].collateralId === file[i][5]) {
                        erroneousData.push(dataStructure);
                        break;
                    }
                }
            }
            resolve(erroneousData);
        });
    };

    const downloadErrorneousFile = async (e) => {
        e.preventDefault();
        if (onStart === true) {
            if (file.length === 0) {
                toggleModal()
            }
            else {
                try {
                    const result = await prepareErrorneousData();
                    console.log("results", result);
                    ErrorReportedExcel(result, "ERROR IN COLATERAL")
                } catch (error) {
                    console.log(error);
                }
            }
        }
        else {
            ErrorReportedExcel(data, "ERROR IN COLATERAL")
        }
    }


    return (
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
                                <button className="btn btn-primary" onClick={() => toggleErrorModal()}>View error details</button>
                            )}
                        </div>
                        <div>
                            {showDownload && (
                                <button className="btn btn-primary" onClick={(e) => downloadErrorneousFile(e)}>Download erroneous data</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <MissingFileModal
                    toggleModal={toggleModal}
                    modalIsOpen={isMissingFileModalOpen} />
            </div>
        </>
    )
}


export default StatisticsDisplay;