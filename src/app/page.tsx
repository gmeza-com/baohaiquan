"use client";

import { forwardRef, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@/components/Editor"), {
  ssr: false,
});

const ForwardRefEditor = forwardRef((props: any, ref) => (
  <Editor
    {...props}
    data={props.data}
    onChange={props.onChange}
    holder={props.holder}
    placeholder={props.placeholder}
    autofocus={props.autofocus}
    readOnly={props.readOnly}
    editorRef={ref}
  />
));

ForwardRefEditor.displayName = "ForwardRefEditor";

export default function Home() {
  const editorjs = useRef(null);
  const [data, setData] = useState();

  const onEditorChange = () => {
    console.log("he");
  };

  return (
    <div className="min-h-screen">
      <div className="container">
        <main className="w-full gap-[32px] row-start-2">
          <ForwardRefEditor
            ref={editorjs}
            data={data}
            holder="editorjs-container"
            autofocus={false}
            placeholder={"Nhập nội dung bài viết..."}
            onChange={onEditorChange}
          />
        </main>
      </div>
      <footer className="row-start-3 bg-yellow-200 flex gap-[24px] flex-wrap items-center justify-center">
        hehe
      </footer>
    </div>
  );
}
