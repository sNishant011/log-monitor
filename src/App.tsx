import { Authenticated,  Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { notificationProvider, ThemedLayoutV2 } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
    CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Register } from "./pages/register";
import { Login } from "./pages/login";
import { ForgotPassword } from "./pages/forgotPassword";
import { Header } from "./components/header";
import { UsersList } from "./pages/users";

import { authProvider } from "./providers/authProvider";
import { CustomDataProvider } from "./providers/dataProvider";
import { UserEdit } from "./pages/users/edit";
import { UserShow } from "./pages/users/show";
import { UserCreate } from "./pages/users/create";
import Title from "./components/title";

function App() {

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={CustomDataProvider()}
            notificationProvider={notificationProvider}
            routerProvider={routerBindings}
            authProvider={authProvider}
            resources={[
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                show: "/users/show/:id",
                edit: "/users/edit/:id",
              }
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
<Routes>
                        <Route
                            element={
                                <Authenticated
                                    fallback={<CatchAllNavigate to="/login" />}
                                >
                                    <ThemedLayoutV2 Title={Title}  Header={Header}>
                                        <Outlet />
                                    </ThemedLayoutV2>
                                </Authenticated>
                            }
                        >
                            <Route index element={<NavigateToResource />} />
                            <Route path="/users" element={<UsersList />} />
                            <Route path="/users/show/:id" element={<UserShow />} />
                            <Route path="/users/edit/:id" element={<UserEdit />} />
                            <Route path="/users/create" element={<UserCreate />} />
                        </Route>
                        <Route
                            element={
                                <Authenticated fallback={<Outlet />}>
                                    <NavigateToResource resource="users" />
                                </Authenticated>
                            }
                        >
                            <Route
                                path="/login"
                                element={<Login/>}
                            />
                            <Route path="/forgot-password" element={<ForgotPassword />} />

                            <Route
                                path="/register"
                                element={<Register/>}
                            />
                        </Route>
                    </Routes>
            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
