import axiosInstance from '../config/apiConfig';

export const fetchResources = async (resource, query = '', page, size) => {
    return await axiosInstance.get(resource, {
        params: {
            page: page && page >= 1 ? page - 1 : 0,
            size: size,
            searchText: query
        }
    });
};

export const createResource = async (resource, payload) => {
    return await axiosInstance.post(resource, payload);
}