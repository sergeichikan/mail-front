import { getUrl } from "./get-url.js";

const lsSelect = document.querySelector<HTMLSelectElement>("#lsSelect");
const lsButton = document.querySelector<HTMLButtonElement>("#lsButton");
const logTextarea = document.querySelector<HTMLTextAreaElement>("#logTextarea");
const errorTextarea = document.querySelector<HTMLTextAreaElement>("#errorTextarea");
const getButton = document.querySelector<HTMLButtonElement>("#getButton");

if (
    lsSelect === null ||
    lsButton === null ||
    logTextarea === null ||
    errorTextarea === null ||
    getButton === null
) {
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
        .then((json: unknown) => {
            if (!Array.isArray(json)) {
                return;
            }
            json
                .filter((name: unknown): name is string => typeof name === "string")
                .forEach((name: string) => {
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
                .filter((line: string) => !line.startsWith(`{"lvl":3`))
                .forEach((line: string) => {
                    errorTextarea.value += `${line}\n`;
                });
        });
});
