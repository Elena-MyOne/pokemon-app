import { Outlet } from 'react-router-dom';
import Header from './Header';

interface LayoutProps {
  handleSearch: (query: string) => Promise<void>;
}

export default function Layout({ handleSearch }: LayoutProps) {
  return (
    <>
      <Header handleSearch={handleSearch} />
      <main className="m-auto px-0 py-6 md:container">
        <Outlet />
      </main>
    </>
  );
}
