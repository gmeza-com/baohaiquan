import db from "@/lib/db";

const OptionService = {
  increaseSiteView: async (): Promise<void> => {
    try {
      await db("options").where("name", "site_view").increment("value", 1);
    } catch (error) {
      console.error(error);
    }
  },
};

export default OptionService;
