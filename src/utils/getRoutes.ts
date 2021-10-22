import { Router } from "express";

const getRoutes = (path: string, routers: Router[]) =>
  routers.map((router) =>
    router.stack.map((route) => ({
      path: `${path}${route.route.path.replace("/", "")}`,
      method: Object.keys(route.route.methods)
        .reduce((_, key) => key)
        .toUpperCase(),
    }))
  );

export default getRoutes;
