import { AxiosInstance } from "axios";
import nookies from "nookies";
import { stringify } from "query-string";
import { DataProvider } from "@refinedev/core";
import { axiosInstance, generateSort, generateFilter } from "./utils";
import { COOKIE_AUTH } from "../utils/Cookies";
import { DBEntities } from "./types";

type MethodTypes = "get" | "delete" | "head" | "options";
type MethodTypesWithBody = "post" | "put" | "patch";


export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance,
): Omit<
  Required<DataProvider>,
  "createMany" | "updateMany" | "deleteMany"
> => ({
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    const url = `${apiUrl}/${resource}/list`;

    const {
      current = 1,
      pageSize = 10,
      mode = "server",
    } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const query: {
      take?: number;
      page?: number;
      sort?: string;
      filter?: string;
    } = {};

    if (mode === "server") {
      query.take = pageSize;
      query.page = current;
    }

    const queryFilters = generateFilter(filters);
    if (queryFilters) query.filter = JSON.stringify(queryFilters);

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sort = `{"${_sort}": "${_order}"}`;
    }

    const { data, headers } = await httpClient[requestMethod](
      `${url}?${stringify(query)}`,
      {
        headers: {
          ...headersFromMeta,
          Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
        },

      },
    );
      

    if ([DBEntities.ROLES].includes(resource as DBEntities)) {
      return {
        data,
        total: data.length,
      };
    }

    return data;
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](
      `${apiUrl}/${resource}/list?filter=${JSON.stringify({ id: {in: ids} })}`,
      { 
        headers: {
          ...headers,
          Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
        },
      },
    );

    return data;
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}/${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "post";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
      },
    });

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "patch";

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
      },
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? "get";

    const { data } = await httpClient[requestMethod](url, {
      headers: {
        ...headers,
        Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
      },
    });

    return { data };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    if (!meta?.canDelete) throw {
      message: `Forbidden: can't delete ${resource}`,
      statusCode: 403,
    }

    const url = `${apiUrl}/${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? "delete";

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers: {
        ...headers,
        Authorization: `Bearer ${nookies.get(null)?.[COOKIE_AUTH]}`,
      },
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({
    url,
    method,
    filters,
    sorters,
    payload,
    query,
    headers,
  }) => {
    let requestUrl = `${url}?`;

    // if (sorters) {
    //     const generatedSort = generateSort(sorters);
    //     if (generatedSort) {
    //         const { _sort, _order } = generatedSort;
    //         const sortQuery = {
    //             _sort: _sort.join(","),
    //             _order: _order.join(","),
    //         };
    //         requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
    //     }
    // }

    // if (filters) {
    //     const filterQuery = generateFilter(filters);
    //     requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    // }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case "put":
      case "post":
      case "patch":
        axiosResponse = await httpClient[method](url, payload, {
          headers
        });
        break;
      case "delete":
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: headers
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl,{
          headers
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
