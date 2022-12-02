import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../config/prismaClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const user = await prisma.user.findFirst()

    const result = await prisma.goal.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        priority: req.body.priority,
        user: { connect: { id: user?.id } }
      }
    })

    res.status(200).json({ data: result })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
