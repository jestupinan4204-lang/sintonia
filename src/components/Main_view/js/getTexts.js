const API_URL_BASE = "https://yanethm-sintonia-api.fly.dev/api/v1/textos";
const API_URL_GENEROS = "https://yanethm-sintonia-api.fly.dev/api/v1/generos";

export async function getGeneros() {
    try {
        const respuesta = await fetch(API_URL_GENEROS);
        if (!respuesta.ok) {
            throw new Error(`Error API generos: ${respuesta.status}`);
        }
        const datos = await respuesta.json();
        return datos?.datos ?? datos?.generos ?? datos ?? [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getTexts(idioma = "es") {
    try {
        const respuesta = await fetch(`${API_URL_BASE}?idioma=${idioma}`);
        const generosLista = await getGeneros();

        if (!respuesta.ok) {
            const respuestaPaginas = await fetch(`${API_URL_BASE}?seccion=paginas&idioma=${idioma}`);
            if (!respuestaPaginas.ok) {
                throw new Error(`Error API: ${respuestaPaginas.status}`);
            }
            const jsonPaginas = await respuestaPaginas.json();
            return {
                hero: jsonPaginas?.textos?.paginas?.inicioPublico?.hero,
                cifras: jsonPaginas?.textos?.paginas?.inicioPublico?.cifras,
                destacados: jsonPaginas?.textos?.paginas?.inicioPublico?.destacados,
                generos: jsonPaginas?.textos?.paginas?.inicioPublico?.generos,
                cta: jsonPaginas?.textos?.paginas?.inicioPublico?.cta,
                footer: jsonPaginas?.textos?.footer,
                generosLista
            };
        }

        const datosJson = await respuesta.json();
        return {
            hero: datosJson?.textos?.paginas?.inicioPublico?.hero,
            cifras: datosJson?.textos?.paginas?.inicioPublico?.cifras,
            destacados: datosJson?.textos?.paginas?.inicioPublico?.destacados,
            generos: datosJson?.textos?.paginas?.inicioPublico?.generos,
            cta: datosJson?.textos?.paginas?.inicioPublico?.cta,
            footer: datosJson?.textos?.footer,
            generosLista
        };
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default getTexts;
