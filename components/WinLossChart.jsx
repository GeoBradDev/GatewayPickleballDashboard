import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#4caf50', '#f44336'];

export default function WinLossPieCharts({ players }) {
    return (
        <Grid container spacing={2} sx={{ mt: 4 }}>
            {players.map((player, i) => {
                const data = [
                    { name: 'Wins', value: player.wins },
                    { name: 'Losses', value: player.losses },
                ];
                return (
                    <Grid item xs={12} sm={4} key={player.player_id}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                🥇🥈🥉{['1st', '2nd', '3rd'][i]}: {player.players.name}
                            </Typography>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        label
                                    >
                                        {data.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </Paper>
                    </Grid>
                );
            })}
        </Grid>
    );
}
