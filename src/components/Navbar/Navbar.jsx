import react from 'react';
import './Navbar.css';
import logo from "./Icons/logo.svg";
import getLinksNavbar from './ApiMenuTexts.js';
import getIdiomsCode from "./ApiIdiomsTexts.js";
import globe from "./Icons/globe.svg";
import person from "./Icons/person.svg";

const Navbar = () => {

    const [idiom , setIdiom] = react.useState("es");
    const [enlaces ,setEnlaces] = react.useState ({});
    const [idiomas , setIdiomas] = react.useState ([]);
    const [menuIdiomasAbierto, setMenuIdiomasAbierto] = react.useState(false);
    const [menuAccesibilidadAbierto, setMenuAccesibilidadAbierto] = react.useState(false);
    const [textoGrande, setTextoGrande] = react.useState(false);
    const idiomasRef = react.useRef(null);
    const accesibilidadRef = react.useRef(null);

    react.useEffect (() => {
        const cargar_enlaces = async () => {
            const datos = await getLinksNavbar (idiom);
            setEnlaces (await datos);
        }
        cargar_enlaces ();
    } , [idiom])

    react.useEffect (() => {
        const CargarIdiomas = async () => {
            const datos = await getIdiomsCode ();
            setIdiomas (await datos);
        }
        CargarIdiomas ();
    } , [])

    react.useEffect(() => {
        document.documentElement.classList.toggle("texto-grande", textoGrande);

        return () => {
            document.documentElement.classList.remove("texto-grande");
        };
    }, [textoGrande]);

    react.useEffect(() => {
        if (!menuIdiomasAbierto && !menuAccesibilidadAbierto) {
            return undefined;
        }

        const cerrarAlHacerClickFuera = (event) => {
            if (!idiomasRef.current?.contains(event.target)) {
                setMenuIdiomasAbierto(false);
            }
            if (!accesibilidadRef.current?.contains(event.target)) {
                setMenuAccesibilidadAbierto(false);
            }
        };
        const cerrarConEscape = (event) => {
            if (event.key === "Escape") {
                setMenuIdiomasAbierto(false);
                setMenuAccesibilidadAbierto(false);
            }
        };

        document.addEventListener("pointerdown", cerrarAlHacerClickFuera);
        document.addEventListener("keydown", cerrarConEscape);

        return () => {
            document.removeEventListener("pointerdown", cerrarAlHacerClickFuera);
            document.removeEventListener("keydown", cerrarConEscape);
        };
    }, [menuIdiomasAbierto, menuAccesibilidadAbierto]);

    return (
        <header className="navbar">
            <nav className="navbar-interior">
                <a href="#" className="navbar-marca" aria-label="Ir al inicio">
                    <img src={logo} alt="Sintonia" />
                </a>
                <div className="navbar-movil-acciones"></div>
                <div className="navbar-panel">
                    <ul className="navbar-enlaces"> 
                        {Object.keys(enlaces).map ((key) => (
                            <li key={key}>
                                <a href={"#"+key}>{enlaces[key]}</a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-espacio" aria-hidden="true"></div>
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
                    <div className="navbar-idioma-contenedor" ref={idiomasRef}>
                        <button
                            className="navbar-idioma"
                            type="button"
                            aria-label="Seleccionar idioma"
                            aria-expanded={menuIdiomasAbierto}
                            aria-controls="menu-idiomas"
                            onClick={() => setMenuIdiomasAbierto((abierto) => !abierto)}
                        >
                            <img className="navbar-idioma-icono" src={globe} alt="" />
                            <span className="navbar-idioma-seleccionado">{idiom.toUpperCase()}</span>
                            <svg className={`navbar-idioma-chevron${menuIdiomasAbierto ? " abierto" : ""}`} viewBox="0 0 16 16" aria-hidden="true">
                                <path d="m4 6 4 4 4-4" />
                            </svg>
                        </button>
                        {menuIdiomasAbierto && (
                            <div className="menu-idiomas" id="menu-idiomas" aria-label="Idiomas disponibles">
                                {idiomas.map((item) => (
                                    <button
                                        className="menu-idiomas-opcion"
                                        key={item.codigo}
                                        type="button"
                                        aria-pressed={idiom === item.codigo}
                                        onClick={() => {
                                            setIdiom(item.codigo);
                                            setMenuIdiomasAbierto(false);
                                        }}
                                    >
                                        <span>{item.nombre}</span>
                                        <span className="menu-idiomas-codigo">{item.codigo.toUpperCase()}</span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="navbar-sesion">
                        <button className="navbar-boton navbar-boton-sesion" type="button">
                            Ingresar
                        </button>
                        <button className="navbar-boton navbar-boton-registro" type="button">
                            Crear cuenta
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;