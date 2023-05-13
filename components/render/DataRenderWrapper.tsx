interface DataRenderWrapperProps<T> {
    // function that takes in data and returns a React element
    front: (data: T) => React.ReactElement;
    // function that takes an object with a render property and returns a React element
    data: (props: { render: (data: T) => React.ReactElement }) => React.ReactElement;
}

export function DataRenderWrapper<T>({ front, data }: DataRenderWrapperProps<T>) {
    // call the data function with the front prop passed as the render property
    return data({ render: front })
}