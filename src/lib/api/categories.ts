import { IResponse } from "@/type/common";
import { rest } from "../rest";
import { CategoryTree } from "@/type/category";

export const getCategories = () => {
  return rest.get<IResponse<CategoryTree[]>>("/post-categories");
};
