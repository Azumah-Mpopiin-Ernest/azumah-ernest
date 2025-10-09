import pdf from "./AZUMAH-MPOPIIN-ERNEST.pdf"
export default function Resume(){

    return(
        <section className="resume-section">
            <div>
            <h1>Resume</h1>
            <h2>Professional Summary</h2>
            <p>
Self-driven front-end developer with a strong foundation in React and modern JavaScript. 
Passionate about building clean, responsive, and user-focused web applications. Adept at 
problem-solving, learning fast, and adapting across technical and creative fields including 
cybersecurity, design, and digital storytelling. Focused on continuous improvement and 
innovation through personal and collaborative projects.
            </p>

            <h2>Technical Skills</h2>
            <ul>
                <li>Languages: HTML, CSS, JavaScript, Python </li>
                <li>Frameworks & Libraries: React.js, Firebase </li>
                <li>Tools & Platforms: Git, GitHub, Vercel, VS Code, Canva </li>
                <li>Other Interests: Cybersecurity, UI/UX Design, Video Editing </li>
            </ul>
            </div>
            <a href={pdf} download>
                <button>
                    Download Full Resume
                </button>
            </a>
        </section>
    )
}