import { Icon } from "@iconify/react";

const SIDENAV_ITEMS = [
  {
    title: "Home",
    path: "/",
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: "Blog",
    path: "/blog/add-blog",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Blog", path: "/blog/add-blog" },
      { title: "All Blog", path: "/blog/all-blog" },
    ],
  },
  {
    title: "Employee",
    path: "/employee/add-employee",
    icon: <Icon icon="lucide:folder" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: "Add Employee", path: "/employee/add-employee" },
      { title: "All Employee", path: "/employee/all-employee" },
    ],
  },
];

export default SIDENAV_ITEMS;
