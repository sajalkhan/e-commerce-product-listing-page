import { useQuery } from 'react-query';
import axios from '@/utils/axiosConfig';
import axiosErrorHandler from '@/utils/axiosErrorHandler';

const getProducts = async () => {
  try {
    const { data } = await axios.get('/products');
    return data;
  } catch (error: any) {
    return axiosErrorHandler(error);
  }
};

export const useGetProducts = () => {
  return useQuery('products', getProducts);
};
