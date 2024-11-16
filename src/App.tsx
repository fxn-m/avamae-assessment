import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";
import Home from "@/pages/Home";
import NavBar from "./components/NavBar";

function App() {
    return (
        <Router basename="/avamae-assessment">
            <div className="App flex h-screen flex-col">
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
                <div className="footer mx-auto mt-auto flex h-16 w-4/5 flex-row-reverse items-center border-t text-xs font-light text-gray-400">
                    <p>
                        Website Development by{" "}
                        <a className="underline" href="https://www.avamae.co.uk/">
                            AVAMAE
                        </a>
                    </p>
                </div>
            </div>
        </Router>
    );
}

export default App;
