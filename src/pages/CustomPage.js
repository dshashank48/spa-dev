import React from "react";
import Card from "../components/Card";
import "react-quill/dist/quill.snow.css";

const CustomPage = ({ data }) => {
  return (
    <Card title={data.attributes.title} className="overflow-y-auto">
      <div
        className="ql-editor ql-snow prose flex h-full max-w-none flex-col"
        dangerouslySetInnerHTML={{ __html: data.attributes.pageData.content }}
      />
    </Card>
  );
};

export default CustomPage;
