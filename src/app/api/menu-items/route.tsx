import db from "@/lib/db";
import { isOn } from "@/lib/utils";

export async function GET() {
  try {
    // response items
    let items: any[] = [];

    // query db to get all the menu-items
    let records: any[] = await db("menu_items as mi")
      .join("menu_item_languages as mil", "mil.menu_item_id", "mi.id")
      .select(
        "mi.id",
        "mi.attributes",
        "mi.position",
        "mi.level",
        "mi.parent_id",
        "mil.name"
      )
      .where("mi.menu_id", 2)
      .andWhere("mi.active", 1)
      .andWhere("mil.locale", "vi")
      .orderBy("mi.position", "asc");

    if (isOn(records)) {
      // parse attributes from string to object
      records = records.map((el) => ({
        ...el,
        attributes: JSON.parse(el.attributes),
      }));

      // extract category ids from attributes
      let catIds = records.map((el) => {
        const catId = el.attributes.url.match(/danh-muc\?id=\d/)
          ? parseInt(el.attributes.url.split("=")[1])
          : null;

        // bind category id to menu item
        if (catId) el.attributes.category_id = catId;

        return catId;
      });

      // remove null values from catIds
      catIds = catIds.filter((el) => el !== null);

      // select category to binding with menu items
      const cats = await db("post_category_languages")
        .select("slug", "post_category_id as id")
        .whereIn("post_category_id", catIds);

      // bind category slug to menu items
      records = records.map((el) => {
        const catId = el.attributes.category_id;
        const cat = cats.find((c) => c.id === catId);
        if (cat) el.attributes.category_slug = cat.slug;
        return el;
      });

      // convert flat items to hierarchical structure
      items = records.filter(
        (el) => el.parent_id === null || el.parent_id === 0
      );

      items = items.map((item) => {
        const childrens = records.filter(
          (el) => el.level == 1 && el.parent_id === item.id
        );
        return { ...item, childrens };
      });
    }

    return Response.json({ data: items }, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}
