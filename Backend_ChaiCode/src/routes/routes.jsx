import React from 'react'
import PATH from "./path";
import { Redirect } from "react-router";
import PAGE_KEYS from "./page_key";

import User from '../pages/user/user.js'

export const ROUTES = [
  {
    exact: true,
    path: PATH.root,
    component: () => <Redirect to={PATH.signin} />,
  },
  {
    key: PAGE_KEYS.user,
    exact: true,
    path: PATH.user.root,
    component: User,
    role: ["admin"],
  },
]



