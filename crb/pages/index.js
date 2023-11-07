import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import EntryComponent from '../component/DashboardComponents/EntryComponent';
import axios from 'axios';
import Router from 'next/router';

const Homepage = () => {

const startNewSession=async(name)=>{
  console.log("HELLOOO ");
  const route=name.toLowerCase();
  try {
    const response=await axios.get(`http://localhost:2000/api/crb/${route}/initialise`)
    Router.push(`${route}`)
  } catch (error) {
    console.log(error)
  }
}

const continueFromPrevious=(name)=>{
  const route=name.toLowerCase();
  Router.push(`${route}`)
}


  return (
    <>
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className='d-flex flex-row'>
        <div className='mx-5'>
                <EntryComponent name="COLLATERAL" button1="Start new session" message='collateral data only' color="bg-danger"  button2="Continue from previous session" actiona={startNewSession} actionb={continueFromPrevious}/>
              </div>
              <div className='mx-5'>
                <EntryComponent name="CORPORATE" button1="Start new session" message='corporate data only' color="bg-success"  button2="Continue from previous session" actiona={startNewSession} actionb={continueFromPrevious}/>
              </div>
              <div className='mx-5'>
                <EntryComponent name="CONSUMER" button1="Start new session" message='consumer data only' color="bg-warning"  button2="Continue from previous session" actiona={startNewSession} actionb={continueFromPrevious}/>
              </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
