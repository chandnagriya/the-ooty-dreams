import supabase from "./supabase";

import { getToday } from "../utils/helpers";
import { BOOKINGS_PAGINATION_RESULTS } from "../utils/constant";

export async function getBookings(filters = [], sort = {}, page = null) {
  let query = supabase
    .from("bookings")
    .select("*, cabins(name), guests!inner(*)", { count: "exact" });

  for (const filter of filters) {
    query = query[filter.dbMethod](filter.dbField, filter.dbValue, {
      filterSource: true,
    });
  }

  if (Object.keys(sort).length > 0) {
    query = query.order(sort.field, sort.direction);
  }

  if (page) {
    const from = (page - 1) * BOOKINGS_PAGINATION_RESULTS;
    const to = page * BOOKINGS_PAGINATION_RESULTS - 1;
    query = query.range(from, to);
  }

  let { data, error, count } = await query;

  if (!data && !count && error) {
    return { data, count };
  }

  if (error) {
    throw new Error("Bookings could not be loaded");
  }

  data = data.filter((booking) => booking.guests);

  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Booking not found");
  }

  return data;
}

export async function getBookingsWithinRange(timeFilterQuery) {
  let query = supabase.from("bookings").select("*, cabins(*), guests!inner(*)");

  if (timeFilterQuery) {
    query = query.or(`${timeFilterQuery}`);
  }

  query = query.order("startDate", {
    ascending: "asc",
  });

  const { data, error } = await query;

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error("Booking could not be updated");
  }

  return data;
}

export async function deleteBooking(id) {
  const { data, count, error } = await supabase
    .from("bookings")
    .delete({ count: "estimated" })
    .eq("id", id);

  if (error || count == 0) {
    throw new Error("Booking could not be deleted");
  }

  return data;
}
