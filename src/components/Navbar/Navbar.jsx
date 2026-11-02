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
    const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
    const [tamanoTexto, setTamanoTexto] = useState(100);
    const [altoContraste, setAltoContraste] = useState(false);
    const [reducirMovimiento, setReducirMovimiento] = useState(false);
    const [subrayarEnlaces, setSubrayarEnlaces] = useState(false);
    const [espaciadoLectura, setEspaciadoLectura] = useState(false);
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
        document.documentElement.style.fontSize = tamanoTexto === 100 ? "" : `${tamanoTexto}%`;
        return () => {
            document.documentElement.style.fontSize = "";
        };
    }, [tamanoTexto]);

    useEffect(() => {
        document.documentElement.classList.toggle("alto-contraste", altoContraste);
        return () => {
            document.documentElement.classList.remove("alto-contraste");
        };
    }, [altoContraste]);

    useEffect(() => {
        document.documentElement.classList.toggle("reducir-movimiento", reducirMovimiento);
        return () => {
            document.documentElement.classList.remove("reducir-movimiento");
        };
    }, [reducirMovimiento]);

    useEffect(() => {
        document.documentElement.classList.toggle("subrayar-enlaces", subrayarEnlaces);
        return () => {
            document.documentElement.classList.remove("subrayar-enlaces");
        };
    }, [subrayarEnlaces]);

    useEffect(() => {
        document.documentElement.classList.toggle("espaciado-lectura", espaciadoLectura);
        return () => {
            document.documentElement.classList.remove("espaciado-lectura");
        };
    }, [espaciadoLectura]);

    useEffect(() => {
        if (!menuAccesibilidadAbierto && !menuMovilAbierto) return;

        const cerrarAlHacerClickFuera = (event) => {
            if (menuAccesibilidadAbierto && !accesibilidadRef.current?.contains(event.target)) {
                setMenuAccesibilidadAbierto(false);
            }
        };
        const cerrarConEscape = (event) => {
            if (event.key === "Escape") {
                setMenuAccesibilidadAbierto(false);
                setMenuMovilAbierto(false);
            }
        };

        const manejarRedimension = () => {
            if (window.innerWidth > 860) {
                setMenuMovilAbierto(false);
            }
        };

        document.addEventListener("pointerdown", cerrarAlHacerClickFuera);
        document.addEventListener("keydown", cerrarConEscape);
        window.addEventListener("resize", manejarRedimension);

        return () => {
            document.removeEventListener("pointerdown", cerrarAlHacerClickFuera);
            document.removeEventListener("keydown", cerrarConEscape);
            window.removeEventListener("resize", manejarRedimension);
        };
    }, [menuAccesibilidadAbierto, menuMovilAbierto]);

    const restablecerAccesibilidad = () => {
        setTamanoTexto(100);
        setAltoContraste(false);
        setReducirMovimiento(false);
        setSubrayarEnlaces(false);
        setEspaciadoLectura(false);
    };

    const cambiarTamanoTexto = (delta) => {
        setTamanoTexto((prev) => {
            const nuevo = prev + delta;
            if (nuevo < 80) return 80;
            if (nuevo > 140) return 140;
            return nuevo;
        });
    };

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
                            onClick={() => {
                                setMenuAccesibilidadAbierto((abierto) => !abierto);
                                setMenuMovilAbierto(false);
                            }}
                        >
                            <img src={person} alt="" aria-hidden="true" />
                        </button>

                        {menuAccesibilidadAbierto && (
                            <div className="menu-accesibilidad" id="menu-accesibilidad" aria-label="Opciones de accesibilidad">
                                <div className="menu-accesibilidad-cabecera">
                                    <h2 className="menu-accesibilidad-titulo">
                                        {idiom === "en" ? "Accessibility" : "Accesibilidad"}
                                    </h2>
                                    <button
                                        type="button"
                                        className="menu-accesibilidad-cerrar"
                                        aria-label={idiom === "en" ? "Close accessibility panel" : "Cerrar panel de accesibilidad"}
                                        onClick={() => setMenuAccesibilidadAbierto(false)}
                                    >
                                        &times;
                                    </button>
                                </div>

                                <div className="menu-accesibilidad-seccion">
                                    <span className="menu-accesibilidad-subtitulo">
                                        {idiom === "en" ? "Text size" : "Tamaño del texto"}
                                    </span>
                                    <div className="menu-accesibilidad-stepper">
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            aria-label={idiom === "en" ? "Decrease text size" : "Reducir tamaño del texto"}
                                            onClick={() => cambiarTamanoTexto(-10)}
                                        >
                                            &minus;
                                        </button>
                                        <span className="stepper-valor">{tamanoTexto} %</span>
                                        <button
                                            type="button"
                                            className="stepper-btn"
                                            aria-label={idiom === "en" ? "Increase text size" : "Aumentar tamaño del texto"}
                                            onClick={() => cambiarTamanoTexto(10)}
                                        >
                                            &#43;
                                        </button>
                                    </div>
                                </div>

                                <div className="menu-accesibilidad-opciones">
                                    <div className="menu-accesibilidad-fila">
                                        <div className="menu-accesibilidad-info">
                                            <span className="menu-accesibilidad-opcion-titulo">
                                                {idiom === "en" ? "High contrast" : "Alto contraste"}
                                            </span>
                                            <span className="menu-accesibilidad-opcion-desc">
                                                {idiom === "en" ? "More contrast between text and background" : "Más diferencia entre el texto y el fondo"}
                                            </span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={altoContraste}
                                                onChange={(e) => setAltoContraste(e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="menu-accesibilidad-fila">
                                        <div className="menu-accesibilidad-info">
                                            <span className="menu-accesibilidad-opcion-titulo">
                                                {idiom === "en" ? "Reduce motion" : "Reducir movimiento"}
                                            </span>
                                            <span className="menu-accesibilidad-opcion-desc">
                                                {idiom === "en" ? "No animations or transitions" : "Sin animaciones ni transiciones"}
                                            </span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={reducirMovimiento}
                                                onChange={(e) => setReducirMovimiento(e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="menu-accesibilidad-fila">
                                        <div className="menu-accesibilidad-info">
                                            <span className="menu-accesibilidad-opcion-titulo">
                                                {idiom === "en" ? "Underline links" : "Subrayar enlaces"}
                                            </span>
                                            <span className="menu-accesibilidad-opcion-desc">
                                                {idiom === "en" ? "Links are distinguishable without relying on color" : "Los enlaces se distinguen sin depender del color"}
                                            </span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={subrayarEnlaces}
                                                onChange={(e) => setSubrayarEnlaces(e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>

                                    <div className="menu-accesibilidad-fila">
                                        <div className="menu-accesibilidad-info">
                                            <span className="menu-accesibilidad-opcion-titulo">
                                                {idiom === "en" ? "Reading spacing" : "Espaciado de lectura"}
                                            </span>
                                            <span className="menu-accesibilidad-opcion-desc">
                                                {idiom === "en" ? "More space between lines and letters" : "Más espacio entre líneas y entre letras"}
                                            </span>
                                        </div>
                                        <label className="toggle-switch">
                                            <input
                                                type="checkbox"
                                                checked={espaciadoLectura}
                                                onChange={(e) => setEspaciadoLectura(e.target.checked)}
                                            />
                                            <span className="toggle-slider"></span>
                                        </label>
                                    </div>
                                </div>

                                <p className="menu-accesibilidad-nota">
                                    {idiom === "en"
                                        ? "Saved on this device. Initial values come from your system settings."
                                        : "Se guarda en este dispositivo. Los valores iniciales salen de lo que ya definiste en tu sistema."}
                                </p>

                                <div className="menu-accesibilidad-pie">
                                    <a href="#accesibilidad" className="menu-accesibilidad-declaracion">
                                        {idiom === "en" ? "Accessibility statement" : "Declaración de accesibilidad"}
                                    </a>
                                    <button
                                        type="button"
                                        className="menu-accesibilidad-restablecer"
                                        onClick={restablecerAccesibilidad}
                                    >
                                        {idiom === "en" ? "Reset" : "Restablecer"}
                                    </button>
                                </div>
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

                    <button
                        type="button"
                        className={`navbar-hamburguesa ${menuMovilAbierto ? "abierto" : ""}`}
                        aria-label={menuMovilAbierto ? (idiom === "en" ? "Close menu" : "Cerrar menú") : (idiom === "en" ? "Open menu" : "Abrir menú")}
                        aria-expanded={menuMovilAbierto}
                        onClick={() => {
                            setMenuMovilAbierto((prev) => !prev);
                            setMenuAccesibilidadAbierto(false);
                        }}
                    >
                        <span className="hamburguesa-barra"></span>
                        <span className="hamburguesa-barra"></span>
                        <span className="hamburguesa-barra"></span>
                    </button>
                </div>
            </nav>

            {menuMovilAbierto && (
                <div className="navbar-movil-desplegable" role="dialog" aria-label="Menú de navegación móvil">
                    <ul className="navbar-movil-enlaces">
                        {Object.keys(enlaces).map((key) => (
                            <li key={key}>
                                <a
                                    href={"#" + key}
                                    onClick={() => setMenuMovilAbierto(false)}
                                >
                                    {enlaces[key]}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className="navbar-movil-sesion">
                        <button
                            className="navbar-boton navbar-boton-sesion"
                            type="button"
                            onClick={() => setMenuMovilAbierto(false)}
                        >
                            {idiom === "en" ? "Log in" : "Ingresar"}
                        </button>
                        <button
                            className="navbar-boton navbar-boton-registro"
                            type="button"
                            onClick={() => setMenuMovilAbierto(false)}
                        >
                            {idiom === "en" ? "Sign up" : "Crear cuenta"}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
