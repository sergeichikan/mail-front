import { getUrl } from "./get-url";
const lsSelect = document.querySelector("#lsSelect");
const lsButton = document.querySelector("#lsButton");
const logTextarea = document.querySelector("#logTextarea");
const errorTextarea = document.querySelector("#errorTextarea");
const getButton = document.querySelector("#getButton");
if (lsSelect === null ||
    lsButton === null ||
    logTextarea === null ||
    errorTextarea === null ||
    getButton === null) {
    throw new Error("Invalid elements");
}
lsButton.addEventListener("click", () => {
    const url = getUrl("/logs/ls/");
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(url, init)
        .then((res) => res.json())
        .then((json) => {
        if (!Array.isArray(json)) {
            return;
        }
        json
            .filter((name) => typeof name === "string")
            .forEach((name) => {
            const option = document.createElement("option");
            option.value = name;
            lsSelect.append(option);
        });
    });
});
getButton.addEventListener("click", () => {
    const url = getUrl("/logs/");
    const init = {
        method: "POST",
        body: JSON.stringify({
            name: lsSelect.value,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(url, init)
        .then((res) => res.json())
        .then(({ data }) => {
        logTextarea.value = data;
        errorTextarea.value = "";
        data
            .split("\n")
            .filter((line) => !line.startsWith(`{"lvl":3`))
            .forEach((line) => {
            errorTextarea.value += `${line}\n`;
        });
    });
});
