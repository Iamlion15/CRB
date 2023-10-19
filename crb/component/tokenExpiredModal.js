import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
import Router from 'next/router';
// modal that displays when the token has expired
function MyModal({ modalIsOpen, toggleModal, message }) {
    const NavigateToLogin=(e)=>{
        e.preventDefault();
        Router.push("/crb/authentication")
        toggleModal()
    }
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <p className='lead'>{message}</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={(e)=>NavigateToLogin(e)}>
                        Login to CRB
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MyModal;
