import { useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import ImageTool from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Paragraph from "@editorjs/paragraph";
import HeaderTool from "@editorjs/header";
import Underline from "@editorjs/underline";
import Delimiter from "@editorjs/delimiter";
// import { api, STRAPI_URL } from "constant";
// import { getToken } from "lib/auth/token";

const EDITOR_TOOLS = {
  header: {
    class: HeaderTool,
    config: {
      placeholder: "Tiêu đề",
      levels: [2, 3, 4],
      defaultLevel: 2,
    },
    inlineToolbar: true,
  },
  paragraph: { class: Paragraph, inlineToolbar: true },
  image: {
    class: ImageTool,
    // config: {
    //   field: "files",
    //   additionalRequestData: { middleware: "editorjs" },
    //   endpoints: { byFile: `${STRAPI_URL}api/${api.upload}` },
    //   additionalRequestHeaders: { Authorization: `Bearer ${getToken()}` },
    //   captionPlaceholder: "Nhập chú thích",
    // },
  },
  // link: LinkTool,
  list: List,
  quote: Quote,
  // checklist: { class: CheckList, inlineToolbar: true },
  delimiter: Delimiter,
  underline: Underline,
};

const i18n = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "Bấm để điều chỉnh",
          "or drag to move": "hoặc nắm kéo để di chuyển",
        },
      },
      inlineToolbar: {
        converter: {
          "Convert to": "Chuyển thành",
        },
      },
      toolbar: {
        toolbox: {
          Add: "Thêm",
        },
      },
    },
    toolNames: {
      Text: "Đoạn văn",
      Heading: "Tiêu đề đoạn",
      List: "Danh sách",
      // Checklist: "Danh mục kiểm tra",
      Quote: "Trích dẫn",
      Delimiter: "Dấu phân cách",
      Link: "Liên kết",
      Bold: "Đậm",
      Italic: "Nghiêng",
      Image: "Hình ảnh",
    },
    blockTunes: {
      delete: {
        Delete: "Xóa bỏ",
      },
      moveUp: {
        "Move up": "Di chuyển lên",
      },
      moveDown: {
        "Move down": "Di chuyển xuống",
      },
    },
  },
};

export default function Editor({
  data,
  onChange,
  holder,
  placeholder,
  autofocus,
  readOnly,
  editorRef,
}) {
  // initialize editorjs
  useEffect(() => {
    // initialize editor if we don't have a reference
    if (!editorRef.current || typeof data !== "undefined") {
      const editor = new EditorJS({
        holder,
        tools: EDITOR_TOOLS,
        readOnly,
        data,
        onChange,
        placeholder,
        autofocus,
        i18n,
      });

      editorRef.current = editor;
    }

    // add a return function handle cleanup
    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
      }
    };
  }, [data]);

  return <div id={holder} className="prose max-w-full"></div>;
}
