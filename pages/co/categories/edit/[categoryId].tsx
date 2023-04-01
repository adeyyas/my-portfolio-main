import AdminLayout from '@/layouts/admin';
import PageHeader from '@/components/PageHeader';
import Alert from '@/components/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { fetchCategory, updateCategory } from '@/services/category.service';
import { useRouter } from 'next/router';

const EditCategoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      color: '',
      content: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      color: Yup.string(),
      content: Yup.string().required().min(150),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err, result] = await updateCategory(
        router.query.categoryId,
        values
      );
      setLoading(false);

      // is error
      if (err) {
        return setErrors((prevValues) => {
          return err.response.data.message;
        });
      }

      router.push('/co/categories');
    },
  });

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [err, result] = await fetchCategory(router.query.categoryId);
      setLoading(false);

      // is error
      if (err) {
        return setErrors((prevValues) => {
          return err.response.data.message;
        });
      }

      formik.setValues(result);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.categoryId]);

  return (
    <div className="wrapper">
      <PageHeader title="EDIT CATEGORY" children={''} />

      {errors.map((error, index) => (
        <Alert key={index} color="danger" text={error} />
      ))}

      <form onSubmit={formik.handleSubmit}>
        <div className="group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title ? (
            <span className="form-error">{formik.errors.title}</span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <input
            type="text"
            name="color"
            placeholder="Color"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
          />
          {formik.touched.color && formik.errors.color ? (
            <span className="form-error">{formik.errors.color}</span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <textarea
            name="content"
            placeholder="Content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.content}
          />
          {formik.touched.content && formik.errors.content ? (
            <span className="form-error">{formik.errors.content}</span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <button className="btn" type="submit" disabled={loading}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

EditCategoryPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default EditCategoryPage;
