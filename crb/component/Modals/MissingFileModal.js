import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
} from 'reactstrap';
const MissingFileModal = ({ modalIsOpen, toggleModal }) => {
    return (
        <div>
            <Modal isOpen={modalIsOpen} toggle={toggleModal} className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
                <ModalBody>
                    <div className='d-flex justify-content-center'>
                        <p className='font-monospace'>Missing file</p>
                        <p className='font font-monospace'> insert a file ......</p>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>
                        <p className='font-monospace'>close</p>
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default MissingFileModal;
