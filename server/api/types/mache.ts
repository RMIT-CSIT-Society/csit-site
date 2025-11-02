type BlockTypes = "group" | "p" | "img" | "none";

interface Block {
  type: BlockTypes;
  id: string;
  classlist: Array<string>;
  grid: boolean;
  children: Array<Block>;

  // p:
  typescale?: string;
  html?: string;

  // img:
  alt?: string;
  src?: string;
}

interface ParsedStyle {
  [key: string]: {
    [innerKey: string]: string;
  };
}

export interface PostSummary {
  _id: string | null;
  slug: string | null;
  isDraft?: boolean | null;
  title: string | null;
  startDate?: Date | null;
  finishDate: Date | null;
  category?: string | null;
  alt?: string | null;
  columns?: number | null;
  img?: string | null;
  tags?: string[];
  client?: string | null;
  client_field?: string | null;
  outboundLink?: {
    label: string;
    url: string;
  };
  rolloverImg?: string;
  showTime?: boolean;
  location?: string;
}

export interface Post extends PostSummary {
  callout: string | null;
  desc: string | null;
  design_context: string | null;
  oneByOne: boolean | null;
  headerMedia: {
    type: "thumbnail" | "vimeo" | "youtube";
    url: string | null;
  };
  exported: string[];
  supplied: string[];
  body: null | {
    type: string;
    id: string;
    children: Array<Block>;
  };
  style: null | ParsedStyle;
  maxBlockIndex: {
    el: number;
    group: number;
  };
}

export type SortingFunction<T> = (a: T, b: T) => number;

export interface SocialLink {
  icon_name: string;
  url: string;
}
