import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import MainView from "./components/Main_view/MainView";

export default function App() {
    const [idioma, setIdioma] = useState("es");

    return (
        <div className="sitio">
            <Navbar idioma={idioma} onIdiomaChange={setIdioma} />
            <MainView idioma={idioma} />
        </div>
    );
}
