export interface IMenuItem {
  id: number;
  attributes: Attributes;
  position: number;
  level: number;
  parent_id: number;
  name: string;
  childrens?: IMenuItem[];
}

export interface Attributes {
  url: string;
  id: null;
  class: null;
  rel: string;
  icon: null;
  target: string;
  permission: string;
  category_id: number;
  category_slug: string;
  category_type?: string;
}
