import { IRouteComponentProps } from 'umi';
import { Layout } from 'antd';
import PageHeader from '@/components/PageHeader';

export default function DeaultLayout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  if (location.pathname === '/user/login') {
    return children;
  }
  return (
    <Layout>
      <PageHeader />
      {children}
    </Layout>
  );
}
