export interface LongformType {
  time: number;
  version: string;
  blocks: LongformBlock[];
}

export interface LongformBlock {
  id: string;
  type: string;
  data:
    | ParagraphBlock
    | ImageBlock
    | HeaderBlock
    | DelimiterBlock
    | ColumnsBlock;
}

export interface ParagraphBlock {
  text: string;
  alignment: "left" | "center" | "right" | "justify";
}

export type ImageBlockFile = {
  url: string;
};

export interface ImageBlock {
  caption: string;
  file: ImageBlockFile;
  stretched: boolean;
  className?: string;
}

export interface HeaderBlock {
  text: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  alignment: "left" | "center" | "right" | "justify";
}

export interface DelimiterBlock {
  style: "star" | "dash" | "line";
  lineWidth?: number; // available with line style; values: [8, 15, 25, 35, 50, 60, 100]
  lineThickness?: number; // available with line style; values: [1, 2, 3, 4, 5, 6]
}

export interface ColumnsBlock {
  cols: LongformType[];
}

export interface QuoteBlock {
  text: string;
  alignment: "left" | "center";
  caption: string;
}
