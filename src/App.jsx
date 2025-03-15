import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import SigninPage from "./components/templates/authentication/SigninPage";
import ForgetPassPage from "./components/templates/authentication/ForgetPasswordPage";
import ForgetPage from "./components/templates/authentication/ForgetPage";
import AcceptPage from "./components/templates/authentication/AcceptPage";
import Cookies from "js-cookie";
import BookCategoryPage from "./components/templates/pages/BookCategoryPage";

const Authorized = ({ element }) => {
  const token = Cookies.get("authToken");
  // console.log("token:", token);
  return token !== null ? <Navigate replace to="/" /> : element;
};

const UnAuthorized = ({ element }) => {
  const token = Cookies.get("authToken");
  // console.log("token:", token);
  return token !== null ? element : <Navigate replace to="/login" />;
};

function App() {
  return (
    <Layout>
      <Routes>
        <Route
          path="/signin"
          element={<UnAuthorized element={<SigninPage />} />}
        />
        <Route
          path="/forgetPass"
          element={<UnAuthorized element={<ForgetPassPage />} />}
        />
        <Route path="/accept" element={<AcceptPage />} />
        <Route
          path="/bookCategories"
          element={<UnAuthorized element={<BookCategoryPage />} />}
        />

        {/* <Route path="/forgetPasss" element={<ForgetPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
