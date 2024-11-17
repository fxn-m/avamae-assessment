import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="h-14 border-b border-gray-200">
            <div className="container mx-auto flex h-full items-center justify-between">
                <div className="flex items-center space-x-3">
                    <img src="https://ccsrents.com/wp-content/uploads/2020/12/cropped-CCSLogofavicon.png" className="h-10" alt="Logo" />
                    <p className="text-xl font-bold">COMPANY</p>
                </div>

                <div className="flex items-center space-x-10">
                    <div className="flex space-x-10 text-xs tracking-wider text-gray-600">
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

                    <div className="cursor-pointer rounded-md bg-blue-100 px-7 py-3 text-xs font-semibold text-blue-600 hover:bg-blue-200">Log in</div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
