import type { NextApiRequest, NextApiResponse } from 'next'
import { createClient } from 'next-sanity'
import { sanityConfig } from '$lib/config/sanity'

const sanityClient = createClient({
  ...sanityConfig,
  token: process.env.SANITY_API_TOKEN,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { _id, name, email, comment } = req.body

    try {
      await sanityClient.create({
        _type: 'comment',
        post: {
          _type: 'reference',
          _ref: _id,
        },
        name,
        email,
        comment,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Failed to create comment', error })
    }

    return res.status(201).json({ message: 'Comment submitted' })
  }

  return res.status(405).end()
}
