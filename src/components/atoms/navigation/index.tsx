import React from 'react';
// import { NavigationItems } from '@/constant/nav-menu';
import { Menu, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCartStore } from '@/store/useCartStore';
import { useSelectedTab } from '@/hooks/useSelectedTab';

type NavigationProps = {
  onClick?: (e: { key: React.Key }) => void;
};

const Navigation: React.FC<NavigationProps> = ({ onClick }) => {
  const [currentTab, setCurrentTab] = useSelectedTab('/');
  const cartItemCount = useCartStore(state => state.count);

  const navigationItems = [
    {
      label: (
        <Badge count={cartItemCount}>
          <ShoppingCartOutlined />
        </Badge>
      ),
      key: '/cart',
    },
  ];

  const handleTab = (e: { key: React.Key }) => {
    (setCurrentTab as (newTab: string) => void)(e.key as string);
    onClick && onClick(e);
  };

  return (
    <Menu
      mode="horizontal"
      className="nav-menu"
      onClick={handleTab}
      items={navigationItems}
      selectedKeys={[currentTab as string]}
    />
  );
};

export default React.memo(Navigation);
