import {createBrowserRouter, Outlet, redirect } from "react-router-dom";
import SideBar from "./components/SideBar";
import Customer from "./components/Customer";
import Product from "./components/Product";
import ProductForm from "./components/ProductForm";
import Orders from "./components/Orders";
import {action as productAction} from './components/ProductForm'
import { loader as productDataLoader } from "./components/Product";
import CustomerForm from "./components/CustomerForm";
import {action as customerAction} from './components/CustomerForm'
import {loader as customerLoader} from './components/Customer'
import Account from "./components/Account";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<><div className="text-center mt-10">Page not found</div></>,
    children: [
      {
        index: true,
        element:<Customer></Customer>,
        loader: async () => {
          const data=await customerLoader().then((res)=>{console.log(res);return res})
          return await data;
        },

      
      },
      {
        path: "customerForm",
        element: <CustomerForm></CustomerForm>,
        action: async ({ request }) => {
          await customerAction(await request.formData());
          return redirect("..");
        },
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <Product></Product>,
            loader: async () => {
              return await productDataLoader();
            },
          },
          {
            path: "form",
            element: <ProductForm></ProductForm>,
            action: async ({ request }) => {
              const formdata = await request.formData();
              await productAction(formdata);
              return redirect("/products");
            },
          },
        ],
      },
      {
        path: "orders",
        element: <Orders></Orders>,
      },
      {
        path:"account",
        element:<Account></Account>
      }
    ],
  },
]);
function App() {
  return (
    <>
      <div className="flex flex-row">
        <div className="relative" style={{width:"25%",height:"100vh"}}>
            <SideBar></SideBar>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App
