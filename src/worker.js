export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Redirecionamento canônico HTTPS se vier em HTTP
    if (url.protocol === "http:") {
      return Response.redirect(`https://${url.hostname}${url.pathname}${url.search}`, 301);
    }

    // 2. Busca o arquivo estático no ASSETS
    let response = await env.ASSETS.fetch(request);

    // 3. Fallback de SPA (Single Page Application) se for 404 para rotas de navegação HTML
    if (response.status === 404 && !url.pathname.includes(".")) {
      const indexReq = new Request(new URL("/index.html", request.url), request);
      response = await env.ASSETS.fetch(indexReq);
    }

    // 4. Cabeçalhos de segurança e integridade
    const newHeaders = new Headers(response.headers);
    const contentType = newHeaders.get("content-type") || "";
    if (contentType.includes("text/html") && !contentType.includes("charset")) {
      newHeaders.set("content-type", "text/html; charset=UTF-8");
    }

    newHeaders.set("X-Content-Type-Options", "nosniff");
    newHeaders.set("Referrer-Policy", "strict-origin-when-cross-origin");
    newHeaders.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  },
};
