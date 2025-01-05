import { ReactNode } from 'react';

export enum AppRouter {
    DIRECTORY = 'directory',
    MAIN = 'main',
    NOT_FOUND ='not_found'
}
export const RouterPath: Record<AppRouter, string> = {
    [AppRouter.MAIN]: '/main',
    [AppRouter.DIRECTORY]: '/directory',
    [AppRouter.NOT_FOUND]: '*',

};
interface RouteConfig {
    path: string;
    element: ReactNode;
}

export const routeConfig: Record<AppRouter, RouteConfig> = {
    [AppRouter.MAIN]: {
        path: RouterPath.main,
        element: <h1>MAIN</h1>
    },
    [AppRouter.DIRECTORY]: {
        path: RouterPath.directory,
        element: <h1>DIRECTORY</h1>
    },
    [AppRouter.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <h1>NOT_FOUND</h1>
    }
};
