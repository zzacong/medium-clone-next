export const GET_POSTS = `
*[_type == "post"] {
  _id,
  title,
  slug,
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
*[_type == "post"] {
  slug {current}
}
`

export const GET_POST = `
*[_type == "post" && slug.current == $slug][0] {
  _id,
  _createdAt,
  title,
  description,
  mainImage,
  slug,
  body,
  author -> {
    name,
    image
  },
  'comments': *[
    _type == "comment" &&
    post._ref == ^._id &&
    approved == true
  ]
}
`
