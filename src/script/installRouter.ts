import { execSync } from "child_process";
import fs from "fs-extra";
import path from "path";
export default function installRouter() {
  console.log("Installing React Router...");
  execSync("npm i react router dom", {
      stdio: "inherit",
  });
  console.log("React Router installed successfully!");

  console.log("Creating routes folder in src...");
  const pagesDir = "./src/routes";
  fs.ensureDirSync(pagesDir);
  console.log("Routes folder created successfully!");

  console.log("Copying Routes.tsx template...");
  const destFile = path.join(pagesDir, "Routes.tsx");

  try {
    if(routesFileSource) {
        fs.writeFileSync( destFile, routesFileSource );
    } else {
        fs.writeFileSync(destFile,  "// TODO: Add your routes here\n");
    }
  } catch (error) {
    console.error("Error copying Routes.tsx template:", error);
  }
}

const routesFileSource = `
import App from '@/App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Homepage from '@/pages/HomePage';
export default function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          // element: <Homepage />,
        },
        // TODO: Add your routes here
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

// TODO: In main.tsx replace App with Routes
`
