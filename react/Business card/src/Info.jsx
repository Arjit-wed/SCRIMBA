 import Content from "./Content";
import { IoMdMail } from "react-icons/io";
const Info = () => {
  return (
    <div className="info"> 
    <h1>Laura Smith</h1>
    <h2>Frontend Developer</h2>
    <button className="btn"><IoMdMail className="icon" /> Email</button>
    <Content />
    
    </div>
  )
}

export default Info