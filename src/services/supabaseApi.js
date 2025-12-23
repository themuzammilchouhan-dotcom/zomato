import supabase from "../supabaseClient";

export const getRestaurants = async ({ search, city }) => {
  let query = supabase.from("restaurants").select("*");

  if (search) query = query.ilike("name", `%${search}%`);
  if (city) query = query.eq("city", city);

  return query;
};

export const getMenuByRestaurant = (restaurantId) =>
  supabase
    .from("menu_items")
    .select("*")
    .eq("restaurant_id", restaurantId);

export const createOrder = async (userId, total) => {
  return supabase
    .from("orders")
    .insert([{ user_id: userId, total_amount: total }])
    .select()
    .single();
};

export const addOrderItems = async (items) => {
  return supabase.from("order_items").insert(items);
};
