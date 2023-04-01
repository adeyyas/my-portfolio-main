import { useEffect, useState } from 'react';
import { fetchPosts, removePost } from '@/services/post.service';
import AdminLayout from '@/layouts/admin';
import DataTable from '@/components/DataTable';
import { formatDate } from 'utils';
import { CDN_URL, POST_STATUSES, POST_TYPES, URL } from '../../../constants';
import Link from 'next/link';

const PostsIndex = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  const tableColumns = [
    {
      title: 'IMAGE',
      value: (row) => {
        return (
          <div className="image-preview">
            <i className="fal fa-image"></i>
            <img src={`${CDN_URL}/${row.image.filename}`} alt="" />
          </div>
        );
      },
    },
    {
      title: 'TITLE',
      value: (row) => (
        <>
          <a href={`${URL}/posts/${row.slug}`} target="_blank" rel="noreferrer">
            {row.title}
          </a>
        </>
      ),
    },
    {
      title: 'SUMMARY',
      value: (row) =>
        row.summary || (
          <p style={{ color: 'rgb(var(--danger))' }}>
            {'Senin seo açıklaman yok! Beni çıldırtmak mı istiyorsun?'}
          </p>
        ),
    },
    {
      title: 'CATEGORIEs',
      value: (row) => (
        <div className="tags">
          {row.categories.map((category, index) => (
            <div key={index} className="tag">
              {category.title}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'TYPE',
      value: (row) => POST_TYPES[row.type],
    },
   
    {
      title: 'AUTHOR',
      value: (row) => row.user.username,
    },
    {
      title: 'CREATED AT',
      value: (row) => formatDate(row.createdAt),
    },
    {
      title: 'UPDATED AT',
      value: (row) => formatDate(row.updatedAt),
    },
    {
      title: 'STATUS',
      value: (row) => POST_STATUSES[row.status],
    },
    {
      title: 'ACTIONS',
      value: (row) => (
        <div className="table-buttons">
          <button
            className="btn btn-table btn-remove"
            onClick={() => handleRemove(row)}
          >
            <i className="fal fa-trash-alt"></i>
          </button>

          <Link href={`/co/posts/edit/${row.slug}`}>
            <button className="btn btn-table">
              <i className="fal fa-pencil"></i>
            </button>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [err, result] = await fetchPosts();
      setLoading(false);

      // is err
      if (err) {
        return setPosts([]);
      }

      setPosts(result);
    })();
  }, []);

  const handleRemove = async (post) => {
    if (!confirm(`Bak siliyom, gidiyor ${post.title} içeriği`)) return;
    const [err, result] = await removePost(post.slug);
    if (err) return;
    setPosts((prevValue) => posts.filter((item) => item.id != post.id));
  };

  return (
    <>
      <div id="page-header">
        <div id="page-title">
          <h1>Posts</h1>
        </div>
        <div id="page-actions">
          <Link href="/co/posts/new">
            <button className="btn">New Post</button>
          </Link>
        </div>
      </div>

      <DataTable columns={tableColumns} data={posts} />
    </>
  );
};

PostsIndex.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default PostsIndex;
