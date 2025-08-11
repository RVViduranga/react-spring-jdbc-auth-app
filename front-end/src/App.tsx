import './App.css'
import {createBrowserRouter, redirect, RouteObject, RouterProvider} from "react-router";
import Login from "./view/login/Login.tsx";
import Main from "./view/main/Main.tsx";

type Routes = RouteObject[];
const routes: Routes = [
    {
        index: true,
        loader: async ()=>{
            const response =
                await fetch('http://localhost:8080/app/clients', {credentials: 'include'});
            if (response.status === 200){
                return {clients: await response.json()};
            }else{
                return redirect('/login');
            }
        },
        Component: Main
    },
    {
        path: 'login',
        Component: Login
    }
];
const router = createBrowserRouter(routes);

function App() {

  return <RouterProvider router={router}/>
}

export default App
