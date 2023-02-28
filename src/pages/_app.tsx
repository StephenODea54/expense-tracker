import { type AppType } from "next/app";
import { withPasswordProtect } from "next-password-protect";

import { api } from "../utils/api";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default withPasswordProtect(api.withTRPC(MyApp), {
  loginApiUrl: "api/login",
});
