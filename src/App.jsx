import Home from "../components/Home"
import About from "../components/About"
import Contact from "../components/Contact"
import Resume from "../components/Resume"
import { Route, Routes } from "react-router"
export default function APP(){

  return(<Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/About" element={<About />}/>
    <Route path="/Contact" element={<Contact />}/>
    <Route path="/Resume" element={<Resume />}/>
  </Routes>)
}