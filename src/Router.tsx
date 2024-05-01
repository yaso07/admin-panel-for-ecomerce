import {createBrowserRouter,redirect } from "react-router-dom";


import Product from "./components/Product";
import ProductForm from "./components/ProductForm";
import Orders from "./components/Orders";
import {action as productAction} from './components/ProductForm'
import { loader as productDataLoader } from "./components/Product";
import CustomerForm from "./components/CustomerForm";
import {action as customerAction} from './components/CustomerForm'
import Customer, {loader as customerLoader} from './components/Customer'
import Account from "./components/Account";
import App from "./App";
import UpdateProduct, { action as updateProductAction, loader as updateProductLoader } from "./components/UpdateProduct";
import axios from "axios";
import { getUrl } from "./utils/api";
import UpdateCustomer,{loader as updateCustomerLoader ,action as updateCustomerAction} from "./components/UpdateCustomer";
import Messages from "./components/Messages";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: (
      <>
        <div className="text-center mt-10">Page not found</div>
      </>
    ),
    children: [
      {
        index:true,
        element: <Customer></Customer>,
        loader: async () => {
          const data = await customerLoader();
          return data;
        }
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
        path: "customerupdate",
        children:[
        {
        path:":id",
        element: <UpdateCustomer></UpdateCustomer>,
        loader: async (req) => {
          return await updateCustomerLoader(req.params.id);
        },
        action: async ({ request, params }) => {
          
            const formdata = await request.formData();
            await updateCustomerAction(formdata, params.id);
          return redirect("/");
        }
      }
      ]
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
          {
            path: "update/:id",
            element: <UpdateProduct></UpdateProduct>,
            loader: async (req) => {
              const { id } = req.params;
              return await updateProductLoader(id);
            },
            action: async ({ request, params }) => {
              console.log(request.method);
              if (request.method == "DELETE") {
                console.log("scs");
                await axios.delete(getUrl() + `products/${params.id}`);
                const wait = new Promise((resolve) => {
                  return setTimeout(() => {
                    resolve("success");
                  }, 2000);
                });
                await wait;
              } else {
                const formdata = await request.formData();
                await updateProductAction(formdata, params.id);
              }
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
        path: "account",
        element: <Account></Account>,
      },
      {
        path:"messages",
        element:<Messages></Messages>
      }
    ],
  },
])