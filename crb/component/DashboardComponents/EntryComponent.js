import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";


const EntryComponent = ({ button1, button2, actiona, actionb, name,color,icon,message }) => {
    return (
        <>
            <div className="card rounded-3 shadow-sm">
                <div className="d-flex flex-column">
                    <div>
                        <div className="d-flex align-items-center justify-content-center mt-3">
                            <button className="btn btn-primary " id={name}>{name}</button>
                            <UncontrolledPopover
                                placement="top"
                                target={name}
                                trigger="focus"

                            >
                                <PopoverHeader>
                                    <p className='d-flex justify-content-center'>choose action</p>
                                </PopoverHeader>
                                <PopoverBody>
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-warning" onClick={()=>actiona(`${name.toLowerCase()}`)}>
                                            {button1}
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={()=>actionb(`${name.toLowerCase()}`)}>
                                            {button2}
                                        </button>
                                    </div>

                                </PopoverBody>
                            </UncontrolledPopover>
                        </div>

                    </div>
                    <div className="d-flex flex-row mt-4">
                        <div className={`card rounded-3 shadow ${color}`} style={{ height: "50px", marginRight: '20px', marginLeft: '5px', marginBottom: "40px" }}>
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                            <i className="bi bi-exclamation-triangle-fill mx-4"></i>
                            </div>
                        </div>
                        <div className="d-flex flex-column mt-2">
                            <p className="font-monospace text-dark mx-2">{message}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default EntryComponent;


