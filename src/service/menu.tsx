import db from "@/lib/db";
import { isOn } from "@/lib/utils";
import { IMenuItem } from "@/type/menu";

const MenuService = {
  getMenuItems: async (): Promise<IMenuItem[]> => {
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

          // Lấy galleryCatId nếu url có dạng /gallery/collections?id=1
          const galleryCatId = el.attributes.url.match(
            /\/gallery\/collections\?id=(\d+)/
          )
            ? parseInt(
                el.attributes.url.match(/\/gallery\/collections\?id=(\d+)/)[1]
              )
            : null;

          // bind category id to menu item
          if (catId) el.attributes.category_id = catId;
          if (galleryCatId) el.attributes.category_id = galleryCatId;

          return catId;
        });

        // remove null values from catIds
        catIds = catIds.filter((el) => el !== null);

        // select category to binding with menu items
        const cats = await db("post_category_languages as pcl")
          .join("post_categories as pc", "pc.id", "pcl.post_category_id")
          .select("pcl.slug", "pcl.post_category_id as id")
          .whereIn("post_category_id", catIds)
          .andWhere("pcl.locale", "vi")
          .andWhere("pc.published", 1);

        const galleryCats = await db("gallery_category_languages as gcl")
          .join("gallery_categories as gc", "gc.id", "gcl.gallery_category_id")
          .select("gcl.slug", "gcl.gallery_category_id as id")
          .whereIn("gallery_category_id", catIds)
          .andWhere("gcl.locale", "vi")
          .andWhere("gc.published", 1);

        const categories = [
          ...cats?.map((item) => ({ ...item, type: "post" })),
          ...galleryCats?.map((item) => ({ ...item, type: "gallery" })),
        ];

        // bind category slug to menu items
        records = records.map((el) => {
          const catId = el.attributes.category_id;
          const cat = categories.find((c) => c.id === catId);
          if (cat) {
            el.attributes.category_slug = cat.slug;
            el.attributes.category_type = cat.type;
          }
          return el;
        });

        // convert flat items to hierarchical structure
        items = records.filter(
          (el) =>
            (el.parent_id === null || el.parent_id === 0) &&
            isOn(el.attributes.category_slug)
        );

        items = items.map((item) => {
          const childrens = records.filter(
            (el) =>
              el.level == 1 &&
              el.parent_id === item.id &&
              isOn(item.attributes.category_slug)
          );
          return { ...item, childrens };
        });
      }

      return items;
    } catch (error) {
      console.log("getMenuItems:", error);
      return [];
    }
  },
};

export default MenuService;
