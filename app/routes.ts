import {
  type RouteConfig,
  index,
  route,
} from "@react-router/dev/routes";

export default [
  index("./views/index.tsx"),
  route("product/:id", "./views/products/show.tsx"),
  route("edit_product", "./views/products/edit.tsx"),
  route("buy_page", "./views/products/buy_page.tsx"),
  route("login", "./views/auth/login.tsx"),
  route("register", "./views/auth/register.tsx"),
  route("profile", "./views/profile/index.tsx"),
  route("like", "./views/profile/like.tsx"),
  route("comments", "./views/comments/index.tsx"),
  route("*", "./views/notFound.tsx"),
] satisfies RouteConfig;
