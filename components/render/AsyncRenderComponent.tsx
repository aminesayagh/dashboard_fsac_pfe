import React from 'react';
import { DefaultIsLoadingRender as Loading } from './';

export interface AsyncRenderComponentProps {
    // state to check if the component is loading
    isLoading: boolean;
    // component to display when the component is loading
    IsLoadingRender?: React.FC<{}>;
    // render of the component once the state is true
    children: React.ReactElement;
}

export const AsyncRenderComponent = ({ isLoading, IsLoadingRender = Loading, children }: AsyncRenderComponentProps) => {
    // if the state is false, we display the IsLoadingWrapper component
    if (isLoading) return <IsLoadingRender />;
    // otherwise we display the render
    return children;
};

export interface AsyncRenderComponentsProps {
    // list of data to render
    dataList: any[];
    // function to check the loading state of each data item
    stateFn: (data: any) => boolean;
    // component to display when the component is loading
    IsLoadingRender?: React.FC<{}>;
    index?: number;
    // render of the component once all data is loaded
    children: React.ReactElement;
}

export const AsyncRenderComponents = ({ dataList, stateFn, IsLoadingRender = Loading, children, index = 0 }: AsyncRenderComponentsProps) => {
    // if we have rendered all the data, return the final render
    if (!dataList[index]) return children;

    // otherwise, render the next data in the list using the AsyncRenderComponent
    return (
        <>
            <AsyncRenderComponent 
                isLoading={stateFn(dataList[index])}
                IsLoadingRender={IsLoadingRender}
            >
                <AsyncRenderComponents dataList={dataList} stateFn={stateFn} index={index + 1} >
                    {children}
                </AsyncRenderComponents>
            </AsyncRenderComponent>
        </>
    );
};