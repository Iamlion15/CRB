import { useState, useEffect, useRef } from "react";
import readXlsxFile from 'read-excel-file';
import axios from "axios";
import MyModal from "../Modals/tokenExpiredModal";
import ErrorModal from "../Modals/errorModal";
import ErrorTable from "../TableStatusComponents/errorTable";
import SuccessTable from "../TableStatusComponents/successTable";
import CorporateStatisticsDisplay from "../statistics/corporateStatisticsDisplay";
import TokenTimer from "../Timer/tokenTimer";
import ChooseFile from "../FileOperations/ChooseFile_progressBar";
import { SaveStatus, readStatus } from "../../Helpers/save_read_Status";
import ChecklFileFormat from "../../Helpers/checkFileFormat";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { corporateFileFormat } from "../../constants/fileFormat";
import { corporateCreditInformationRecord } from "../../constants/dataStructure";


const CorporateFileUpload = ({ loginHandler, modalIsOpen, setModalIsOpen, refresh }) => {
    //file is used to store the file we are going to send
    //displayFuile is used to store the name of the file for showing it onthe interface
    //loading is a boolean state used to show success table when data is being sent
    //showAdding is a boolean state used to display and hide the button of "select file "
    //successInfo is an array state used to store successfully sent data
    //errorInfo is an array state used to store errored data that needs to be collected
    //percentage is used to show the percentage progress  of the process 
    //showDownload is aboolean state that get triggered when the process has finished to download errorneous data
    //modelIsOpen is a boolean state used to control the opening and closing of the modal
    //statistics state is an object used to hold the successfully transacted data and the erroneous data

    const [file, setFile] = useState([]);
    const [displayFile, setDisplayFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [onStart, setOnStart] = useState(false)
    const [showAdding, setShowAdding] = useState(true)
    const [successInfo, setSuccessInfo] = useState([])
    const [errorInfo, setErrorInfo] = useState([]);
    const [errorData, setErrorData] = useState([]);
    const [percentage, setPercentage] = useState('0')
    const [downloadableErrorData, setDownloadableErrorData] = useState([])
    const [showDownload, setShowDownload] = useState(false);
    const [isFileFormatNotValid, setIsFileFormatNotValid] = useState(false)
    const [errorModalIsOpen, setErrorModalIsOpne] = useState(false)
    const [showSuccessTable, setShowSuccessTable] = useState(false)
    const [showPostingButton, setShowPostingButton] = useState(false);
    const [hasSendingStarted, setHasSendingStarted] = useState(false)
    const [displayMenu, SetDisplayMenu] = useState(false);
    const [showErrorTable, setShowErrorTable] = useState(false)
    const [fileErrorMessage, setFileErrorMessage] = useState('')
    const [statistics, setStatistics] = useState({
        successNumber: '0',
        errorNumber: '0'
    })
    const tableRef = useRef(null); //this use ref is used to point to the success table
    const tableErrorRef = useRef(null); //this use ref is used to point to the error table
    const toastId = useRef(null);//to use it in updating toast messages
    //handle change is a function that helps us get the file from the computer
    const handleChange = async (event) => {
        //start the loader indicating that u have started copying the file
        toastId.current = toast.info("loading file..............", {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: false
        })
        //we get the file and store it in a variable called selectedFile
        const selectedFile = event.target.files[0];
        //we keep the selectedFile in displayFile for it to be used later in displayong file name
        setDisplayFile(selectedFile)
        SetDisplayMenu(true);
        if (selectedFile) {
            //we use a library called read-excel-file to read our excel file and transform it into an array of objects
            readXlsxFile(selectedFile)
                .then((rows) => {
                    // Handle the data from the Excel file (rows)
                    const match = ChecklFileFormat(rows, corporateFileFormat)
                    if (match) {
                        setShowAdding(false)
                        setFile(rows)
                        setShowPostingButton(true);
                    } else {
                        setFileErrorMessage("INVALID FILE FORMAT,FILE FORMAT DONT MATCH COLLATERAL FILE FORMAT")
                        setShowAdding(false)
                        setFile(rows)
                        setShowPostingButton(false);
                        setIsFileFormatNotValid(true)
                    }
                    toast.update(toastId.current, { render: "Complete !", type: toast.TYPE.SUCCESS, autoClose: 2000 })
                })
                .catch((error) => {
                    console.error('Error reading Excel file:', error);
                    setIsFileFormatNotValid(true)
                    setFileErrorMessage("ERROR IN FILE,TRY AGAIN")
                });
        }
    };
    //this is a function that get triggered when remove file is clicked
    const remove = (e) => {
        e.preventDefault()
        setShowAdding(true)
        setLoading(false)
        setDisplayFile(null)
        setShowSuccessTable(false)
        SetDisplayMenu(false)
        setIsFileFormatNotValid(false)
        setFileErrorMessage('')
        successInfo.length = 0
        setStatistics({
            successNumber: '0',
            errorNumber: '0'
        })
        if (!onStart) {
            setShowDownload(false);
            setShowErrorTable(false)
            errorInfo.length = 0
        }
    }
    //toggleModal is used to open up the modal that get shown when the token has expired
    const toggleModal = () => {
        setModalIsOpen(!modalIsOpen);
    };
    //show error modal
    const toggleErrorModal = () => {
        setErrorModalIsOpne(!errorModalIsOpen)
    }
    const handleStopSendingData = () => {
        window.location.reload();//reload the page and it stops evrything
    };
    //post data is the function that is used to send data to crb endpoints
    //errorCounter is used to count data that fails the validation
    //successCounter is used to count data that get successfully transferred
    //recordType is a value used to identify collaterals
    //collateralInformation has the information about collaterals and it is architectured as crb requests
    //tokenPrep is used to remove ""(double quotes) from the token to avoid errors
    //authkey is used to append bearer to token as our key for authorization on sending data
    //
    //
    //for loop
    //we loop intp our file from where it starts ,starting from 1 as 0 contains the colum headers we start at 1 thats where the data starts from to the last element indicated by file.length
    //we loop into each individual item and we go by filling the necessary information where it belong
    // we build an object that crb endpoint accepts 
    //then we keep the two objects in a variable called data
    //
    //try ..catch
    // in try we first send the data to the enbdpoint,we set the headers and the data and send them to the endpoint
    //
    //we first check responseCode of 401 that indicates that the token has expired 
    //if the responseCode is 401 we toggle the modal and go out of the loop
    //
    //if the response code is 600 that indicate that there some validation that are not being met
    //so we increment the errorCOunter
    //we iupdate the statistics state
    //we store the id and the message of the error in erroInfo

    //
    //
    //if that pass we go on sucess 
    //we store the id os the successful transaction into successInfo
    const postData = async () => {
        successInfo.length = 0
        errorInfo.length = 0
        const errorCounter = 0;
        const successCounter = 0;
        errorData.length = 0
        setStatistics({ errorNumber: '0', successNumber: '0' })
        setShowDownload(false)
        const recordType = "CI"
        const token = localStorage.getItem("token")
        // You can access and update the fields of the corporateCreditInformationRecord object as needed.        
        const tokenPrep = token.replace(/"/g, '');
        const authKey = `Bearer ${tokenPrep}`
        for (let i = 1; i < file.length; i++) {
            setHasSendingStarted(true)
            corporateCreditInformationRecord.institution = file[i][0];
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
            const data = { corporateCreditInformationRecord, recordType }
            //calculating the percentage of completed work
            //we calculate the percentage by multiplying the current index with 100 and divide the length of the file minus one
            //we takeaway 1 cause we have started from the 2nd index as the first index was the header
            //if percent is 100 thats when we show the button of downloading errors
            const percent = ((i * 100) / (file.length - 1)).toFixed(2);
            setPercentage(percent);
            if (i === file.length - 1) {
                console.log("executing if ", percent)
                setShowDownload(true);
                setHasSendingStarted(false)
            }
            //checking if it is already saved
            const LoanIdStatus = await readStatus("corporate", file[i][29])
            //console.log(LoanIdStatus.stat);
            if (LoanIdStatus.status === 200) {
                if (LoanIdStatus.data.status === "success") {
                    console.log(LoanIdStatus);
                    continue;
                }
            }
            try {
                const response = await axios.post("https://secure3.crbafrica.com/duv2/data/rw/update/corporatecredit", data, {
                    headers: {
                        Authorization: authKey,
                        "Content-Type": "application/json",
                    }
                })
                //authentication problem
                if (response.data.status === '401') {
                    toggleModal();
                    break;
                }
                if (response.data.responseCode === 600) {
                    setShowErrorTable(true)
                    const error = response.data.recordErrors
                    console.log(error);
                    errorCounter = errorCounter + 1;
                    let errorDetail = []
                    const downloadableData={
                        accountNumber:"",
                        errorMessage:"",
                        fieldName:"",
                        fieldValue:""
                    };
                    for (let i = 0; i < error.length; i++) {
                        downloadableData={
                            accountNumber: collateralInformationRecord.accountNumber,
                            errorMessage: error[i].errorMessage,
                            fieldName: error[i].fieldName,
                            fieldValue: error[i].fieldValue
                        }
                        setDownloadableErrorData((prevDownloadableErrorData)=>[...prevDownloadableErrorData,downloadableData]) 
                        const detail = {
                            errorMessage: error[i].errorMessage,
                            fieldName: error[i].fieldName,
                            erroneousValue: error[i].fieldValue
                        }
                        errorDetail.push(detail)
                    }
                    const statusData = {
                        accountNumber: corporateCreditInformationRecord.accountNumber,
                        status: "failed",
                        errorMessage: error.message,
                        errorData: errorDetail
                    }
                    await SaveStatus("corporate", statusData)
                    setStatistics((prevStatistics) => ({ ...prevStatistics, errorNumber: errorCounter }))
                    console.log(statusData);
                    setErrorInfo((prevErrorInfo) => [...prevErrorInfo, statusData])
                    setErrorData((prevErrorData) => [...prevErrorData, { ...corporateFileFormat, accountNumber: file[i][29] }]);
                }
                else {
                    setShowSuccessTable(true)
                    successCounter = successCounter + 1
                    setStatistics((prevStatistics) => ({ ...prevStatistics, successNumber: successCounter }))
                    setSuccessInfo((prevSuccessInfo) => [...prevSuccessInfo, { accountNumber: file[i][0], message: response.data.message, },]);
                    const statusData = {
                        accountNumber: corporateFileFormat.accountNumber,
                        status: "success"
                    }
                    await SaveStatus("corporate", statusData)
                }
                setLoading(true)
                setOnStart(false)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        // Scroll to the last rows after the component has rendered
        //.current to access the underlying elements DOM
        if (tableRef.current) {
            const table = tableRef.current; //accessing the table DOM
            const lastRows = table.querySelectorAll('tr:last-child'); //selecting the last element of a row in a table
            //if the last row is present scroll down to that view
            if (lastRows.length > 0) {
                lastRows[lastRows.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }

        if (tableErrorRef.current) {
            const table = tableErrorRef.current; //accessing the table DOM
            const lastRows = table.querySelectorAll('tr:last-child'); //selecting the last element of a row in a table
            //if the last row is present scroll down to that view
            if (lastRows.length > 0) {
                lastRows[lastRows.length - 1].scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }
    }, [successInfo, errorInfo]);

    useEffect(async () => {
        try {
            const response = await axios.get("http://localhost:2000/api/corporate/readerrorstatus")
            if (response.data.length !== 0) {
                const error = {
                    accountNumber: "",
                    errorData: []
                }
                const downloadableData = {
                    accountNumber: "",
                    errorMessage: "",
                    fieldName: "",
                    fieldValue: ""
                };
                for (let i = 0; i < response.data.length; i++) {
                    let errorDetail = []
                    for (let a = 0; a < response.data[i].errorData.length; a++) {
                        {
                            errorDetail = [...errorDetail, {
                                errorMessage: response.data[i].errorData[a].errorMessage,
                                fieldName: response.data[i].errorData[a].fieldName,
                                fieldValue: response.data[i].errorData[a].fieldValue
                            }]
                            downloadableData = {
                                accountNumber: response.data[i].accountNumber,
                                errorMessage: response.data[i].errorData[a].errorMessage,
                                fieldName: response.data[i].errorData[a].fieldName,
                                fieldValue: response.data[i].errorData[a].fieldValue
                            }
                            setDownloadableErrorData((prevDownloadableErrorData) => [...prevDownloadableErrorData, downloadableData])
                        }
                        error = {
                            accountNumber: response.data[i].accountNumber,
                            errorData: errorDetail
                        }
                    }
                    setErrorInfo((prevErrorInfo) => [...prevErrorInfo, error])
                }
                console.log(error);

                setShowDownload(true);
                setShowErrorTable(true);
                setOnStart(true)
                console.log(error);
            }

        }
        catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            {/*1.the container div holds all other div followed by the row div ,followed by the col div */}
            <div className="container ">
                <div className="row">
                    <div className="col-md-6">
                        <div className="d-flex justify-content-center">
                            <h3 className="lead">Corporate</h3>
                        </div>
                        {/* choose file component and loader */}
                        <ChooseFile
                            showAdding={showAdding}
                            handleChange={handleChange}
                            displayFile={displayFile}
                            remove={remove}
                            hasSendingStarted={hasSendingStarted}
                            postData={postData}
                            handleStopSendingData={handleStopSendingData}
                            loading={loading}
                            percentage={percentage}
                            showPostingButton={showPostingButton}
                            message={fileErrorMessage}
                            isFileFormatNotValid={isFileFormatNotValid}
                            displayMenu={displayMenu}
                        />
                        {/*  show the table containing the success message */}
                        {showSuccessTable && (
                            <SuccessTable
                                successInfo={successInfo}
                                tableRef={tableRef} />
                        )}
                    </div>
                    {/* this is the begining of another column  */}
                    <div className="col-6">
                        <div>
                            {/* token expiration modal */}
                            <TokenTimer
                                toggleExpirationTokenModal={toggleModal}
                                loginHandler={loginHandler}
                                refresh={refresh}
                            />
                        </div>
                        <CorporateStatisticsDisplay
                            statistics={statistics}
                            toggleErrorModal={toggleErrorModal}
                            showDownload={showDownload}
                            data={errorData}
                            errorInfo={errorInfo}
                            file={file}
                            onStart={onStart}
                        />
                        {/* this is the table that shows the erroneous data  */}
                        {showErrorTable && (
                            <ErrorTable
                                errorInfo={errorInfo}
                                tableErrorRef={tableErrorRef}
                            />
                        )}
                    </div>
                </div>
                {/* TOASTS CONTAINER */}
                <ToastContainer />
                {/* the modal that get opened when the token has expired */}
                <div>
                    <MyModal
                        modalIsOpen={modalIsOpen}
                        toggleModal={toggleModal}
                        message={"wait a bit "}
                    />
                </div>
                {/* error modal  */}
                <div>
                    <ErrorModal
                        modalIsOpen={errorModalIsOpen}
                        toggleModal={toggleErrorModal}
                        data={errorInfo}
                        downloadableRecords={downloadableErrorData}
                    />
                </div>
            </div>
        </>
    );
};

export default CorporateFileUpload;
