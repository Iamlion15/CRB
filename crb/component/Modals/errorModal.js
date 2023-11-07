import { useState } from 'react';
import ErrorReportedExcel from '../../Helpers/generateExcel';
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';

const ErrorModal = ({ modalIsOpen, toggleModal, data }) => {
    const [search, setSearch] = useState('')

    const filteredContent = data.filter(error => {
        const searchText = search.toLowerCase()
        const accountNumberLower = error.accountNumber.toLowerCase()
        return accountNumberLower.includes(searchText)
    })


    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={() => toggleModal()} className="d-flex align-items-center justify-content-center" size='lg'>
                <div className='d-flex flex-row justify-content-center'>
                    <p className='lead'>Errors found</p>
                </div>
                <div className="d-flex align-items-center justify-content-between" style={{ marginTop: "30px" }}>
                    <div className="mx-3" style={{ width: "200px" }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary mr-2" onClick={()=>{ErrorReportedExcel(filteredContent,"COLLATERAL")}}>Download</button>
                </div>


                <ModalBody className='mt-5' style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    {filteredContent.map((error) => {
                        return (
                            <div className='d-flex flex-column' key={error.accountNumber}>
                                <hr />
                                <p>{error.accountnumber}</p>
                                <div className='alert alert-success'>
                                    <table className='table table-borderless'>
                                        <tbody>
                                            <tr>
                                                <td><strong>ACCOUNT NUMBER:</strong></td>
                                                <td className='display-6'><strong>{error.accountNumber}</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>ERROR MESSAGE:</strong></td>
                                                <td className='small'><strong>{error.errorMessage}</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>FIELD NAME:</strong></td>
                                                <td>{error.fieldName}</td>
                                            </tr>
                                            <tr className='table-danger'>
                                                <td><strong>ERRONEOUS VALUE:</strong></td>
                                                <td><strong>{error.fieldValue}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => toggleModal()}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ErrorModal;
