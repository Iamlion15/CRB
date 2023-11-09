
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
// modal that displays when the token has expired
const ConsumerFileLoadingModal = ({ modalIsOpen, toggleModal }) => {
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-baseline justify-content-center my-4" style={{ minHeight: "100vh" }}>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <p className='font-monospace'>loading file...</p>
                    </div>
                    <div className='m-0 p-0'>
                    <div className="progress">
                            <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width:"100%"}}></div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}

export default ConsumerFileLoadingModal;
