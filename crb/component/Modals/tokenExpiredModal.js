
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import Router from 'next/router';
// modal that displays when the token has expired
function MyModal({ modalIsOpen, toggleModal, message }) {
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <p className='font-monospace'>{message}</p>
                        <p className='font font-monospace'> processing .....</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e)=>NavigateToLogin(e)}>
                        <p className='font-monospace'>Keep on waiting....</p>
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MyModal;
