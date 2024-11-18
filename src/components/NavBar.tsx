import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="h-14 border-b border-gray-200">
            <div className="mx-auto flex h-full w-full items-center justify-between lg:w-3/5">
                <Link to="/" className="mx-auto flex items-center space-x-3 sm:mx-4 lg:mx-0">
                    <img src="https://ccsrents.com/wp-content/uploads/2020/12/cropped-CCSLogofavicon.png" className="h-10" alt="Logo" />
                    <p className="text-xl font-bold">COMPANY</p>
                </Link>

                <div className="hidden items-center space-x-10 sm:flex">
                    <div className="flex space-x-10 text-xs font-semibold tracking-widest text-gray-600">
                        <Link to="/" className="hover:text-blue-500">
                            HOME
                        </Link>
                        <Link to="/about-us" className="hover:text-blue-500">
                            ABOUT US
                        </Link>
                        <Link to="/contact-us" className="hover:text-blue-500">
                            CONTACT US
                        </Link>
                    </div>

                    <div className="cursor-not-allowed rounded-md bg-blue-50 px-7 py-3 text-xs font-bold text-sky-700 hover:bg-blue-200">Log in</div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
