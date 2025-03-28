import { Link } from "react-router"
import { useTheme } from "./context/theme-provider"
import { Moon, Sun } from "lucide-react";
import {CitySearch} from "./CitySearch";

const Header = () => {
    const {theme,setTheme} = useTheme();
    const isDark=theme ==="dark";
    return (
        <header>
            <div
                className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2"
            >
                <div className="container mx-auto flex h-16 items-center justify-between px-4" >
                    <Link to={"/"}>
                        <img src={isDark?"/dark.png":"/light.png"} alt="climate logo"
                            className="h-14"
                        />
                    </Link>
                <div className=" flex space-x-2" >
                  
                {/* search */}
                 <CitySearch/>
                {/* theme toggle */}
                <button className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180":"rotate-0"}`} onClick={()=>setTheme(isDark?"light":"dark")} >
                 {isDark ? <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/>:<Moon className="h-6 w-6 rotate-0 transition-all" />}
 
                </button>
                </div>
                </div>
                
            </div>
        </header>
    )
}

export default Header
