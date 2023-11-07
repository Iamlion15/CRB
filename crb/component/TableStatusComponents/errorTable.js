


const ErrorTable = ({ errorInfo,tableErrorRef }) => {
    return (
        <>
            <div className="card mt-4 mx-3" style={{ height: '30vh', overflowY: 'auto' }}>
                <table className="table table-striped" style={{ maxHeight: '100%' }} ref={tableErrorRef}>
                    <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                        <tr className="bg-danger">
                            <th>Account number</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {errorInfo.map((msg, index) => (
                            <tr key={index}>
                                <td>{msg.accountNumber}</td>
                                <td className="table-danger">{msg.errorMessage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default ErrorTable;