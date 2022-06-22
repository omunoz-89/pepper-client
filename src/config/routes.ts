import IRoute from "../interfaces/route";

const authRoutes: IRoute[] = []

const blogRoutes: IRoute[] = []

const mainRoute: IRoute[] = []

const routes: IRoute[] = [...authRoutes, ...blogRoutes, ...mainRoute]

export default routes;