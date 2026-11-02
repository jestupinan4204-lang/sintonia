import React, { useState, useEffect } from "react";
import "./MainView.css";
import getTexts, { getGeneros } from "./js/getTexts.js";
import logo from "../Navbar/Icons/logo.svg";

const ALBUMES_DESTACADOS = [
    {
        id: "luz-de-paramo",
        titulo: "Luz de páramo",
        artista: "Marea Baja",
        tipo: "paramo"
    },
    {
        id: "todo-el-ruido",
        titulo: "Todo el ruido",
        artista: "Niebla Club",
        tipo: "ruido"
    },
    {
        id: "bajo-el-guadual",
        titulo: "Bajo el guadual",
        artista: "Los Guaduales",
        tipo: "guadual"
    },
    {
        id: "neon-y-neblina",
        titulo: "Neón y neblina",
        artista: "Valle Eléctrico",
        tipo: "neon"
    },
    {
        id: "cartas-sin-enviar",
        titulo: "Cartas sin enviar",
        artista: "Lina Arroyave",
        tipo: "cartas"
    },
    {
        id: "kilometro-41",
        titulo: "Kilómetro 41",
        artista: "Kiosko 23",
        tipo: "kilometro"
    }
];

const COLORES_GENERO = {
    pop: "var(--portada-3)",
    indie: "var(--portada-2)",
    rock: "var(--portada-1)",
    electronica: "#3B82F6",
    salsa: "var(--portada-5)",
    tropical: "var(--portada-4)",
    andina: "#818CF8",
    folk: "#10B981",
    urbano: "var(--portada-1)",
    lofi: "var(--portada-4)",
    jazz: "var(--portada-5)",
    instrumental: "#3B82F6"
};

const GENEROS_DESTACADOS = [
    { id: "gen_pop", nombre: "Pop", color: "var(--portada-3)", tipo: "pop" },
    { id: "gen_indie", nombre: "Indie", color: "var(--portada-2)", tipo: "indie" },
    { id: "gen_rock", nombre: "Rock", color: "var(--portada-1)", tipo: "rock" },
    { id: "gen_electronica", nombre: "Electrónica", color: "#3B82F6", tipo: "electronica" },
    { id: "gen_salsa", nombre: "Salsa", color: "var(--portada-5)", tipo: "salsa" },
    { id: "gen_tropical", nombre: "Tropical", color: "var(--portada-4)", tipo: "tropical" },
    { id: "gen_andina", nombre: "Música andina", color: "#818CF8", tipo: "andina" },
    { id: "gen_folk", nombre: "Folk", color: "#10B981", tipo: "folk" }
];

