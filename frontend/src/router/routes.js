import AllAnimePage from '../pages/AllAnimePage';
import AboutPage from '../pages/AboutPage';
import ErrorPage from "../pages/ErrorPage";
import AnimePage from "../pages/AnimePage";
import WatchListPage from '../pages/WatchListPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../components/Register';

export const publicRoutes = [
    {path: '/about', component: AboutPage , exact: true},
    {path: '/anime', component: AllAnimePage, exact: true},
    {path: '/anime/:id', component: AnimePage, exact: true},
    {path: '/login', component: LoginPage, exact: true},
    {path: '/registration', component: RegisterPage, exact: true},
    {path: '/error', component: ErrorPage, exact: true}
    
] 

export const privateRoutes = [
    {path: '/watchlist', component: WatchListPage, exact: true},
    {path: '/about', component: AboutPage , exact: true},
    {path: '/anime', component: AllAnimePage, exact: true},
    {path: '/anime/:id', component: AnimePage, exact: true},
    {path: '/login', component: LoginPage, exact: true},
    {path: '/registration', component: RegisterPage, exact: true},
    {path: '/error', component: ErrorPage, exact: true}
] 