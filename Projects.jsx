import { projects } from "./ProjectsArray"

export default function Projects(props){

    const project = projects.map((project, index) => (
            <div key={index} className="project-container">

            <div>
                <h2>{project.name}</h2>
                <p>{project.description}</p>
                <a href={project.link} target="blank">
                <button className="view-btn" >View Project</button>
                </a>
                
            </div>
            <img src={project.img} alt={`${project.name} screenshot`} />
            
            </div>   
    ))
    return(
       < >
        {project}
        </>
    )
}