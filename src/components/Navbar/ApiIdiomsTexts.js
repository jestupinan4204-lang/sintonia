const API_URL_IDIOMS = "https://yanethm-sintonia-api.fly.dev/api/v1/idiomas";

export default async function getIdiomsCode (){
    const request = await fetch (API_URL_IDIOMS);
    const request_json = await request.json ();
    const idioms_name = await request_json?.datos?.map((item) => item);
    return await idioms_name;
}