import { useEffect, useState } from 'react';
import { fetchCategories, removeCategory } from '@/services/category.service';
import AdminLayout from '@/layouts/admin';
import DataTable from '@/components/DataTable';
import { formatDate } from 'utils';
import PageHeader from '@/components/PageHeader';
import Link from 'next/link';

const CategoriesIndex = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const tableColumns = [
    {
      title: 'TITLE',
      value: (row) => row.title,
    },
    {
      title: 'COLOR',
      value: (row) =>
        row.color ? <p style={{ color: row.color }}>{row.color}</p> : '-',
    },
    {
      title: 'CONTENT',
      value: (row) => row.content || '-',
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
      title: 'ACTIONS',
      value: (row) => (
        <div className="table-buttons">
          <button
            className="btn btn-table btn-remove"
            onClick={() => handleRemove(row)}
          >
            <i className="fal fa-trash-alt"></i>
          </button>

          <Link href={`/co/categories/edit/${row.id}`}>
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
      const [err, result] = await fetchCategories();
      setLoading(false);

      // is err
      if (err) {
        return setCategories([]);
      }

      setCategories(result);
    })();
  }, []);

  const handleRemove = async (category) => {
    if (!confirm(`Bak siliyom, gidiyor ${category.title} kategorisi`)) return;

    const [err, result] = await removeCategory(category.id);

    if (err) return;

    setCategories((prevValue) =>
      categories.filter((item) => item.id != category.id)
    );
  };

  return (
    <>
      <PageHeader title="Categories">
        <Link href="/co/categories/new">
          <button className="btn">New Category</button>
        </Link>
      </PageHeader>

      <DataTable columns={tableColumns} data={categories} />
    </>
  );
};

CategoriesIndex.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default CategoriesIndex;
