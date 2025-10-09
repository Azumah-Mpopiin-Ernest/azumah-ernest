import whatsappImg from "./sap.png"
import emailImg from "./email.png"
export default function Contact(){

   return(
    <section className="contact-section">
        <p>
            I’d love to hear from you! Whether 
            it’s a project idea, collaboration, 
            or just a tech chat, feel free to reach out.
             Let’s connect and build something amazing together.
        </p>
        <div className="contacts">
            <a href="https://wa.me/233557410587" target="blank" rel="noopener noreferrer">
                <img src={whatsappImg} alt="whatsapp logo" />
            </a>
            <a href="mailto:teslajunior0552@gmail.com" target="blank">
                <img src={emailImg} alt="email logo" />
            </a>
        </div>
        <div className="send-mail-btn">
            <a href="mailto:teslajunior0552@gmail.com">
        <button>Send me a mail</button>
            </a>
        
        <span class="material-symbols-outlined">
            touch_app
        </span>
        </div>
        
    </section>
   )
}