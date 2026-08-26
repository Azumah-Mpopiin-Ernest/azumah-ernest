export default function Footer() {
  return (
    <footer className="w-full bg-[#10141f] border-t border-[#232838] mt-10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-10">
        <div className="text-center md:text-left">
          <h2 className="font-display font-semibold text-lg text-[#e9ecf3]">
            Azumah Mpopiin Ernest
          </h2>
          <p className="font-mono text-xs text-[#8992a9] mt-1 tracking-wide">
            FULL STACK DEVELOPER · KUMASI, GHANA
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <span className="text-[#8992a9]">TX / RX</span>

          <a
            href="https://wa.me/233557410587"
            className="text-[#e9ecf3] border border-[#232838] rounded-full px-3 py-1.5 hover:border-[#4fd8c4] hover:text-[#4fd8c4] transition-colors"
          >
            +233 055 741 0587
          </a>
        </div>
      </div>

      <div className="border-t border-[#232838] py-4 text-center font-mono text-[10px] text-[#8992a9] tracking-widest">
        © {new Date().getFullYear()} AZUMAH MPOPIIN ERNEST — ALL RIGHTS RESERVED
      </div>
    </footer>
  );
}
