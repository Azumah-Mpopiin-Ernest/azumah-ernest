import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom"
import About from "./About"
import Projects from "./Projects.jsx"
import Resume from "./Resume"
import Contact from "./Contact"
import React from "react"
import {clsx} from "clsx"
import profileImg from "./profile.png"
export default function App(){
const setScroll = React.useRef(null)
const [projects, setProjects] = React.useState(false)

function toggleProjects(){
  setProjects((prev) => {
    const newState = !prev

    
        setTimeout(() => {
          if(newState){

          if (setScroll.current) {
            setScroll.current.scrollIntoView({
              behavior: "smooth",
            })
          }
        }
          else{
            window.scrollTo({top: 0, behavior : "smooth"})
          }
        }, 100) // allow time for Projects to mount
      
    return newState
  })
  
}

  return(
    <main>
      <section className="hero-section-container" >

      
    <section className="hero-section">

    <div className="profile">
      
      <img src={profileImg} alt="profile-image" />
      
      
      <div className="hero-btn-container">
        <a target="blank" href="https://www.linkedin.com/in/ernest-azumah-48b3a5308/">
        <button>Linkedin</button>
        </a>
        <a target="blank" href="https://github.com/Azumah-Mpopiin-Ernest">
        <button>Github</button>
        </a>
        
      </div>

    </div>

    <div className="about-brief">
      <Router>
      <nav>
        <p></p>
    <ul>

      <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
      <li>About</li>
      </NavLink>
      <NavLink
      to="/Contact"
      className={({ isActive }) => (isActive ? "nav-link active" : "nav-link") }
      >
      <li>Contact</li>
      </NavLink>
      <NavLink
      to="/Resume"
      className={( { isActive }) => (isActive ? "nav-link active" : "nav-link")}
      >
      <li>Resume</li>
      </NavLink>
      
    </ul>
      </nav>

      <Routes>
        <Route path="/" element={<About />}/>
        <Route path="/Contact" element={<Contact />}/>
        <Route path="/Resume" element={<Resume />}/>
        
      </Routes>
    </Router>
    
    </div>

    </section>

    

    <div className="project-btn-container">
      
      <button className="projects-btn" onClick={toggleProjects}>Projects</button>
      <span className="material-symbols-outlined">
        keyboard_arrow_{projects ? "up" : "down"}
      </span>
      
    </div>


    {projects && 

    
      <div ref={setScroll} className={clsx("project-section", projects && "visible")}>
        <Projects
    projects ={ projects }
    
     />
      </div>
    

    }

    

    <footer>
      
    </footer>

    </section>

    

    </main>

  )
}