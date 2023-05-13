import dynamic from 'next/dynamic';

export const HomeSuspended = dynamic(() => import('./home'));
export const DashSuspended = dynamic(() => import('./dash'))