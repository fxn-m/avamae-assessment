import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="h-14 border border-b-gray-200">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <img src="./logo.png" className="h-12" />
                    <p className="text-xl font-bold">COMPANY</p>
                </div>
                <div className="flex items-center space-x-10">
                    <div className="items-center space-x-10 text-xs tracking-widest text-gray-600">
                        <Link to="/">HOME</Link>
                        <Link to="/about-us">ABOUT US</Link>
                        <Link to="/contact-us">CONTACT US</Link>
                    </div>
                    <div className="inline-flex rounded-md bg-blue-100 px-8 py-3 text-xs font-bold tracking-normal text-blue-400">Log in</div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
