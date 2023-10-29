import './index.css';
function App() {
  return (
    <div className="w-screen h-screen bg-white flex flex-col justify-between">
        <div>
            <header className="bg-sky-200 w-screen h-28 flex justify-between">
                <img src="./RH-logo-with-text.svg" alt="ReHub logo with text" className="w-56 mb-2 max-[1024px]:hidden"/>
                <div className="flex justify-between">
                    <button className="bg-sky-600 mr-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center max-[1024px]:hidden">
                        <span className="text-white font-bold p-5 self-end">Kontakt</span>
                    </button>
                    <button className="bg-sky-600 mr-6 ml-2 flex w-36 h-24 rounded-br-[5px] rounded-bl-[5px] [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.4)] justify-center max-[1024px]:hidden">
                        <span className="text-white font-bold p-5 self-end">Registracija</span>
                    </button>
                </div>
            </header>

            <div className="bg-sky-600 w-screen h-9 opacity-50"></div>
        </div>


        <div className="flex justify-center">

            {/*Za manje ekrane*/}
            <div className="min-[1024px]:hidden flex flex-col flex-wrap">
                <img src="./RH-logo-with-text.svg" alt="Rehub logo" className=""/>
                <label className="font-bold text-sky-600 text-lg mt-[30px] self-start">E-mail:</label>
                <input type="text" name="email" id="email" className="w-[350px] h-[40px] bg-sky-200 opacity-50 rounded-[5px]"/>
                <label className="font-bold text-sky-600 text-lg mt-[15px] self-start">Lozinka:</label>
                <input type="password" name="pass" id="pass" className="w-[350px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px]"/>
                <span className="text-sky-600 self-start">Zaboravljena lozinka?</span>
                <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]">Prijava</button>

                <div className="flex flex-col items-center">
                    <span className="text-sky-600 font-bold text-lg mt-[40px]">Kontakt</span>
                    <span className="text-sky-600 font-bold text-lg mt-[10px]">Registracija</span>
                </div>
            </div>

            {/*Za desktop*/}
            <div className="w-[420px] h-[430px] bg-white [box-shadow:-2px_15px_30px_rgba(23,_37,_84,_0.2)] rounded-[10px] mt-8 flex flex-col max-[1024px]:hidden">
                <div className="w-full h-24 bg-sky-600 opacity-50 rounded-tl-[10px] rounded-tr-[10px] flex justify-center items-end pb-4">
                    <img src="./user-icon.svg" alt="User icon" className="w-[32px] h-[32px] mr-1"/>
                    <span className="text-white font-bold text-3xl ml-1">Prijava</span>
                </div>
                <div className="flex-1 rounded-bl-[10px] rounded-br-[10px] flex flex-col items-center">
                    <label className="font-bold text-sky-600 text-lg mt-[30px] self-start ml-[60px]">E-mail:</label>
                    <input type="text" name="email" id="email" className="w-[300px] h-[40px] bg-sky-200 opacity-50 rounded-[5px]"/>
                    <label className="font-bold text-sky-600 text-lg mt-[15px] self-start ml-[60px]">Lozinka:</label>
                    <input type="password" name="pass" id="pass" className="w-[300px] h-[40px] bg-sky-200 opacity-50 mb-[2px] rounded-[5px]"/>
                    <span className="text-sky-600 self-start ml-[60px]">Zaboravljena lozinka?</span>
                    <button className="bg-sky-600 text-white pl-9 pr-9 pt-1 pb-1 rounded-[5px] mt-[45px]">Prijava</button>

                </div>
            </div>
        </div>

        <footer className="">
            <div className="bg-sky-600 w-screen h-12 opacity-50"></div>
        </footer>


    </div>
  );
}

export default App;
