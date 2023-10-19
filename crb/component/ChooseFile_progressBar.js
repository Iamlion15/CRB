

const ChooseFile = ({ showAdding, handleChange, displayFile, remove, hasSendingStarted, postData, handleStopSendingData, loading, percentage, showPostingButton, message, isFileFormatNotValid,displayMenu }) => {
    return (
        <>
            <div className="card mt-3 mx-3 shadow">
                <div className="card-body">
                    {/* showAdding is by default true but after the file being selected  it is turned to false to hide this choose file */}
                    {showAdding && <div className="d-flex justify-content-center">
                        <input type="file" className="custom-file-input" id="customFile" hidden onChange={(e) => handleChange(e)} />
                        <label className="custom-file-label btn btn-primary" htmlFor="customFile" style={{ width: '300px' }} >
                            Choose file
                        </label>
                    </div>}
                    <div>
                        {/* display file condition rendering is used to show and hide the button of posting the data to the backend */}
                        {displayMenu && (
                            <div>
                                {isFileFormatNotValid && (
                                    <div className="alert alert-danger mt-2">
                                        <p><strong>{message}</strong></p>
                                    </div>
                                )}

                                <h4 className="text-muted">Selected File:</h4>
                                <div className="row">
                                    <div className="col">
                                        <p className="LEAD">{displayFile.name}</p>
                                    </div>
                                    <div className="col">
                                        <button className="btn btn-outline-danger btn-sm" onClick={remove} disabled={hasSendingStarted}>remove</button>
                                    </div>
                                </div>
                                {showPostingButton && (
                                    <div className="d-flex justify-content-center">
                                        {!hasSendingStarted && <button className="btn btn-primary btn-sm mt-3" onClick={postData}>POST DATA</button>}
                                        {hasSendingStarted && <button className="btn btn-primary btn-sm mt-3" onClick={handleStopSendingData}>CANCEL</button>}
                                    </div>
                                )}

                            </div>
                        )}
                    </div>
                </div>
                {/* this is used to show the loading bar */}
                <div className="my-2">
                    {loading && (<div className="progress">
                        <div className="progress-bar" role="progressbar" style={{ width: `${percentage}%` }}>{percentage}%</div>
                    </div>)}
                </div>
            </div>
        </>
    )
}



export default ChooseFile;