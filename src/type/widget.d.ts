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

export interface ILinkedWebsite {
  language: ILinkedWebsiteLanguage;
  position: string;
  url: string;
  target: string;
  active: string;
}

export interface ILinkedWebsiteLanguage {
  [key: string]: ILanguageContent;
}

export interface ILanguageContent {
  image: string;
}
