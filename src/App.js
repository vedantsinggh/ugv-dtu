import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ISDC from "./pages/ISDC";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import Footer from "./components/Footer";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop/>

      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/isdc" element={<ISDC />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:slug" element={<BlogPost />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
