const API_URL_MENU = "https://yanethm-sintonia-api.fly.dev/api/v1/textos?seccion=navbar";

async function getNavbarTexts(idioma) {
    const request = await fetch(`${API_URL_MENU}&idioma=${idioma}`);
    if (!request.ok) {
        throw new Error(`La API de textos respondió con estado ${request.status}.`);
    }

    return request.json();
}

export default async function getLinksNavbar(idioma) {
    const navbarJson = await getNavbarTexts(idioma);
    const enlaces = await navbarJson?.textos?.navbar?.enlaces ?? {};
    return enlaces.invitado ?? {};
}
