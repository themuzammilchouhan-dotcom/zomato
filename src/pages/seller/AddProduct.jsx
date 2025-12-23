const addProduct = async () => {
  await supabase.from("products").insert({
    restaurant_id,
    name,
    price,
  });
};
