import React, { Component } from "react";
import { BrowserRouter,
   Routes, 
   Route,
   } from "react-router-dom";
   import { NavbarComponent } from "./components";
  import { Home, Sukes } from "./pages";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            {/* ⬇️ 3. Gunakan "element" (bukan "component") dan "path" */}
            <Route path="/" element={<Home />} exact/>
            <Route path="/sukses" element={<Sukes />} exact/>
          </Routes>
        </main>
      </BrowserRouter>
    );  
  }
}
