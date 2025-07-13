import dayjs from "dayjs";
import vi from "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(vi);

dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

export default dayjs;
