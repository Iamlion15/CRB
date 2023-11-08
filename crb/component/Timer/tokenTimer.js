import { useState, useEffect } from "react";

const TokenTimer = ({ toggleExpirationTokenModal,loginHandler,refresh }) => {
  const [minutes, setMinutes] = useState();
  const [activateBlinking, setActivateBlinking] = useState(false)
  const keyframes = `
    @keyframes blink {
      0% { background-color: red; }
      50% { background-color: transparent; }
      100% { background-color: red; }
    }
  `;

  const cardHeaderStyles = {
    animation: 'blink 2s infinite', // Use the defined "blink" animation
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const loggedInTime = new Date(parseInt(localStorage.getItem("loginTime"), 10));
      const currentTime = new Date();
      const timeDiff = Math.floor((currentTime - loggedInTime) / (60 * 1000));
      const remainingTime = 1 - timeDiff
      setMinutes(remainingTime);
      if (remainingTime >= 1) {
        // if (remainingTime >= 0 && remainingTime <= 5) {
        //   setActivateBlinking(true)
        // } else {
        //   setActivateBlinking(false)
        // }
      }
      else {
        toggleExpirationTokenModal();
        clearInterval(interval)
        loginHandler();
        // Token has expired
      }
    }, 1000); // Update every minute

    return () => {
      clearInterval(interval); // Cleanup the interval when the component unmounts
    };
  }, [refresh]);


  return (
    <div className="d-flex justify-content-end">
      <div className="card m-0 p-0">
        {/* Include the keyframes within the component */}
        {activateBlinking &&
          (<style>{keyframes}</style>
          )}
        <div className="card-header" style={cardHeaderStyles}>Time left for expiration of token</div>
        <div className="card-body">
          <table className="table table-striped">
            <thead className="bg-dark">
              <tr>
                <th>Hr</th>
                <th>min</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>00</td>
                <td>{minutes}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TokenTimer;
