import type { MenuProps } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

export const NavigationItems: MenuProps['items'] = [
  {
    label: 'Cart',
    key: '/key',
    icon: <ShoppingCartOutlined rev={undefined} />,
  },
];
