import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const workerPath = join("dist", "server", "index.js");

const worker = `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const accept = request.headers.get("accept") || "";
    if (!accept.includes("text/html")) {
      return response;
    }

    const url = new URL(request.url);
    url.pathname = "/index.html";
    url.search = "";
    return env.ASSETS.fetch(new Request(url, request));
  },
};
`;

await mkdir(dirname(workerPath), { recursive: true });
await writeFile(workerPath, worker);
