import React, { useState } from 'react';
import { Button } from 'antd';
import TypeWriter from '@/components/atoms/typeWriter';
import { MenuOutlined } from '@ant-design/icons';
import ShowProducts from '@/components/organisms/showProducts';
import { useGetProducts } from '@/services/useGetProducts';
import SideNav from '@/components/molecules/sideNav';

const Home: React.FC = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>({});
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const { data: products, isLoading } = useGetProducts();

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const handleFilterChange = (filters: any) => {
    setFilters(filters);
  };

  const handleSortChange = (sortOrder: string) => {
    setSortOrder(sortOrder);
  };

  return (
    <div className="p-home">
      <Button
        type="primary"
        icon={<MenuOutlined />}
        onClick={toggleDrawer}
        style={{ position: 'absolute', top: 60, left: 10, zIndex: 1000 }}
      >
        Filters
      </Button>
      <SideNav
        visible={drawerVisible} // Control visibility
        onClose={() => setDrawerVisible(false)} // Close drawer
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />
      <div className="p-home__heading">
        <TypeWriter text={['Latest Products', 'New Arrivals', 'Best Sellers']} />
      </div>
      <div className="p-home__products">
        <ShowProducts
          isLoading={isLoading}
          allProducts={products}
          pageNumber={pageNumber}
          filters={filters}
          sortOrder={sortOrder}
          handlePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
