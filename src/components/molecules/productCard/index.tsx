import React from 'react';
import { Card } from 'antd';
import ShowAverage from '@/components/atoms/averageRating';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCartStore } from '@/store/useCartStore';

type item = {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
};

interface IProductCard {
  item: item;
}

const ProductCard: React.FC<IProductCard> = ({ item }) => {
  const { title, description, images, price } = item;
  const { addProduct } = useCartStore();

  const handleAddToCart = () => {
    addProduct({ ...item, quantity: 1 });
  };

  const actions = [
    <div key="shopping" className="m-productCard__shopping" onClick={handleAddToCart}>
      <ShoppingCartOutlined />
      <p>Add To Cart</p>
    </div>,
  ];

  return (
    <div className="m-productCard">
      <ShowAverage product={item} size="small" />
      <Card
        cover={<img src={images[0]} alt={title} draggable={false} />}
        className="m-productCard__item"
        actions={actions}
      >
        <Card.Meta
          title={title}
          description={description && description.length > 40 ? `${description.substring(0, 40)}...` : description}
        />
        <p className="m-productCard__price">${price.toFixed(2)}</p>
      </Card>
    </div>
  );
};

export default ProductCard;
