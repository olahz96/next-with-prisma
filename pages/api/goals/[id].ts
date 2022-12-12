import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../config/prismaClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const goalId = parseInt(req.query.id as string)

  if (req.method === 'GET') {
    const goal = await prisma.goal.findUnique({
      where: { id: goalId }
    })

    res.status(200).json(goal)
  } else if (req.method === 'PUT') {
    const { name, description, priority } = req.body
    const goal = await prisma.goal.update({
      where: { id: goalId },
      data: { name, description, priority }
    })

    res.status(200).json(goal)
  } else if (req.method === 'DELETE') {
    await prisma.goal.delete({
      where: { id: goalId }
    })

    res.status(200).json({ message: 'Goal was successfully deleted' })
  } else {
    res.status(404).json({ message: 'Not found' })
  }
}
