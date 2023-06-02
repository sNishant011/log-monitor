import weekday from "dayjs/plugin/weekday";
import localeData from "dayjs/plugin/localeData";
import customParser from "dayjs/plugin/customParseFormat";

import dayjs from "dayjs";

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParser);

export default dayjs;
