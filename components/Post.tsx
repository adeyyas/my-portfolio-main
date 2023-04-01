import classNames from 'classnames';
import Link from 'next/link';
import { CDN_URL } from '../constants';
import { formatDate } from '../utils';

const CategoryItem = ({ category }) => {
  return (
    <div className="category" style={{ backgroundColor: category.color }}>
      {' '}
      {category.title}
    </div>
  );
};

const Post = ({ post }) => {
  return (
    <div className={classNames({ post: true, [`post--${post.type}`]: true })}>
      <Link href={`/posts/${post.slug}`} className="post-image">
        <img src={`${CDN_URL}/${post.image.filename}`} alt={post.title} />
      </Link>

      <div className="post-detail">
        <time className="post-time">{formatDate(post.updatedAt)}</time>
        <Link className="post-title" href={`/posts/${post.slug}`}>
          <h2>{post.title}</h2>
        </Link>
        <div className="post-summary">{post.summary}</div>
        <div className="post-categories">
          {post.categories.map((category) => (
            <CategoryItem key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
