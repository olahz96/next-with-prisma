import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../config/prismaClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const goals = await prisma.goal.findMany()

  res.status(200).json(goals)
}
