import { Loading } from '@/components/commun';

export const DefaultErrorRender = ({ message }: { message: string }) => <p>Error API Request {`${message}`}</p>;
export const DefaultIsLoadingRender = () => <Loading />;

export { AsyncRenderComponent, AsyncRenderComponents } from './AsyncRenderComponent';
export { DataRenderWrapper } from './DataRenderWrapper';
export { default as UseSessionUser } from './useSession';

export { UseReactQuery } from './ReactQueryWrapper';
export { default as Right } from './Right';