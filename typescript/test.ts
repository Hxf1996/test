type a<T> = {
    [P in keyof T]: T[P];
}
