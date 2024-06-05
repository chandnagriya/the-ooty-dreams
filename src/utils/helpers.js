import {
  addDays,
  differenceInDays,
  endOfToday,
  format,
  formatDistance,
  parseISO,
} from "date-fns";
import {
  DASHBOARD_DAY_FILTERS,
  DASHBOARD_TIME_FILTER_VALUES,
} from "../features/dashboard/DASHBOARD_CONFIG";
import { BOOKING_STATUS_TAGS_DETAILED } from "../features/bookings/BOOKING_CONFIG";

function toLowerCaseFirst(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export function subtractDates(dateStr1, dateStr2) {
  return differenceInDays(
    parseISO(String(dateStr1)),
    parseISO(String(dateStr2))
  );
}

export function formatDistanceFromNow(dateStr) {
  return formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");
}

export function getToday(options = {}) {
  const today = new Date();

  if (options?.end) {
    today.setUTCHours(23, 59, 59, 999);
  } else {
    today.setUTCHours(0, 0, 0, 0);
  }

  return today.toISOString();
}

export function updateDatesToToday(startDateString, endDateString) {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const duration = endDate - startDate;

  const today = new Date();
  const updatedStartDate = new Date(today).toISOString();
  const updatedEndDate = new Date(today.getTime() + duration).toISOString();

  return [updatedStartDate, updatedEndDate];
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function convertToPropertyName(input) {
  return input
    .split(",")
    .map((str) => str.trim().replace(/[\s-]/g, "_").toUpperCase())
    .join(", ");
}

export function getSortByDetails(sortBy) {
  let [sortField, sortDirection] = sortBy.split("-");
  sortField = toLowerCaseFirst(sortField);

  return [sortField, sortDirection];
}

export function pluralize(name, count) {
  return count == 1 ? name : name + "s";
}

function hexToHSL(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255;
  let g = parseInt(hex.slice(3, 5), 16) / 255;
  let b = parseInt(hex.slice(5, 7), 16) / 255;

  let max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = 0;
    s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToHex(h, s, l) {
  let r, g, b;

  if (s == 0) {
    r = g = b = l;
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return (
    "#" +
    [r, g, b]
      .map((x) => {
        let hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
}

function interpolateColorHSL(color1, color2, factor) {
  let [h1, s1, l1] = hexToHSL(color1);
  let [h2, s2, l2] = hexToHSL(color2);

  let h = h1 + factor * (h2 - h1);
  let s = s1 + factor * (s2 - s1);
  let l = l1 + factor * (l2 - l1);

  return hslToHex(h, s, l);
}

export function generateAdditionalColors(colors, targetLength) {
  const additionalColors = [];
  const steps = targetLength - colors.length;

  for (let i = 0; i < steps; i++) {
    const factor = (i + 1) / (steps + 1);
    const color1 = colors[i % colors.length];
    const color2 = colors[(i + 1) % colors.length];
    additionalColors.push(interpolateColorHSL(color1, color2, factor));
  }

  return colors.concat(additionalColors).slice(0, targetLength);
}

export function addExtraDataForDashboardBookings(bookings, timeFilter) {
  for (const booking of bookings) {
    const { status, startDate, endDate, checkOutDate } = booking;

    const isDayFilter = DASHBOARD_DAY_FILTERS.includes(timeFilter);
    const yesterdayFilter =
      timeFilter === DASHBOARD_TIME_FILTER_VALUES.YESTERDAY.urlValue;
    const todayFilter =
      timeFilter === DASHBOARD_TIME_FILTER_VALUES.TODAY.urlValue;
    const tomorrowFilter =
      timeFilter === DASHBOARD_TIME_FILTER_VALUES.TOMORROW.urlValue;

    let checkOutDay, checkInDay, expectedToArriveToday;

    if (isDayFilter) {
      const day = todayFilter
        ? endOfToday().toISOString().split("T")[0]
        : addDays(endOfToday(), 1).toISOString().split("T")[0];
      ("");
      const today = endOfToday().toISOString().split("T")[0];

      checkOutDay = endDate === day;
      checkInDay = startDate === day;
      expectedToArriveToday = status === "unconfirmed" && today === startDate;
    }

    let tag = {};

    if (status === "checked-out") {
      tag.text = `${
        isDayFilter
          ? "Checked out"
          : "Checked out on " +
            format(new Date(checkOutDate), "EEE, MMM dd yyyy")
      }`;
      tag.color = "grey";

      if (todayFilter) {
        tag.status = BOOKING_STATUS_TAGS_DETAILED.CHECKED_OUT_TODAY;
      } else {
        tag.status = BOOKING_STATUS_TAGS_DETAILED.CHECKED_OUT;
      }
    } else if (status === "checked-in" || expectedToArriveToday) {
      tag.color = "green";

      if (yesterdayFilter) {
        tag.text = "Stayed";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.STAYED;
      } else if (
        (tomorrowFilter && !checkOutDay) ||
        (todayFilter && !checkInDay)
      ) {
        tag.text = "Staying";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.STAYING;
      } else if (todayFilter && checkInDay) {
        tag.text = "Arrived today";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.ARRIVED_TODAY;
      } else if ((todayFilter || tomorrowFilter) && checkOutDay) {
        tag.text = "Expected to depart";
        tag.color = "red";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.WILL_DEPART;
      } else {
        tag.text = `In the hotel till ${format(
          new Date(endDate),
          "EEE, MMM dd yyyy"
        )}`;
        tag.status = BOOKING_STATUS_TAGS_DETAILED.STAYING;
      }
    } else if (status === "unconfirmed") {
      tag.color = "blue";

      if (todayFilter) {
        tag.text = "Will arrive today";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.WILL_ARRIVE;
      } else if (tomorrowFilter) {
        tag.text = "Will be arriving";
        tag.status = BOOKING_STATUS_TAGS_DETAILED.WILL_BE_ARRIVING;
      } else {
        tag.text = `Will arrive on ${format(
          new Date(endDate),
          "EEE, MMM dd yyyy"
        )}`;
        tag.status = BOOKING_STATUS_TAGS_DETAILED.WILL_BE_ARRIVING;
      }
    }

    booking.tag = tag;
  }

  return bookings;
}

export function goBack() {
  () => {
    window.history.back();
    setTimeout(() => {
      window.location.reload();
    }, 1);
  };
}
