import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prismaClient'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, description, priority } = req.body
  const user = await prisma.user.findFirst()

  const result = await prisma.goal.create({
    data: {
      name,
      description,
      priority,
      user: { connect: { id: user?.id } }
    }
  })

  res.status(200).json({ data: result })
}

export default handler
