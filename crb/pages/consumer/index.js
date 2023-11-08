import { useState } from "react";
import ConsumerFileUpload from  "../../component/MainComponents/consumerFileUpload"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import dotenv from 'dotenv';
dotenv.config()

const CRBDashboard = () => {
    const [refresh,setRefresh]=useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const loginHandler = async () => {
        setModalIsOpen(true)
        try {
            console.log("strarting.......")
            const response = await axios.get("http://localhost:2000/api/crb/tokencrb")
            const loginTime = new Date().getTime();
            console.log(response.data)
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("loginTime", loginTime)
            setModalIsOpen(false)
            setRefresh(!refresh)
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <>
            <ConsumerFileUpload modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} loginHandler={loginHandler} refresh={refresh} />
        </>
    )
}


export default CRBDashboard;