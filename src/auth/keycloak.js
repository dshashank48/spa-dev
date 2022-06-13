import Keycloak from "keycloak-js";

const getRealmFromWindow = () => {
  let pathname = window.location.pathname;
  let realm = pathname.split("/")[2]?.toLowerCase();
  return realm;
};

let initOptions = {
  url: `https://${process.env.REACT_APP_BASE_HOST}/auth`,
  realm: getRealmFromWindow(),
  clientId: "dsrf-app",
};

let keycloak = new Keycloak(initOptions);

export default keycloak;
