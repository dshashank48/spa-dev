import axios from "axios";
import { getAccessToken } from "../utils";

const api = axios.create({
  baseURL: `https://${process.env.REACT_APP_BASE_HOST}/api/presentation`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async extendedConfig => {
  const config = Object.assign({}, extendedConfig);

  const accessToken = (await getAccessToken()) || null;

  if (!config.headers.Authorization) {
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    console.error(error);
    if (error && error.response && error.response.status === 401) {
      const accessToken = await getAccessToken();
      error.config.headers["Authorization"] = `Bearer ${accessToken}`;
      return api.request(error.config);
    } else if (error && error.response && error.response.status === 403) {
      // SMTH
    }
    return Promise.reject(error);
  }
);

// TODO: merge these two in one

const realmApi = axios.create({
  baseURL: `https://${process.env.REACT_APP_BASE_HOST}/api/realm`,
  headers: {
    "Content-Type": "application/json",
  },
});

realmApi.interceptors.request.use(async extendedConfig => {
  const config = Object.assign({}, extendedConfig);

  const accessToken = (await getAccessToken()) || null;

  if (!config.headers.Authorization) {
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
  }

  return config;
});

realmApi.interceptors.response.use(
  response => response,
  async error => {
    console.error(error);
    if (error && error.response && error.response.status === 401) {
      const accessToken = await getAccessToken();
      error.config.headers["Authorization"] = `Bearer ${accessToken}`;
      return realmApi.request(error.config);
    } else if (error && error.response && error.response.status === 403) {
      // SMTH
    }
    return Promise.reject(error);
  }
);

export const getUserDetails = async (dealerGroup, id) => {
  const { data } = await realmApi.get(`/user/${dealerGroup}/${id}`);
  return data.data;
};

export const getPresentationHomeById = async presentationId => {
  const { data } = await api.get(`/${presentationId}`);
  return data.data;
};

export const getPresentationPageById = async (presentationId, pageId) => {
  const { data } = await api.get(`/${presentationId}/${pageId}`, {
    headers: {
      Prefer: `code=200, example=${pageId}`,
    },
  });
  return data.data;
};

export const getPresentationPageSource = async (
  presentationId,
  sectionName
) => {
  const { data } = await api.get(`/${presentationId}/source/${sectionName}`);
  return data;
};

export const postRequestDocument = async file => {
  let buffer = await file.arrayBuffer();

  const { data } = await api.request({
    url: "/create",
    method: "POST",
    data: buffer,
    headers: {
      "Content-Type": file.type,
    },
  });

  return data.data;
};

export const putPresentationHome = async presentationHomeData => {
  const { data } = await api.request({
    url: `/${presentationHomeData.id}`,
    method: "PUT",
    data: { data: presentationHomeData },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data;
};

export const putPresentationPage = async ({
  presentationId,
  presentationPageData,
}) => {
  const { data } = await api.request({
    url: `/${presentationId}/${presentationPageData.id}`,
    method: "PUT",
    data: { data: presentationPageData },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data;
};

export const postPresentationPage = async presentationId => {
  const { data } = await api.request({
    url: `/${presentationId}/page`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data.data;
};

export default api;
