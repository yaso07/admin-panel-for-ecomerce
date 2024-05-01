import { Outlet } from "react-router";
import SideBar from "./components/SideBar";
function App() {
  return (
    <>
      <div className="flex flex-row">
        <div className="relative" style={{ width: "25%", height: "100vh" }}>
          <SideBar></SideBar>
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
