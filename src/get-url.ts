export const getUrl = (path: string, protocol: string = "http"): string => {
    const { value: host = "" } = document.querySelector<HTMLInputElement>("#hostInput") || {};
    const { value: port = "" } = document.querySelector<HTMLInputElement>("#portInput") || {};
    return `${protocol}://${host}:${port}${path}`;
};
