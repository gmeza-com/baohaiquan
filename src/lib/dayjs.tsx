import dayjs from "dayjs";
import vi from "dayjs/locale/vi";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale(vi);

dayjs.tz.setDefault("Asia/Ho_Chi_Minh");

// Override dayjs() để luôn trả về giờ Việt Nam
const originalDayjs = dayjs;
const vietnamDayjs = (...args: any[]) => {
  if (args.length === 0) {
    return originalDayjs().tz("Asia/Ho_Chi_Minh");
  }
  return originalDayjs(...args);
};

// Copy all properties from original dayjs
Object.setPrototypeOf(vietnamDayjs, originalDayjs);
Object.assign(vietnamDayjs, originalDayjs);

export default vietnamDayjs;
