import { useEffect } from 'react';
import * as showdown from 'showdown';

declare global {
  interface Window {
    hljs?: any;
  }
}

const PreviewMarkdown = ({ source }) => {
  const converter = new showdown.Converter();

  useEffect(() => {
    window.hljs?.configure({ ignoreUnescapedHTML: true });
    window.hljs?.highlightAll();
  });

  return (
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{
        __html: converter.makeHtml(source) || '',
      }}
    ></div>
  );
};

export default PreviewMarkdown;
