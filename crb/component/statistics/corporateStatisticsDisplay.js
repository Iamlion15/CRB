import { useState } from "react";
import ErrorReportedExcel from "../../Helpers/generateExcel";
import MissingFileModal from "../Modals/MissingFileModal";
import { corporateCreditInformationRecord } from "../../constants/dataStructure";

const CorporateStatisticsDisplay = ({ statistics, toggleErrorModal, showDownload, data, errorInfo, file, onStart }) => {
    const [isMissingFileModalOpen, setMissingFileModalOpen] = useState(false)

    const toggleModal = () => {
        setMissingFileModalOpen(!isMissingFileModalOpen)
    }
    const prepareErrorneousData = () => {
        return new Promise((resolve, reject) => {
            const erroneousData = [];
            erroneousData.length = 0;

            for (let i = 0; i < file.length; i++) {
                corporateCreditInformationRecord.institutionName = file[i][0];
                corporateCreditInformationRecord.tradingName = file[i][1];
                corporateCreditInformationRecord.taxNo = file[i][2];
                corporateCreditInformationRecord.vatNo = file[i][3];
                corporateCreditInformationRecord.companyRegNo = file[i][4];
                corporateCreditInformationRecord.companyRegistrationDate = file[i][5];
                corporateCreditInformationRecord.companyCeaseDate = file[i][6];
                corporateCreditInformationRecord.industry = file[i][7];
                corporateCreditInformationRecord.postalAddressLine1 = file[i][8];
                corporateCreditInformationRecord.postalAddressLine2 = file[i][9];
                corporateCreditInformationRecord.postalCode = file[i][10];
                corporateCreditInformationRecord.physicalAddressLine1 = file[i][11];
                corporateCreditInformationRecord.physicalAddressLine2 = file[i][12];
                corporateCreditInformationRecord.physicalAddressPostalCode = file[i][13];
                corporateCreditInformationRecord.physicalAddressPlotNumber = file[i][14];
                corporateCreditInformationRecord.physicalAddressProvince = file[i][15];
                corporateCreditInformationRecord.physicalAddressDistrict = file[i][16];
                corporateCreditInformationRecord.physicalAddressSector = file[i][17];
                corporateCreditInformationRecord.physicalAddressCell = file[i][18];
                corporateCreditInformationRecord.country = file[i][19];
                corporateCreditInformationRecord.emailAddress = file[i][20];
                corporateCreditInformationRecord.telephone1 = file[i][21];
                corporateCreditInformationRecord.telephone2 = file[i][22];
                corporateCreditInformationRecord.telephone3 = file[i][23];
                corporateCreditInformationRecord.telephone4 = file[i][24];
                corporateCreditInformationRecord.telephone5 = file[i][25];
                corporateCreditInformationRecord.telephone6 = file[i][26];
                corporateCreditInformationRecord.facsimile1 = file[i][27];
                corporateCreditInformationRecord.facsimile2 = file[i][28];
                corporateCreditInformationRecord.accountNumber = file[i][29];
                corporateCreditInformationRecord.oldAccountNumber = file[i][30];
                corporateCreditInformationRecord.accountType = file[i][31];
                corporateCreditInformationRecord.accountStatus = file[i][32];
                corporateCreditInformationRecord.classification = file[i][33];
                corporateCreditInformationRecord.accountOwner = file[i][34];
                corporateCreditInformationRecord.jointLoanParticipants = file[i][35];
                corporateCreditInformationRecord.currencyType = file[i][36];
                corporateCreditInformationRecord.dateAccountOpened = file[i][37];
                corporateCreditInformationRecord.dateAccountUpdated = file[i][38];
                corporateCreditInformationRecord.termsDuration = file[i][39];
                corporateCreditInformationRecord.accountRepaymentTerm = file[i][40];
                corporateCreditInformationRecord.openingBalance = file[i][41];
                corporateCreditInformationRecord.currentBalance = file[i][42];
                corporateCreditInformationRecord.availableCredit = file[i][43];
                corporateCreditInformationRecord.currentBalanceIndicator = file[i][44];
                corporateCreditInformationRecord.scheduledPaymentAmount = file[i][45];
                corporateCreditInformationRecord.actualPaymentAmount = file[i][46];
                corporateCreditInformationRecord.amountPastDue = file[i][47];
                corporateCreditInformationRecord.installmentsInArrears = file[i][48];
                corporateCreditInformationRecord.daysInArrears = file[i][49];
                corporateCreditInformationRecord.dateClosed = file[i][50];
                corporateCreditInformationRecord.lastPaymentDate = file[i][51];
                corporateCreditInformationRecord.interestRateAtDisbursement = file[i][52];
                corporateCreditInformationRecord.firstPaymentDate = file[i][53];
                corporateCreditInformationRecord.nature = file[i][54];
                corporateCreditInformationRecord.category = file[i][55];
                corporateCreditInformationRecord.sectorOfActivity = file[i][56];
                corporateCreditInformationRecord.approvalDate = file[i][57];
                corporateCreditInformationRecord.finalPaymentDate = file[i][58];
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
                    ErrorReportedExcel(result, "ERROR IN CORPORATE")
                } catch (error) {
                    console.log(error);
                }
            }
        }
        else {
            ErrorReportedExcel(data, "ERROR IN CORPORATE")
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


export default CorporateStatisticsDisplay;