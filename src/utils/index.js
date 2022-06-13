import keycloak from "../auth/keycloak";

export const formatMoney = (
  number,
  minimumFractionDigits = 0,
  maximumFractionDigits = 0,
  style = "decimal"
) => {
  if (!number) {
    return "";
  }
  return number.toLocaleString("en-US", {
    currency: "USD",
    style,
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

export const kFormatter = num => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

export const reorderList = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const getAuthUrl = () => {
  return `https://${process.env.REACT_APP_BASE_HOST}/auth`;
};

export const getRealm = () => {
  let token = JSON.parse(sessionStorage.getItem("__keycloak_token_parsed__"));
  if (token) {
    return token.planpod_dealer_group;
  }

  let pathname = window.location.pathname;
  let realm = pathname.split("/")[2]?.toLowerCase();
  return realm;
};

export const getDGDisplayName = () => {
  // returns DG display name, "Us" if not set
  const dgDisplayDict = {
    ri: "RI",
    consultum: "Consultum",
  };

  let realm = getRealm();
  let result = dgDisplayDict[realm];
  // console.log(`realm = ${realm}`);
  // console.log(`dgDisplayDict[realm] = ${dgDisplayDict[realm]}`);
  // console.log(`returning result = ${result}`);
  return result || "Us";
};

export const handleLogout = () => {
  window.sessionStorage.clear();
  return keycloak.logout();
};

export const getAccessToken = async () => {
  let accessToken = JSON.parse(
    window.sessionStorage.getItem("__keycloak_token__")
  );
  try {
    const refreshed = await keycloak.updateToken(60);

    if (refreshed) {
      accessToken = keycloak.token;
      window.sessionStorage.setItem(
        "__keycloak_token__",
        JSON.stringify(keycloak.token)
      );
      window.sessionStorage.setItem(
        "__keycloak_token_parsed__",
        JSON.stringify(keycloak.tokenParsed)
      );
    }

    return accessToken;
  } catch (error) {
    console.error(error);
    handleLogout();
  }
};
