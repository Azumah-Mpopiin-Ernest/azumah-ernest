

export default function Footer(){

    return(
        <footer className="w-full bg-yellow-500 min-h-[200px] flex gap-10 flex-col items-center justify-center px-5">
            <div className="flex justify-between items-center w-full">
                <div>
                <h2 className="font-bold md:text-xl">Azumah Mpopiin Ernest</h2>
            <p className="text-sm">Full Stack Developer · Kumasi, Ghana</p>
            </div>
            <div className="md:flex justify-center items-center gap-2">
            <span className=" text-[#0f172a] font-bold">WhatsApp/Call: </span>
            <p className="text-white text-sm md:text-lg whitespace-nowrap">+233 055 7410 587</p>
            </div>
            
            </div>

            <small>&copy; {new Date().getFullYear()}. All rights reserved.</small>
        </footer>
    )
}