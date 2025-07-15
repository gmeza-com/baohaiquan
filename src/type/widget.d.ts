export interface IWidget {
  id: number;
  name: string;
  slug: string;
  content: IWidgetContent;
  published: number;
  type: string;
}

export interface IWidgetContent {
  vi: string;
}
