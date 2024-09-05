/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo } from 'react';
import { Pagination } from 'antd';
import ProductCard from '@/components/molecules/productCard';
import LoadingCard from '@/components/atoms/loadingCard';

interface IShowProducts {
  isLoading: boolean;
  allProducts: any;
  pageNumber?: number;
  handlePage?: (page: number) => void;
  filters?: any;
  sortOrder?: string;
}

const ShowProducts: React.FC<IShowProducts> = ({
  isLoading,
  pageNumber = 1,
  allProducts,
  handlePage,
  filters = {},
  sortOrder = 'asc',
}) => {
  const { products = [] } = allProducts || {};

  const validFilters = filters && typeof filters === 'object' ? filters : {};
  const validSortOrder = sortOrder === 'asc' || sortOrder === 'desc' ? sortOrder : 'asc';

  const filteredAndSortedProducts = useMemo(() => {
    const filteredProducts = products.filter((product: any) => {
      const price = product.price || 0;
      const rating = product.rating || 0;

      const isWithinPriceRange =
        !validFilters.price || (price >= validFilters.price[0] && price <= validFilters.price[1]);
      const isWithinRatingRange = !validFilters.rating || rating >= validFilters.rating;

      return isWithinPriceRange && isWithinRatingRange;
    });

    // Apply sorting
    return [...filteredProducts].sort((a: any, b: any) => {
      const priceA = a.price || 0;
      const priceB = b.price || 0;

      if (validSortOrder === 'asc') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  }, [products, validFilters, validSortOrder]);

  const productsPerPage = 6;
  const startIndex = (pageNumber - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  return (
    <>
      <div className="showProducts">
        {isLoading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="showProducts__items">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((item: any, indx: number) => <ProductCard key={indx} item={item} />)
            ) : (
              <div>No products match the current filters.</div>
            )}
          </div>
        )}
      </div>

      <div className="showPagination">
        {filteredAndSortedProducts.length > 0 && (
          <Pagination
            current={pageNumber}
            onChange={handlePage}
            total={filteredAndSortedProducts.length}
            pageSize={productsPerPage}
          />
        )}
      </div>
    </>
  );
};

export default ShowProducts;