const MainView = ({ idioma = "es" }) => {
    const [datosVista, setDatosVista] = useState(null);
    const [generosLista, setGenerosLista] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        let activo = true;

        const cargarDatos = async () => {
            try {
                setCargando(true);
                const [datos, generosRes] = await Promise.all([
                    getTexts(idioma),
                    getGeneros()
                ]);
                if (activo) {
                    if (datos) {
                        setDatosVista(datos);
                    }
                    const lista = (Array.isArray(generosRes) && generosRes.length > 0)
                        ? generosRes
                        : (Array.isArray(datos?.generosLista) && datos.generosLista.length > 0 ? datos.generosLista : []);
                    if (lista.length > 0) {
                        setGenerosLista(lista);
                    }
                }
            } catch (err) {
                console.error(err);
            } finally {
                if (activo) {
                    setCargando(false);
                }
            }
        };

        cargarDatos();

        return () => {
            activo = false;
        };
    }, [idioma]);

    const formatearTitulo = (texto) => {
        if (!texto) return null;
        const textoMin = texto.toLowerCase().trim();
        if (textoMin === "que no pare la música" || textoMin.includes("que no pare la")) {
            return (
                <>
                    <span className="hero-titulo-linea">Que no</span>
                    <span className="hero-titulo-linea">pare la</span>
                    <span className="hero-titulo-linea">música</span>
                </>
            );
        }
        if (textoMin.includes("don't let the music stop")) {
            return (
                <>
                    <span className="hero-titulo-linea">Don't let</span>
                    <span className="hero-titulo-linea">the music</span>
                    <span className="hero-titulo-linea">stop</span>
                </>
            );
        }
        return texto;
    };

    const renderPortadaAlbum = (tipo) => {
        switch (tipo) {
            case "paramo":
                return (
                    <div className="album-arte album-arte-paramo">
                        <div className="album-arte-circulo"></div>
                        <div className="album-arte-arco"></div>
                    </div>
                );
            case "ruido":
                return (
                    <div className="album-arte album-arte-ruido">
                        <svg className="album-svg-ondas" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="70" fill="none" stroke="var(--marca-secundario)" strokeWidth="15" />
                            <circle cx="100" cy="100" r="35" fill="none" stroke="var(--marca-secundario)" strokeWidth="15" />
                        </svg>
                    </div>
                );
            case "guadual":
                return (
                    <div className="album-arte album-arte-guadual">
                        <div className="album-rejilla-puntos">
                            {[...Array(9)].map((_, i) => (
                                <span key={i} className="album-punto"></span>
                            ))}
                        </div>
                    </div>
                );
            case "neon":
                return (
                    <div className="album-arte album-arte-neon">
                        <div className="album-rayas-neon"></div>
                    </div>
                );
            case "cartas":
                return (
                    <div className="album-arte album-arte-cartas"></div>
                );
            case "kilometro":
                return (
                    <div className="album-arte album-arte-kilometro">
                        <div className="album-rejilla-puntos">
                            {[...Array(9)].map((_, i) => (
                                <span key={i} className={`album-punto ${i === 4 ? "album-punto-rosa" : ""}`}></span>
                            ))}
                        </div>
                    </div>
                );
            default:
                return <div className="album-arte"></div>;
        }
    };

    const renderPeekGenero = (tipo) => {
        switch (tipo) {
            case "pop":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-circulo"></div>
                        <div className="genero-peek-arco"></div>
                    </div>
                );
            case "indie":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-rayas"></div>
                    </div>
                );
            case "rock":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-ondas"></div>
                    </div>
                );
            case "electronica":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-neon"></div>
                    </div>
                );
            case "salsa":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-dados">
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                        </div>
                    </div>
                );
            case "tropical":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-puntos">
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                        </div>
                    </div>
                );
            case "andina":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-montana"></div>
                    </div>
                );
            case "folk":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-arco-amarillo"></div>
                    </div>
                );
            case "urbano":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-ondas"></div>
                    </div>
                );
            case "lofi":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-neon"></div>
                    </div>
                );
            case "jazz":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-dados">
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                            <span className="peek-punto"></span>
                        </div>
                    </div>
                );
            case "instrumental":
                return (
                    <div className="genero-peek-contenedor">
                        <div className="genero-peek-circulo"></div>
                        <div className="genero-peek-arco"></div>
                    </div>
                );
            default:
                return null;
        }
    };

    const hero = datosVista?.hero;
    const cifras = datosVista?.cifras;
    const destacados = datosVista?.destacados;
    const generos = datosVista?.generos;
    const cta = datosVista?.cta;
    const footer = datosVista?.footer;

    const listaMostrarGeneros = generosLista.length > 0 ? generosLista : GENEROS_DESTACADOS;

    return (
        <main className="main-view">
            <div className="main-view-contenedor">
                <section className="hero-seccion" aria-label="Sección principal">
                    <div className="hero-contenedor">
                        <div className="hero-informacion">
                            <h1 className="hero-titulo" aria-live="polite">
                                {formatearTitulo(hero?.titulo)}
                            </h1>

                            <p className="hero-subtitulo">
                                {hero?.subtitulo}
                            </p>

                            <div className="hero-acciones">
                                <button type="button" className="hero-boton hero-boton-primario">
                                    {hero?.botones?.crearCuentaGratis}
                                </button>
                                <button type="button" className="hero-boton hero-boton-secundario">
                                    {hero?.botones?.explorarCatalogo}
                                </button>
                            </div>

                            <div className="hero-cifras" aria-label="Estadísticas de la plataforma">
                                <div className="cifra-item">
                                    <span className="cifra-valor">
                                        {cifras?.canciones?.valor}
                                    </span>
                                    <span className="cifra-etiqueta">
                                        {cifras?.canciones?.etiqueta}
                                    </span>
                                </div>

                                <div className="cifra-item">
                                    <span className="cifra-valor">
                                        {cifras?.generos?.valor ?? (generosLista.length > 0 ? generosLista.length : "12")}
                                    </span>
                                    <span className="cifra-etiqueta">
                                        {cifras?.generos?.etiqueta}
                                    </span>
                                </div>

                                <div className="cifra-item">
                                    <span className="cifra-valor">
                                        {cifras?.cortes?.valor}
                                    </span>
                                    <span className="cifra-etiqueta">
                                        {cifras?.cortes?.etiqueta}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="hero-grafico-contenedor" aria-hidden="true">
                            <div className="hero-grafico-escena">
                                <div className="hero-tarjeta-central">
                                    <div className="hero-circulo-blanco"></div>
                                    <div className="hero-arco-negro"></div>
                                </div>

                                <div className="hero-tarjeta-rayas"></div>

                                <div className="hero-tarjeta-ondas">
                                    <svg className="hero-svg-ondas" viewBox="0 0 130 130" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="120" cy="120" r="82" fill="none" stroke="var(--marca-secundario)" strokeWidth="18" />
                                        <circle cx="120" cy="120" r="42" fill="none" stroke="var(--marca-secundario)" strokeWidth="18" />
                                    </svg>
                                </div>

                                <div className="hero-tarjeta-nota">
                                    <p className="hero-nota-texto">
                                        Sube la niebla<br />
                                        por la montaña<br />
                                        y el camino canta
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="seccion-destacados" aria-labelledby="titulo-destacados">
                    <div className="seccion-encabezado">
                        <h2 id="titulo-destacados" className="seccion-titulo">
                            {destacados?.titulo}
                        </h2>
                        <a href="#catalogo" className="seccion-enlace">
                            {destacados?.enlaces?.descubrirMas} &rarr;
                        </a>
                    </div>

                    <div className="albumes-cuadricula">
                        {ALBUMES_DESTACADOS.map((album) => (
                            <article key={album.id} className="album-tarjeta">
                                <div className="album-portada-contenedor">
                                    {renderPortadaAlbum(album.tipo)}
                                </div>
                                <h3 className="album-titulo">{album.titulo}</h3>
                                <p className="album-artista">{album.artista}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="seccion-generos" aria-labelledby="titulo-generos">
                    <div className="seccion-encabezado">
                        <h2 id="titulo-generos" className="seccion-titulo">
                            {generos?.titulo}
                        </h2>
                        <a href="#catalogo" className="seccion-enlace">
                            {generos?.enlaces?.verCatalogo} &rarr;
                        </a>
                    </div>

                    <div className="generos-cuadricula">
                        {listaMostrarGeneros.map((gen) => {
                            const clave = (gen.id || "").replace("gen_", "").toLowerCase();
                            const tipo = gen.tipo || clave;
                            const color = gen.color && !gen.color.startsWith("portada/")
                                ? gen.color
                                : (COLORES_GENERO[clave] || (gen.color?.startsWith("portada/") ? `var(--${gen.color.replace('/', '-')})` : "var(--portada-3)"));

                            return (
                                <a
                                    key={gen.id}
                                    href={`#genero-${clave}`}
                                    className="genero-tarjeta"
                                    style={{ backgroundColor: color }}
                                >
                                    <span className="genero-nombre">{gen.nombre}</span>
                                    {renderPeekGenero(tipo)}
                                </a>
                            );
                        })}
                    </div>
                </section>

                <section className="cta-seccion" aria-label="Llamado a la acción">
                    <div className="cta-contenedor">
                        <div className="cta-textos">
                            <h2 className="cta-titulo">
                                {cta?.titulo}
                            </h2>
                            <p className="cta-descripcion">
                                {cta?.texto}
                            </p>
                        </div>
                        <button type="button" className="cta-boton">
                            {cta?.botones?.crearCuentaGratis}
                        </button>
                    </div>
                </section>
            </div>

            <footer className="sitio-footer" aria-label="Pie de página">
                <div className="footer-interior">
                    <div className="footer-principal">
                        <div className="footer-marca-columna">
                            <a href="#" className="footer-marca" aria-label="Ir al inicio">
                                <img src={logo} alt="Sintonía" />
                            </a>
                            <p className="footer-lema">
                                {footer?.lema}
                            </p>
                        </div>

                        <div className="footer-columnas">
                            <div className="footer-columna">
                                <h3 className="footer-columna-titulo">
                                    {footer?.columnas?.explora?.titulo?.toUpperCase()}
                                </h3>
                                <ul className="footer-enlaces">
                                    <li>
                                        <a href="#inicio">
                                            {footer?.columnas?.explora?.enlaces?.inicio}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#catalogo">
                                            {footer?.columnas?.explora?.enlaces?.catalogo}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer-columna">
                                <h3 className="footer-columna-titulo">
                                    {footer?.columnas?.cuenta?.titulo?.toUpperCase()}
                                </h3>
                                <ul className="footer-enlaces">
                                    <li>
                                        <a href="#ingresar">
                                            {footer?.columnas?.cuenta?.enlaces?.ingresar}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#registro">
                                            {footer?.columnas?.cuenta?.enlaces?.crearCuenta}
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="footer-columna">
                                <h3 className="footer-columna-titulo">
                                    {footer?.columnas?.legal?.titulo?.toUpperCase()}
                                </h3>
                                <ul className="footer-enlaces">
                                    <li>
                                        <a href="#terminos">
                                            {footer?.columnas?.legal?.enlaces?.terminos}
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#accesibilidad">
                                            {footer?.columnas?.legal?.enlaces?.accesibilidad}
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="footer-secundario">
                        <span className="footer-legal-derechos">
                            {(footer?.legal?.derechos || "").replace("{anio}", "2026")}
                        </span>
                        <span className="footer-legal-nota">
                            {footer?.legal?.nota}
                        </span>
                    </div>
                </div>
            </footer>
        </main>
    );
};

export default MainView;
