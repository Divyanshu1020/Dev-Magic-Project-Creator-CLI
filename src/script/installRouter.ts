import { execSync } from "child_process";

export default function installRouter(){
    console.log("Installing React Router...");
    execSync("npm i react router dom", {
        stdio: "inherit",
    });
    console.log("React Router installed successfully!");
    console.log("Creating routes foulder in src...");
    execSync("mkdir src/routes", {
        stdio: "inherit",
    });
    
    console.log("Routes foulder created successfully!");
}