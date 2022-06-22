import IRoute from "../interfaces/route";
import LoginPage from '../pages/login'
import NotePage from '../pages/note';
import EditPage from '../pages/edit';
import HomePage from '../pages/home';


const authRoutes: IRoute[] = [
    {
        path: '/login',
        exact: true,
        auth: false,
        component: LoginPage,
        name: 'Login'
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: LoginPage,
        name: 'Register'
    }
];

const noteRoutes: IRoute[] = [
    {
        path: '/edit',
        exact: true,
        auth: true,
        component: EditPage,
        name: 'Edit'
    },
    {
        path: '/edit/:noteID',
        exact: true,
        auth: true,
        component: EditPage,
        name: 'Edit'
    },
    {
        path: '/notes/:noteID',
        exact: true,
        auth: false,
        component: NotePage,
        name: 'Note'
    }
];

const mainRoute: IRoute[] = [
    {
        path: '/',
        exact: true,
        auth: true,
        component: HomePage,
        name: 'Home'
    }
];

const routes: IRoute[] = [...authRoutes, ...noteRoutes, ...mainRoute]

export default routes;