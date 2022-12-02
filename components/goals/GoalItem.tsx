import React, { FC } from 'react'
import { Goal } from '@prisma/client'
import { Card, CardContent, Typography, CardActions, Button, Grid } from '@mui/material'

interface GoalItemProps {
  goal: Goal
  onDelete: (goalId: number) => Promise<void>
}

const GoalItem: FC<GoalItemProps> = ({ goal, onDelete }) => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            {goal.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {goal.priority}
          </Typography>
          <Typography variant="body2">{goal.description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="error" onClick={() => onDelete(goal.id)}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default GoalItem
