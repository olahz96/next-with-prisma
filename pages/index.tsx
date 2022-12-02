import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import type { Priority } from '@prisma/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { FormEvent, useCallback, useState } from 'react'
import LayoutBase from '../components/layout/LayoutBase'

const Home: NextPage = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [priority, setPriority] = useState<Priority>('LOW')
  const router = useRouter()

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        await fetch('/api/goals/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, description, priority })
        })
        router.push('/goals')
      } catch (e) {
        console.error(e)
      }
    },
    [name, description, priority]
  )

  return (
    <LayoutBase>
      <Card sx={{ maxWidth: 500, margin: '0 auto' }}>
        <CardContent>
          <Typography variant="h3" gutterBottom>
            Create a goal
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField variant="outlined" label="Name" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="description"
                  variant="outlined"
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="priority-select-label">Priority</InputLabel>
                  <Select labelId="priority-select-label" label="Priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                    <MenuItem value={'LOW'}>Low</MenuItem>
                    <MenuItem value={'MEDIUM'}>Medium</MenuItem>
                    <MenuItem value={'HIGH'}>High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit" fullWidth size="large">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </LayoutBase>
  )
}

export default Home
