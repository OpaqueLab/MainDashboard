import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Layout";
import Dashboard from "../pages/Dashboard";
import List from "../pages/List";
import Inbox from "../pages/Inbox";
import MyBlogs from "../pages/MyBlogs";
import Program from "../pages/Program";
import Agenda from "../pages/Agenda";
import Setting from "../pages/Setting";
import CreateBlog from "../pages/CreateBlog";
import BlogEdit from "../pages/BlogEdit";
import BlogView from "../pages/BlogView";
import Login from "../pages/Login";
import RouteGuard from "./RouteGuard";
import Pending from "../pages/Pending";
import CreateWithEditor from "../components/CreateBlog/CreateWithEditor.jsx/CreateWithEditor";
import CreateWithDrapAndDrop from "../components/CreateBlog/CreateWithDrapAndDrop/CreateWithDrapAndDrop";
import Detail from "../pages/Detail";
import SelectUser from "../pages/SelectUser";
import HashTag from "../pages/HashTag";
import ContentList from "../pages/ContentList";
import ZZ from "../pages/ZZ";
import UserList from "../pages/UserList";
import Ads from "../pages/Ads";
import Sites from "../pages/Sites";

const Path = () => {
  const routes = [
    {
      path: "inbox",
      element: <Inbox />,
    },
    {
      path: "list",
      element: <List />,
    },
    {
      path: "create",
      element: <CreateBlog />,
    },
    {
      path: "create/editor",
      element: <CreateWithEditor />,
    },
    {
      path: "create/drop",
      element: <CreateWithDrapAndDrop />,
    },
    {
      path: "edit",
      element: <BlogEdit />,
    },
    {
      path: "view",
      element: <BlogView />,
    },
    {
      path: "list/myBlogs",
      element: <MyBlogs />,
    },
    {
      path: "program",
      element: <Program />,
    },
    {
      path: "agenda",
      element: <Agenda />,
    },
    {
      path: "setting",
      element: <Setting />,
    },
    {
      path: "list/pending",
      element: <Pending />,
    },
    {
      path: "hashtag",
      element: <HashTag />,
    },
    {
      path: "userList",
      element: <UserList/>,
    },
    {
      path: "contentList",
      element: <ContentList />,
    },
    {
      path: "ZZ",
      element: <ZZ />,
    },
    {
      path: "ZZ/Ads",
      element: <Ads />,
    },
    {
      path: "ZZ/Sites",
      element: <Sites />,
    },
  ];
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/select-user" element={<SelectUser />} />
        <Route path="/preview" element={<Detail />} />
        <Route
          path="/"
          element={
            <RouteGuard>
              <Layout />
            </RouteGuard>
          }
        >
          <Route index element={<Dashboard />} />
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Path;
