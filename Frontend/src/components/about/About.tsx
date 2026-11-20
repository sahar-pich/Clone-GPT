import { Link } from "react-router-dom"
import linkedinIcon from "../.././assets/linkedin.svg"
import githubIcon from '../../assets/github.svg'

const About = () => {


    return (
        <>
            <Link to="/"><button>NewChat</button></Link>

            <h3>Sahar Pich</h3>
            <p>Email: sahar.pich@gmail.com</p>
            <a href="https://www.linkedin.com/in/sahar-pich"><img src={linkedinIcon} style={{ width: "1rem" }} /> LinkedIn</a>
            <a href="https://github.com/sahar-pich"><img src={githubIcon} style={{ width: "1rem" }} /> GitHub</a>
            <p>A ChatGPT style chat agent, with the ability to have meaningful converations, and save them.</p>
        </>
    )
}


export default About