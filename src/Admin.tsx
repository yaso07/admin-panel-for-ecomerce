
import { RouterProvider } from "react-router";
import { routes } from "./Router"
 
 
const Admin = () => {
    console.log(routes.basename)
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default Admin