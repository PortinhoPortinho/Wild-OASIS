import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  // 2. upload image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(`${imageName}`, newCabin.image);

  // 3. Delete the cabin if was an error uploading image
  if (storageError) {
    await deleteCabin(data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created",
    );
  }

  return data;
}

export async function editCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replace("/", "");

  const hasImagePath = newCabin.image?.startsWith(supabaseUrl); // checks if add a new image crom the name

  const imagePath = hasImagePath
    ? newCabin.image // if use the one that allready have
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`; // if not add a new image

  const { data, error } = await supabase
    .from("cabins")
    .update({ ...newCabin, image: imagePath })
    .eq("id", newCabin.id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be created");
  }
  // 2. upload image only if a new is selected
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(`${imageName}`, newCabin.image);
    // 3. Delete the cabin if was an error uploading image
    if (storageError) {
      await deleteCabin(data.id);
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created",
      );
    }
  }

  return data;
}
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
