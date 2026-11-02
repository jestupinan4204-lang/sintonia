import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import logo from "./Icons/logo.svg";
import getLinksNavbar from "./ApiMenuTexts.js";
import person from "./Icons/person.svg";

const Navbar = ({ idioma: idiomaProp, onIdiomaChange }) => {
    const [idiomInternal, setIdiomInternal] = useState("es");
    const idiom = idiomaProp ?? idiomInternal;

    const [enlaces, setEnlaces] = useState({});
    const [menuAccesibilidadAbierto, setMenuAccesibilidadAbierto] = useState(false);
    const [textoGrande, setTextoGrande] = useState(false);
    const accesibilidadRef = useRef(null);

    const cambiarIdioma = (nuevoIdioma) => {
        if (onIdiomaChange) {
            onIdiomaChange(nuevoIdioma);
        } else {
            setIdiomInternal(nuevoIdioma);
        }
    };

    useEffect(() => {
        let activo = true;

        const cargarEnlaces = async () => {
            try {
                const datos = await getLinksNavbar(idiom);
                if (activo && datos && Object.keys(datos).length > 0) {
                    setEnlaces(datos);
                } else if (activo) {
                    setEnlaces(
                        idiom === "en"
                            ? { inicio: "Home", catalogo: "Catalog" }
                            : { inicio: "Inicio", catalogo: "Catálogo" }
                    );
                }
            } catch (err) {
                if (activo) {
                    setEnlaces(
                        idiom === "en"
                            ? { inicio: "Home", catalogo: "Catalog" }
                            : { inicio: "Inicio", catalogo: "Catálogo" }
                    );
                }
            }
        };
        cargarEnlaces();
        return () => {
            activo = false;
        };
    }, [idiom]);

    useEffect(() => {
        document.documentElement.classList.toggle("texto-grande", textoGrande);

        return () => {
            document.documentElement.classList.remove("texto-grande");
        };
    }, [textoGrande]);

    useEffect(() => {
        if (!menuAccesibilidadAbierto) return;

        const cerrarAlHacerClickFuera = (event) => {
            if (!accesibilidadRef.current?.contains(event.target)) {
                setMenuAccesibilidadAbierto(false);
            }
        };
        const cerrarConEscape = (event) => {
            if (event.key === "Escape") {
                setMenuAccesibilidadAbierto(false);
            }
        };

        document.addEventListener("pointerdown", cerrarAlHacerClickFuera);
        document.addEventListener("keydown", cerrarConEscape);

        return () => {
            document.removeEventListener("pointerdown", cerrarAlHacerClickFuera);
            document.removeEventListener("keydown", cerrarConEscape);
        };
    }, [menuAccesibilidadAbierto]);

    return (
        <header className="navbar">
            <nav className="navbar-interior" aria-label="Navegación principal">
                <div className="navbar-lado-izquierdo">
                    <a href="#" className="navbar-marca" aria-label="Ir al inicio">
                        <img src={logo} alt="Sintonía" />
                    </a>

                    <ul className="navbar-enlaces">
                        {Object.keys(enlaces).map((key) => (
                            <li key={key}>
                                <a href={"#" + key}>{enlaces[key]}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-utilidades">
                    <div className="navbar-accesibilidad-contenedor" ref={accesibilidadRef}>
                        <button
                            className="navbar-accesibilidad"
                            type="button"
                            aria-label="Opciones de accesibilidad"
                            aria-expanded={menuAccesibilidadAbierto}
                            aria-controls="menu-accesibilidad"
                            onClick={() => setMenuAccesibilidadAbierto((abierto) => !abierto)}
                        >
                            <img src={person} alt="" aria-hidden="true" />
                        </button>

                        {menuAccesibilidadAbierto && (
                            <div className="menu-accesibilidad" id="menu-accesibilidad" aria-label="Opciones de accesibilidad">
                                <label className="menu-accesibilidad-opcion">
                                    <input
                                        type="checkbox"
                                        checked={textoGrande}
                                        onChange={(event) => setTextoGrande(event.target.checked)}
                                    />
                                    <span>Texto grande</span>
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="navbar-idioma-toggle" role="group" aria-label="Seleccionar idioma">
                        <button
                            className={`navbar-idioma-btn ${idiom === "es" ? "activo" : ""}`}
                            type="button"
                            aria-pressed={idiom === "es"}
                            onClick={() => cambiarIdioma("es")}
                        >
                            ES
                        </button>
                        <button
                            className={`navbar-idioma-btn ${idiom === "en" ? "activo" : ""}`}
                            type="button"
                            aria-pressed={idiom === "en"}
                            onClick={() => cambiarIdioma("en")}
                        >
                            EN
                        </button>
                    </div>
                    <div className="navbar-sesion">
                        <button className="navbar-boton navbar-boton-sesion" type="button">
                            {idiom === "en" ? "Log in" : "Ingresar"}
                        </button>
                        <button className="navbar-boton navbar-boton-registro" type="button">
                            {idiom === "en" ? "Sign up" : "Crear cuenta"}
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
