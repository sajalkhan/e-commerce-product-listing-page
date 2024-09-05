import React from 'react';
import { Drawer, Menu, Form, Slider, Button } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined } from '@ant-design/icons';

interface ISideNavProps {
  visible: boolean;
  onClose: () => void;
  onFilterChange: (filters: any) => void;
  onSortChange: (sortOrder: string) => void;
}

const SideNav: React.FC<ISideNavProps> = ({ visible, onClose, onFilterChange, onSortChange }) => {
  const [form] = Form.useForm();

  const handleFilterChange = (values: any) => {
    onFilterChange(values);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSortChange(e.target.value);
  };

  return (
    <Drawer title="Filter & Sort" placement="left" closable={true} onClose={onClose} open={visible} width={300}>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={handleFilterChange} // Call handleFilterChange on any value change
      >
        <Form.Item name="price" label="Price Range">
          <Slider
            range
            min={0}
            max={3000}
            defaultValue={[0, 500]}
            onChange={value => form.setFieldsValue({ price: value })}
          />
        </Form.Item>

        <Form.Item name="rating" label="Rating">
          <Slider
            min={0}
            max={5}
            defaultValue={0}
            marks={{ 0: '0', 5: '5' }}
            onChange={value => form.setFieldsValue({ rating: value })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Apply Filters
          </Button>
        </Form.Item>
      </Form>

      <Menu mode="inline" theme="light">
        <Menu.Item key="1" icon={<SortAscendingOutlined />}>
          <label>
            <input type="radio" name="sort" value="asc" onChange={handleSortChange} /> Sort by Price: Low to High
          </label>
        </Menu.Item>
        <Menu.Item key="2" icon={<SortDescendingOutlined />}>
          <label>
            <input type="radio" name="sort" value="desc" onChange={handleSortChange} /> Sort by Price: High to Low
          </label>
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default SideNav;
