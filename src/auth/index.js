/* eslint-disable no-undef */
import React, { createContext, useState, useEffect, useContext } from "react";
import { ErrorElement } from "../App";
import Spinner from "../components/Spinner";
import useSessionStorage from "../hooks/useSessionStroge";
import { getRealm } from "../utils";
import keycloak from "./keycloak";

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useSessionStorage("__keycloak_token__");
  const [parsedToken, setParsedToken] = useSessionStorage(
    "__keycloak_token_parsed__"
  );

  const setTokenInSessionStorage = keycloak => {
    setToken(keycloak.token);
    setParsedToken(keycloak.tokenParsed);
  };

  const updateToken = () => {
    keycloak
      .updateToken(60)
      .then(refreshed => {
        if (refreshed) {
          setTokenInSessionStorage(keycloak);
        }
      })
      .catch(e => {
        setError(e);
        console.error("Failed to refresh token");
      });
  };

  useEffect(() => {
    const realmRegExp = new RegExp(`/${getRealm()}/`, "i");
    keycloak
      .init({
        onLoad: "login-required",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
        redirectUri: `${window.location.href.replace(
          realmRegExp,
          `/${getRealm()}/`
        )}`,
      })
      .then(auth => {
        if (!auth) {
          // Try again to auth!
          window.location.reload();
        } else {
          // const userId = keycloak.tokenParsed.sub;
          // const email = keycloak.tokenParsed.email;

          // Successful here is the token!
          setTokenInSessionStorage(keycloak);
        }
      })
      .catch(e => {
        console.error(e);
        setError(e);
        window.location.reload();
      })
      .finally(() => {
        setLoading(false);
      });

    // Periodically Refresh Token
    setInterval(() => {
      console.log("Updating Token In Background");
      updateToken();
    }, 300000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading, error, token, parsedToken, updateToken };
};

export const AuthContext = createContext({});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const { loading, error, token, parsedToken, updateToken } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        loading,
        error,
        token,
        parsedToken,
        updateToken,
      }}
    >
      {loading && <Spinner />}
      {error && <ErrorElement />}
      {!loading && !error && children}
    </AuthContext.Provider>
  );
};
