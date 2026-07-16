import { createApp } from "./app.js";

function extractRoutes(stack, prefix = "") {
  const routes = [];
  for (const layer of stack) {
    if (layer.route) {
      const path = prefix + layer.route.path;
      const methods = Object.keys(layer.route.methods)
        .filter((m) => layer.route.methods[m])
        .join(",")
        .toUpperCase();
      routes.push({ methods, path });
    } else if (layer.name === "router" && layer.handle?.stack) {
      const mountPath = layer.regexp
        ?.toString()
        .replace("/^\\", "")
        .replace("\\/?(?=\\/|$)/i", "")
        .replace(/\\\//g, "/")
        .replace(/\$.*/, "");
      routes.push(
        ...extractRoutes(layer.handle.stack, prefix + (mountPath || "")),
      );
    }
  }
  return routes;
}

const app = createApp();
const stack = app.router?.stack || app._router?.stack || [];
console.table(extractRoutes(stack));
process.exit(0);
