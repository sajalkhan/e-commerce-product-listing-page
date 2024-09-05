import React from 'react';
import { Rate } from 'antd';

interface ShowAverageProps {
  product: any;
  size?: 'small' | 'medium' | 'large';
  color?: 'orange' | 'gray' | 'red';
}

const ShowAverage: React.FC<ShowAverageProps> = ({ product, size = 'large', color = 'orangered' }) => {
  const { rating } = product || {};

  const getFontSize = () => {
    switch (size) {
      case 'small':
        return '18px';
      case 'medium':
        return '25px';
      case 'large':
        return '40px';
      default:
        return '25px'; // Default to medium size
    }
  };

  return (
    <div className="a-averageRating">
      {rating ? (
        <>
          <Rate disabled allowHalf value={rating} style={{ fontSize: getFontSize(), color: color }} />
          <span style={{ marginLeft: '5px' }}>{`(${rating})`}</span>
        </>
      ) : (
        'No rating yet'
      )}
    </div>
  );
};

export default ShowAverage;
