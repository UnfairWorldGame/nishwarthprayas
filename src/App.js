// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Services from "./components/Services";
import Connectus from "./components/Connectus";
import Homepage from "./components/Homepage";
import Adminpage from "./components/Adminpage";
import LoginPage from "./components/LoginPage";
import Admin from "./components/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import Page404 from "./components/Page404";
import NgoFamily from "./components/NgoFamily";
import NewsBlog from "./components/NewsBlog";
import Chatbot from "./components/Chatbot";
import Blog from "./components/Blog";

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/india-ngo-contact" element={<Contact />} />
        <Route path="/india-ngo-about" element={<About />} />
        {/* <Route path="/india-repairtechies-services" element={<Services />} /> */}
        <Route path="/online-tech-services" element={<Services />} />
        <Route path="/online-connectus" element={<Connectus />} />
        <Route path="/admin-page-login" element={<Adminpage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route
          path="/admin-page"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/ngo-service-page" element={<Services />} />
        <Route path="/ngo-family-page" element={<NgoFamily />} />
        <Route path="/ngo-latest-news-blog" element={<NewsBlog />} />
        <Route path="/ngo-ai-chat-bot" element={<Chatbot />} />
        <Route path="/ngo-blog" element={<Blog />} />

        <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
