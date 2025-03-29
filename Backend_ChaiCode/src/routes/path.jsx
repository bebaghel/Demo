const PATH = {
  root: "/",
  dashboard: "/dashboard",
  user: { root: "/user", login: "/user/login", logout: "/user/logout" },
  like: "/like",
  comment: "/comment",
  tweet: "/tweet",
  video: "/video",
  playlist: "/playlist",
  subscription: "/subscription",
  pageNotFound: { root: "*" },
  login: "/login",
  logout: "/logout",

  // my_profile: "/my-profile",
  // admin: { root: "/admin", edit: "/admin/edit/:id", add: "/admin/add" },
  // customer: { root: "/customer", view: "/customer/view/:id", edit: "/customer/edit/:id" },
  // partner: { root: "/partner", edit: "/partner/edit/:id",  add: "/partner/add",  view: "/partner/view/:id",  },
};

export default PATH;
