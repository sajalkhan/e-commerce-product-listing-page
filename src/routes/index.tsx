import { Flex, Spin } from 'antd';
import { Suspense, lazy } from 'react';
import { ROUTES } from '@/routes/constant';
import { Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));

export const AppRouter = () => (
  <Suspense
    fallback={
      <Flex align="middle" justify="center" style={{ minHeight: '100vh' }}>
        <Spin size="large" />
      </Flex>
    }
  >
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
    </Routes>
  </Suspense>
);
