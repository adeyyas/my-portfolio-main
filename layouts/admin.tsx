import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { URL } from '../constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchMe } from '@/services/auth.service';
import { setUser, setLogin } from '../reducers/main.reducer';
import { useDispatch } from 'react-redux';

const ADMIN_PAGES = [
  { title: 'Posts', path: '/co/posts', disabled: false },
  { title: 'Categories', path: '/co/categories', disabled: false },
  {
    title: 'Gör',
    path: `${URL}`,
    newTab: true,
    disabled: false,
  },
];

const AdminLayout = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const { token } = localStorage;

    if (!token && router.pathname != '/co/login') {
      router.push('/co/login');
      return;
    }

    (async () => {
      const [err, response] = await fetchMe();

      if (err) {
        router.push('/co/login');
        localStorage.removeItem('token');
        return;
      }

      const { user } = response;

      dispatch(setLogin(true));
      dispatch(setUser(user));
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        ''
      ) : (
        <>
          <Header pages={ADMIN_PAGES} />
          <div id="admin-content">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
};

export default AdminLayout;
