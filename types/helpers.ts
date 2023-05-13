// ObjectValue<T> is a generic type that allows you to retrieve the value of a given property of an object of type T.
// The `keyof T` operator is used to get the keys of the object T and the T[keyof T] is used to extract the value of property
export type ObjectValue<T> = T[keyof T];

// ObjectType<T, K extends keyof T> is a generic type that allows you to retrieve the type of a given property of an object of type T.
// K is the key of the object T and T[K] is used to extract the type of property
export type ObjectType<T, K extends keyof T> = T[K];

