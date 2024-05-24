import {
  Route,
  Outlet,
  Routes,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import { Login } from "./pages/auth";

import { Layout } from "./components";
import { useSelector } from "react-redux";

import PageTitle from "./components/PageTitle";
import {
  ECommerce,
  Profile,
  Settings,
  AddPackage,
  ListPackage,
  EditPackage,
  AddSetting,
  ListSetting,
  StoreDetails,
  Stores
} from "./pages/user";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            index
            path="/"
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />

          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />

          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/addpackage"
            element={
              <>
                <PageTitle title="Add Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddPackage />
              </>
            }
          />
          <Route
            path="/listpackage"
            element={
              <>
                <PageTitle title="List Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ListPackage />
              </>
            }
          />
          <Route
            path="/editpackage"
            element={
              <>
                <PageTitle title="Edit Package | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <EditPackage />
              </>
            }
          />
          <Route
            path="/addsetting"
            element={
              <>
                <PageTitle title="Add Setting | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <AddSetting />
              </>
            }
          />
          <Route
            path="/listsetting"
            element={
              <>
                <PageTitle title="List Setting | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ListSetting />
              </>
            }
          />
          <Route
            path="/stores"
            element={
              <>
                <PageTitle title="Stores | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Stores />
              </>
            }
          />
          <Route
            path="/storedetails"
            element={
              <>
                <PageTitle title="Store Detail | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <StoreDetails />
              </>
            }
          />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>

      {/* <Route path="*" element={<Error404 />} /> */}
    </BrowserRouter>
  );
};

const ProtectedRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Layout /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default Router;
