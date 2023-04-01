import AdminLayout from '@/layouts/admin';
import PageHeader from '@/components/PageHeader';
import Alert from '@/components/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { createPost } from '@/services/post.service';
import { useRouter } from 'next/router';
import { POST_TYPES, POST_STATUSES } from '../../../constants';
import { fetchCategories } from '@/services/category.service';
import 'react-markdown-editor-lite/lib/index.css';
import PreviewMarkdown from '@/components/PreviewMarkdown';
import Editor from 'react-markdown-editor-lite';
import Gallery from '@/components/Gallery';

const NewPostPage = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: '',
      summary: '',
      status: 'draft',
      type: 'article',
      videoId: '',
      categories: [],
      imageId: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required(),
      summary: Yup.string().required().min(150),
      status: Yup.string().required(),
      type: Yup.string().required(),
      videoId: Yup.string(),
      categories: Yup.array().of(Yup.number()),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const [err, result] = await createPost({
        ...values,
        content,
        categories: values.categories.map(Number),
      });
      setLoading(false);

      // is error
      if (err) {
        return setErrors((prevValues) => {
          return err.response.data.message;
        });
      }

      router.push('/co/posts');
    },
  });

  useEffect(() => {
    (async () => {
      const [err, result] = await fetchCategories();
      if (err) return;
      setCategories(result);
    })();
  }, []);

  const handleEditorChange = ({ html, text }) => {
    const newValue = text.replace(/\d/g, '');
    setContent(newValue);
  };

  const handleOnSelectGallery = (image) => {
    formik.setFieldValue('imageId', image.id);
  };

  return (
    <div className="wrapper">
      <PageHeader title="New Post" children={''} />

      {errors.map((error, index) => (
        <Alert key={index} color="danger" text={error} />
      ))}

      <form onSubmit={formik.handleSubmit}>
        <div className="group">
          <Gallery onSelect={(image) => handleOnSelectGallery(image)} />
        </div>

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
          <textarea
            name="summary"
            placeholder="Summary"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.summary}
          />
          {formik.touched.summary && formik.errors.summary ? (
            <span className="form-error">{formik.errors.summary}</span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <select
            name="type"
            placeholder="Type"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.type}
          >
            {Object.keys(POST_TYPES).map((key, index) => (
              <option key={index} value={key}>
                {POST_TYPES[key]}
              </option>
            ))}
          </select>
          {formik.touched.type && formik.errors.type ? (
            <span className="form-error">{formik.errors.type}</span>
          ) : (
            ''
          )}
        </div>

        {formik.values.type == 'video' && (
          <div className="group">
            <input
              type="text"
              name="videoId"
              placeholder="Video Id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.videoId}
            />
            {formik.touched.videoId && formik.errors.videoId ? (
              <span className="form-error">{formik.errors.videoId}</span>
            ) : (
              ''
            )}
          </div>
        )}

        <div className="group">
          <select
            name="status"
            placeholder="Status"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.status}
          >
            {Object.keys(POST_STATUSES).map((key, index) => (
              <option key={index} value={key}>
                {POST_STATUSES[key]}
              </option>
            ))}
          </select>
          {formik.touched.status && formik.errors.status ? (
            <span className="form-error">{formik.errors.status}</span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <select
            name="categories"
            placeholder="Categories"
            multiple
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categories}
          >
            {categories.map((category, index) => (
              <option key={index} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          {formik.errors.categories ? (
            <span className="form-error">
              {String(formik.errors.categories)}
            </span>
          ) : (
            ''
          )}
        </div>

        <div className="group">
          <Editor
            style={{ height: '500px' }}
            value={content}
            onChange={handleEditorChange}
            renderHTML={(text) => <PreviewMarkdown source={text} />}
          />
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

NewPostPage.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default NewPostPage;
