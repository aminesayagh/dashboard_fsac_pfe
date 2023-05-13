

export const NAME_BREAKPOINT = {
    GROUPE_PFE: 'groupe_pfe',
    PROJECT: 'project',
    PROFESSOR: 'professor',
    STUDENT: 'student',
} as const;

export const PAGES = {
    HOME: '/',
    DASH: '/dash',
} as const;

export type PagesRoutes = typeof PAGES[keyof typeof PAGES];

export const ANGLES = {
    ...NAME_BREAKPOINT,
    PROFILE: 'profile',
    HOME: 'home'
} as const

export const ITEMS = {
    UPDATE_PROFILE_IMAGE: 'update profile image',
    UPDATE_PROFILE: 'update profile',
    UPDATE_PASSWORD: 'update password'
} as const;
