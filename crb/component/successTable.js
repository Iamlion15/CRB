

const SuccessTable = ({successInfo,tableRef}) => {
    return (
        <>
            <div className="card mt-4 mx-3" style={{ height: '50vh', overflowY: 'auto' }}>
                <table className="table table-striped" style={{ maxHeight: '100%' }} ref={tableRef}>
                    <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                        <tr>
                            <th>Account number</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {successInfo.map((msg, index) => (
                            <tr key={index}>
                                <td>{msg.accountNumber}</td>
                                <td>{msg.message}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              
            </div>

        </>
    )
}


export default SuccessTable