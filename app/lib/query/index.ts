export const GET_POSTS = `
*[_type == "post"] {
  _id,
  title,
  "slug": slug.current,
  description,
  mainImage,
  author -> {
    name,
    image,
    bio,
  }
}
`

export const GET_POSTS_PATHS = `
*[_type == "post"][0...10] {
  "slug": slug.current,
}
`

export const GET_POST = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  description,
  mainImage,
  "slug": slug.current,
  body,
  author -> {
    name,
    image,
  },
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ] {
    _createdAt,
    _id,
    comment,
    name,
    email,
  }
}
`
