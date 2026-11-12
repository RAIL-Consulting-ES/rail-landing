// Avisa a Bing (y al resto de buscadores IndexNow) de que las URL del sitemap
// han cambiado. Ejecutar tras desplegar a producción: `npm run indexnow`.
// Bing alimenta también a ChatGPT y Copilot, que no leen Search Console.
const HOST = "www.railconsulting.es";
const KEY = "1348bf7ff0c2e67a5c0faf7a8c49ec7d";

const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
	method: "POST",
	headers: { "Content-Type": "application/json; charset=utf-8" },
	body: JSON.stringify({
		host: HOST,
		key: KEY,
		keyLocation: `https://${HOST}/${KEY}.txt`,
		urlList,
	}),
});
console.log(`IndexNow: ${urlList.length} URL enviadas → HTTP ${res.status}`);
