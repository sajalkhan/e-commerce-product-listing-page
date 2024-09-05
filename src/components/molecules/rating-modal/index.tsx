import { Modal } from 'antd';
import React, { useState } from 'react';
import { StarOutlined } from '@ant-design/icons';

interface IRatingModal {
  user: any;
  children: React.ReactNode;
  handleSubmit: () => void;
}

const RatingModal: React.FC<IRatingModal> = ({ children, user, handleSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <div>
        <StarOutlined /> <br />
        {user.token ? 'Leave rating' : 'Login to leave rating'}
      </div>

      <Modal
        centered
        title="Leave your rating"
        open={modalVisible}
        onOk={() => {
          handleSubmit();
          setModalVisible(false);
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
