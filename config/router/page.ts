import { NAME_BREAKPOINT, PAGES, PagesRoutes } from 'constants/router';

export const RouterPash: {
    page: PagesRoutes,
    authState: 'authenticated' | 'unauthenticated',
    redirection: PagesRoutes
}[] = [
    {
        page: PAGES.HOME,
        authState: 'unauthenticated',
        redirection: PAGES.DASH
    },
    {
        page: PAGES.DASH,
        authState: 'authenticated',
        redirection: PAGES.HOME
    }
]