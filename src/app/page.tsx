/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, forwardRef, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

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
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen pb-20 ">
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
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
