import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  // ApolloLink,
  // createHttpLink,
} from "@apollo/client";

import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("jwt");



const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: createUploadLink({
    uri: "https://bagclient-production.up.railway.app/graphql",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  }),
  // link: authMiddleware.concat(httpslink),
  cache: new InMemoryCache(),
});

import { Provider } from "react-redux";
import { store } from "./lib/redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
      <ToastContainer/>
    </ApolloProvider>
  </Provider>
);
