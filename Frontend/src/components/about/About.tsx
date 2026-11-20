import './About.css'
import linkedinIcon from "../.././assets/linkedin.svg"
import githubIcon from '../../assets/github.svg'

const About = () => {


    return (
        <>
            <main>
                <div id="about-card">
                    <h1>Sahar Pich</h1>
                    <p>Email: sahar.pich@gmail.com</p>
                    <div className="about-links">
                        <a href="https://www.linkedin.com/in/sahar-pich" className="about-link"><img src={linkedinIcon} /> LinkedIn</a>
                        <a href="https://github.com/sahar-pich" className="about-link"><img src={githubIcon} /> GitHub</a>
                    </div>
                    <p>A ChatGPT style chat agent, with the ability to have meaningful conversations, and save them.</p>
                    <p>Stack: React + TypeScript (Vite) · Python FastAPI · MySQL (Docker) · OpenAI API</p>
                </div>
            </main>
        </>
    )
}


export default About