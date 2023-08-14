import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Tambah from "./pages/Tambah";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/detail/:id" Component={Detail} />
          <Route path="/edit/:id" Component={Edit} />
          <Route path="/tambah" Component={Tambah} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
