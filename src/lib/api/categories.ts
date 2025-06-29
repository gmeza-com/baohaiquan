import { IResponse } from "@/type/common";
import { rest } from "../rest";
import { CategoryTree, MostViewCategory } from "@/type/category";
import axios from "axios";

export const getCategories = () => {
  return rest.get<IResponse<CategoryTree[]>>("/post-categories");
};

export const getMostViewCategories = () => {
  return axios
    .get<IResponse<MostViewCategory[]>>("/api/post-categories/most-view")
    .then((res) => res?.data);
};
