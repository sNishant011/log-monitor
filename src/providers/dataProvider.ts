import { DataProvider, LogicalFilter } from "@refinedev/core";
import { AxiosError, AxiosInstance } from "axios";
import { API_URL } from "../constants";
import axiosInstance from "../utils/axiosInstance";

export const CustomDataProvider = (
  apiUrl?: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<Required<DataProvider>, "createMany" | "updateMany" | "deleteMany"> => ({
  getList: async ({ resource, filters }) => {
    const filter: LogicalFilter = filters?.at(0) as LogicalFilter;
    let url;
    if (filter) {
      url = `/${resource}/?${filter.field}=${filter.value}`;
    } else {
      url = `/${resource}`;
    }
    try {
      const { data } = await httpClient.get(url);
      return Promise.resolve({
        data,
        total: data.length,
      });
    } catch (e) {
      console.log(e);
      return Promise.reject((e as AxiosError)?.response?.data);
    }
  },
  create: async ({ resource, variables }) => {
    const url = `/${resource}/`;

    if (resource === "products") {
      console.log(variables);
    }
    return httpClient
      .post(url, variables)
      .then((res) => Promise.resolve({ data: res.data }))
      .catch((err) =>
        Promise.reject({
          message: err.response?.data.message || "Something went wrong",
          statusCode: err.response?.status || 500,
        }),
      );
  },
  deleteOne: async ({ resource, id }) => {
    const url = `/${resource}/${id}/`;

    return httpClient
      .delete(url)
      .then((res) => {
        return Promise.resolve({ data: res.data });
      })
      .catch((err) => {
        return Promise.reject({
          message: err.response?.data.message || "Something went wrong",
          statusCode: err.response?.status || 500,
        });
      });
  },
  getOne: async ({ resource, id }) => {
    const url = `/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return { data };
  },
  update: async ({ resource, id, variables }) => {
    const url = `/${resource}/${id}/`;

    return httpClient
      .patch(url, variables)
      .then((res) => {
        return Promise.resolve({ data: res.data });
      })
      .catch((err) => {
        return Promise.reject({
          message: err.response?.data.message || "Something went wrong",
          statusCode: err.response?.status || 500,
        });
      });
  },

  getApiUrl: () => apiUrl || API_URL,

  getMany: async ({ resource, ids }) => {
    console.log("resource", resource);
    const url = `/${resource}?ids=${ids.join(",")}`;
    const { data } = await httpClient.get(url);

    return { data };
  },

  custom: ({ url }) => {
    return axiosInstance.get(url);
  },
});
