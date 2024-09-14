import { execSync } from "child_process";
import fs from "fs-extra";
export default function installAxios() {
    execSync("npm i axios", {
        stdio: "inherit",
    });
    console.log("Installing Axios...");

    console.log("Creating axios folder in src...");
    fs.ensureDirSync("./src/axios/apis");
    fs.ensureDirSync("./src/axios/urls");
    fs.writeFileSync("./src/axios/axios.config.ts", axiosConfigSource);

    console.log("Creating constants for env in src...");
    fs.writeFileSync(".env", envFile);
    fs.ensureDirSync("./src/constants");
    fs.writeFileSync("./src/constants/env.ts", envConstants);

    console.log("updating .gitignore...");
    fs.appendFileSync(
        ".gitignore",
        ".env"
    )
    console.log("Axios installed successfully!");
}

const axiosConfigSource = `
import env from '@/constants/env';
import axios from 'axios';

export default axios.create({
    baseURL: env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // Add other default headers if needed
    },
    withCredentials: true
})
`

const envFile = `
VITE_BASE_URL = http://localhost:8080/api/v1/

`
const envConstants = `
export default {
    BASE_URL: import.meta.env.VITE_BASE_URL
}
`