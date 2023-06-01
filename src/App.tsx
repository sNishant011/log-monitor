import { Authenticated, Refine } from "@refinedev/core";
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
import { UsersList } from "./pages/users";

import { authProvider } from "./providers/authProvider";
import { CustomDataProvider } from "./providers/dataProvider";
import { UserEdit } from "./pages/users/edit";
import { UserShow } from "./pages/users/show";
import { UserCreate } from "./pages/users/create";
import { ThemedSiderV2 } from "./components/themedLayout/sider";
import Title from "./components/themedLayout/title";
import { Header } from "./components/themedLayout";
import { accessControlProvider } from "./providers/accessControlProvider";
import { NginxLogList } from "./pages/nginx/list";
import { ApacheLogList } from "./pages/apache/list";
import { NginxDashboard } from "./pages/nginx/dashboard";
import { ApacheDashboard } from "./pages/apache/dashboard";

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
            accessControlProvider={accessControlProvider}
            resources={[
              {
                name: "apache",
                options: {
                  label: "Apache Logs",
                },
              },
              {
                parentName: "apache",
                name: "apache-dashboard",
                list: "/logs/apache",
                options: {
                  label: "Dashboard",
                },
              },
              {
                parentName: "apache",
                name: "apache-logs",
                list: "/logs/apache/raw",
                options: {
                  label: "Raw Logs",
                },
              },
              {
                name: "nginx",
                options: {
                  label: "Nginx Logs",
                },
              },
              {
                parentName: "nginx",
                name: "nginx-dashboard",
                list: "/logs/nginx",
                options: {
                  label: "Dashboard",
                },
              },
              {
                parentName: "nginx",
                name: "nginx-logs",
                list: "/logs/nginx/raw",
                options: {
                  label: "Raw Logs",
                },
              },
              {
                name: "users",
                list: "/users",
                create: "/users/create",
                show: "/users/show/:id",
                edit: "/users/edit/:id",
              },
            ]}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <Routes>
              <Route
                element={
                  <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2 Sider={ThemedSiderV2} Title={Title} Header={Header}>
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
                <Route path="/logs/nginx" element={<NginxDashboard />} />
                <Route path="/logs/apache" element={<ApacheDashboard />} />
                <Route path="/logs/nginx/raw" element={<NginxLogList />} />
                <Route path="/logs/apache/raw" element={<ApacheLogList />} />
                <Route path="*" element={<h1>You&apos;re lost</h1>} />
              </Route>
              <Route
                element={
                  <Authenticated fallback={<Outlet />}>
                    <NavigateToResource resource="users" />
                  </Authenticated>
                }
              >
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/register" element={<Register />} />
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
