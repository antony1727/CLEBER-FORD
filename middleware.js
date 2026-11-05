/**
 * Proteção da Central de Divulgação da Cleber Ford.
 *
 * A Central é uma ferramenta interna e não deve ficar pública. O acesso é
 * feito por HTTP Basic Auth, com usuário e senha definidos nas variáveis de
 * ambiente do projeto na Vercel:
 *
 *   CENTRAL_USER
 *   CENTRAL_PASSWORD
 *
 * Sem essas variáveis o acesso é bloqueado (503), evitando que a Central
 * fique aberta por esquecimento de configuração.
 */

export const config = {
  matcher: ["/sistema", "/sistema/:path*", "/divulgacao", "/divulgacao.html"],
};

const unauthorized = () =>
  new Response("Autenticação necessária para acessar a Central de Divulgação.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Central de Divulgação Cleber Ford", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });

export default function middleware(request) {
  const expectedUser = process.env.CENTRAL_USER;
  const expectedPassword = process.env.CENTRAL_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new Response(
      "Central de Divulgação indisponível: as credenciais de acesso ainda não foram configuradas.",
      {
        status: 503,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
        },
      }
    );
  }

  const authorization = request.headers.get("authorization") || "";
  if (!authorization.startsWith("Basic ")) {
    return unauthorized();
  }

  let decoded = "";
  try {
    decoded = atob(authorization.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const separator = decoded.indexOf(":");
  if (separator === -1) {
    return unauthorized();
  }

  const user = decoded.slice(0, separator);
  const password = decoded.slice(separator + 1);

  if (user !== expectedUser || password !== expectedPassword) {
    return unauthorized();
  }

  return undefined;
}
