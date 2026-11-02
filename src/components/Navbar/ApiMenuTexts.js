const API_URL_MENU = "https://yanethm-sintonia-api.fly.dev/api/v1/textos?seccion=navbar";

async function getNavbarTexts(idioma) {
    const request = await fetch(`${API_URL_MENU}&idioma=${idioma}`);
    if (!request.ok) {
        throw new Error(`La API de textos respondió con estado ${request.status}.`);
    }

    return request.json();
}

export default async function getLinksNavbar(idioma = "es") {
    try {
        const navbarJson = await getNavbarTexts(idioma);
        const enlaces = navbarJson?.textos?.navbar?.enlaces ?? {};
        if (enlaces.invitado && Object.keys(enlaces.invitado).length > 0) {
            return enlaces.invitado;
        }
        return idioma === "en"
            ? { inicio: "Home", catalogo: "Catalog" }
            : { inicio: "Inicio", catalogo: "Catálogo" };
    } catch (error) {
        return idioma === "en"
            ? { inicio: "Home", catalogo: "Catalog" }
            : { inicio: "Inicio", catalogo: "Catálogo" };
    }
}
