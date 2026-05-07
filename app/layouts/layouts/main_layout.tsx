// import { Link, Outlet } from "react-router";
// import Header from "../components/header";
// import Footer from "../components/footer";
// import { Breadcrumb } from "react-bootstrap";
// import React, { createContext, useContext } from "react";

// interface BreadcrumbItem {
//   title: React.ReactNode;
//   path?: string;
// }

// interface BreadcrumbContextType {
//   crumbs: BreadcrumbItem[];
//   setCrumbs: (crumbs: BreadcrumbItem[]) => void;
// }

// const BreadcrumbContext = createContext<BreadcrumbContextType>({
//   crumbs: [],
//   setCrumbs: () => {},
// });

// export const useBreadcrumbs = () => useContext(BreadcrumbContext);

// const BreadCrumbs = () => {
//   const { crumbs } = useContext(BreadcrumbContext);

//   return (
//     <Breadcrumb>
//       <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }}>Главная</Breadcrumb.Item>
//       {crumbs.map((item, index) =>
//         item.path ? (
//           <Breadcrumb.Item
//             key={index}
//             linkAs={Link}
//             linkProps={{ to: item.path }}
//           >
//             {item.title}
//           </Breadcrumb.Item>
//         ) : (
//           <Breadcrumb.Item key={index} active>
//             {item.title}
//           </Breadcrumb.Item>
//         )
//       )}
//     </Breadcrumb>
//   );
// };

// export default function Layout() {

//   return (
//       <>
//         <Header />
//         <main>
//           <Outlet />
//         </main>
//         <Footer />
//       </>
//   );
// }