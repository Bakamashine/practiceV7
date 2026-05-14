import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("./views/index.tsx"),

  // Product
  route("product/:id", "./views/products/show.tsx"),
  route("product/:id/edit", "./views/products/edit.tsx"),
  route("product/edit_page", "./views/products/edit_page.tsx"),
  route("buy_page", "./views/products/buy_page.tsx"),
  route("product/create", "./views/products/create.tsx"),

  // Auth
  route("login", "./views/auth/login.tsx"),
  route("register", "./views/auth/register.tsx"),


  // Profile
  route("profile", "./views/profile/index.tsx"),
  route("like", "./views/profile/like.tsx"),
  route("/profile/edit", './views/profile/edit.tsx'),


  
  // feedback
  // route("comments", "./views/comments/index.tsx"),
  route("feedback", "./views/feedback/index.tsx"),
  route("feedback/create", "./views/feedback/create.tsx"),
  route("*", "./views/notFound.tsx"),
] satisfies RouteConfig;
