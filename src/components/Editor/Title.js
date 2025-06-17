import { useEffect, useRef } from "react";

export default function Title({ isLogedIn, onChange, value }) {
  const title = useRef();
  const onTitleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    title?.current.focus();
  }, [title]);

  return (
    <h1
      contentEditable={isLogedIn ? "plaintext-only" : "false"}
      onKeyDown={onTitleEnter}
      onBlur={(e) => onChange(e.currentTarget.textContent)}
      placeholder="Tiêu đề bài viết"
      autoFocus={true}
      ref={title}
      suppressContentEditableWarning={true}
      className="content-editable block w-full mb-6 border-0 outline-none text-4xl font-semibold overflow-hidden"
    >
      {value}
    </h1>
  );
}
