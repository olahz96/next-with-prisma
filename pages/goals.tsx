import React, { useCallback } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import type { Goal } from '@prisma/client'
import { Grid } from '@mui/material'

import LayoutBase from '../components/layout/LayoutBase'
import GoalItem from '../components/goals/GoalItem'
import { useRouter } from 'next/router'

interface GoalsProps {
  goals: Goal[]
}

const Goals: NextPage<GoalsProps> = ({ goals }) => {
  const router = useRouter()

  const handleDelete = useCallback(async (goalId: number) => {
    try {
      const res = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.ok) {
        router.replace(router.asPath)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <LayoutBase>
      <Grid container direction="column" spacing={2} sx={{ my: 4 }}>
        {goals.map((goal, index) => (
          <GoalItem goal={goal} key={index} onDelete={handleDelete} />
        ))}
      </Grid>
    </LayoutBase>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/goals`)
  const data = await response.json()

  return {
    props: {
      goals: data
    }
  }
}

export default Goals
