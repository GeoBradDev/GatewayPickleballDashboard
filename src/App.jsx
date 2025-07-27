import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, ToggleButton, ToggleButtonGroup, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

const API_URL = import.meta.env.VITE_SUPABASE_URL + '/rest/v1';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
};

export default function PickleballDashboard() {
    const [players, setPlayers] = useState([]);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/weekly_rankings?select=player_id,rank,elo,wins,losses,players(name,female)&week=eq.0&order=rank.asc`,
                    { headers }
                );
                const data = await response.json();
                const filtered = filter === 'female' ? data.filter(p => p.players.female) : data;
                setPlayers(filtered);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filter]);

    const handleFilterChange = (_, newFilter) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    const podium = players.slice(0, 3);
    const leaderboard = players.slice(3);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>Pickleball League Dashboard</Typography>

            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={handleFilterChange}
                sx={{ mb: 4 }}
            >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="female">Female Only</ToggleButton>
            </ToggleButtonGroup>

            <Grid container spacing={2} sx={{ mb: 4 }}>
                {podium.map((player, i) => (
                    <Grid item xs={12} md={4} key={player.player_id}>
                        <Card elevation={4}>
                            <CardContent>
                                <Typography variant="h6">🥇🥈🥉"["🥇", "🥈", "🥉"][i]"</Typography>
                                <Typography variant="h5">{player.players.name}</Typography>
                                <Typography>Elo: {player.elo}</Typography>
                                <Typography>W: {player.wins} / L: {player.losses}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper elevation={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Rank</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Elo</TableCell>
                            <TableCell>Wins</TableCell>
                            <TableCell>Losses</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboard.map(player => (
                            <TableRow key={player.player_id}>
                                <TableCell>{player.rank}</TableCell>
                                <TableCell>{player.players.name}</TableCell>
                                <TableCell>{player.elo}</TableCell>
                                <TableCell>{player.wins}</TableCell>
                                <TableCell>{player.losses}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}