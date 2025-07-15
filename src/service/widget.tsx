import db from "@/lib/db";
import { IWidget } from "@/type/widget";
import { unserialize } from "php-serialize";

const WidgetService = {
  getServiceBySlug: async (slug: string): Promise<IWidget> => {
    const res = await db("widgets as w")
      .select("w.id", "w.name", "w.slug", "w.content", "w.published", "w.type")
      .where("w.slug", slug)
      .where("w.published", 1)
      .first();

    if (!res) {
      throw new Error("Widget not found");
    }

    return { ...res, content: unserialize(res.content) };
  },

  getPublishedWidget: async (): Promise<Pick<IWidget, "id" | "slug">[]> => {
    const res = await db("widgets as w")
      .select("w.id", "w.slug")
      .where("w.published", 1);

    return res;
  },
};

export default WidgetService;
