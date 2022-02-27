export const GET_POSTS = `
*[
  _type == "post"
]{
  _id,
  title,
  slug,
  description,
  mainImage,
  author -> {
    name,
    image
  }
}
`
