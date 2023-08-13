const getImageName = (image = null) => {
  let img = "";
  if (!image) {
    return img;
  }

  img =
    "blog-auth-images/" +
    image?.split("blog-auth-images/")[1]?.replace(/.png|.jpeg|.jpg|.gif/g, "");

  return img;
};

export default getImageName;
