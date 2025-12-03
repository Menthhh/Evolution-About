import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface QuillEditorComponentProps {
  value: string;
  setContent: (content: string) => void;
}

const QuillEditorComponent: React.FC<QuillEditorComponentProps> = ({ value, setContent }) => {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
      value={value || ""}
      onEditorChange={(content) => setContent(content)}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
      }}
    />
  );
};

export default QuillEditorComponent;