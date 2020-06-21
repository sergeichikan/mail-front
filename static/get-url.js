export const getUrl = (path, protocol = "http") => {
    const { value: host = "" } = document.querySelector("#hostInput") || {};
    const { value: port = "" } = document.querySelector("#portInput") || {};
    return `${protocol}://${host}:${port}${path}`;
};
