import db from "@/lib/db";

const OptionService = {
  increaseSiteView: async (): Promise<void> => {
    try {
      await db("options").where("name", "site_view").increment("value", 1);
    } catch (error) {
      console.error(error);
    }
  },

  getOptions: async (
    fields: string[] = []
  ): Promise<Record<string, string> | undefined> => {
    try {
      const res = await db("options")
        .select("name", "value")
        .modify((queryBuilder) => {
          if (fields.length > 0) {
            queryBuilder.whereIn("name", fields);
          }
        });

      return res?.reduce(
        (
          acc: Record<string, string>,
          curr: { name: string; value: string }
        ) => {
          acc[curr.name] = curr.value;
          return acc;
        },
        {}
      );
    } catch (error) {
      console.error(error);
      return undefined;
    }
  },
};

export default OptionService;
