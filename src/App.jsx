import React, {useEffect, useState} from 'react';
import {
    Container, Typography, Grid, Card, CardContent, ToggleButton, ToggleButtonGroup,
    Table, TableHead, TableRow, TableCell, TableBody, Paper, Select, MenuItem, FormControl, InputLabel, Box
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import FemaleIcon from '@mui/icons-material/Female';

const API_URL = import.meta.env.VITE_SUPABASE_URL + '/rest/v1';
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {apikey: API_KEY, Authorization: `Bearer ${API_KEY}`,};


export default function PickleballDashboard() {
    const [players, setPlayers] = useState([]);
    const [filter, setFilter] = useState('all');
    const [week, setWeek] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${API_URL}/weekly_rankings?select=player_id,rank,elo,wins,losses,players(name,female)&week=eq.${week}&order=rank.asc`,
                    {headers}
                );
                const data = await response.json();
                const filtered = filter === 'female' ? data.filter(p => p.players.female) : data;
                setPlayers(filtered);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filter, week]);

    const handleFilterChange = (_, newFilter) => {
        if (newFilter !== null) {
            setFilter(newFilter);
        }
    };

    const handleWeekChange = (event) => {
        setWeek(event.target.value);
    };

    const podium = players.slice(0, 3);
    const leaderboard = players.slice(3);

    return (
        <Container sx={{py: 4}}>
            <Box sx={{mb: 4, textAlign: 'center'}}>
                <Typography variant="h3" gutterBottom>🏓 Gateway Smash Leaderboard</Typography>
                <Typography variant="h6" gutterBottom>Week {week}</Typography>

                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap'}}>
                    <FormControl sx={{minWidth: 120}}>
                        <InputLabel>Week</InputLabel>
                        <Select value={week} label="Week" onChange={handleWeekChange}>
                            {[...Array(9).keys()].map(w => (
                                <MenuItem key={w} value={w}>Week {w}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup
                        value={filter}
                        exclusive
                        onChange={handleFilterChange}
                        size="small"
                    >
                        <ToggleButton value="all" aria-label="all players">
                            <PeopleIcon sx={{mr: 1}}/> All
                        </ToggleButton>
                        <ToggleButton value="female" aria-label="female only">
                            <FemaleIcon sx={{mr: 1}}/> Female
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            <Grid container spacing={2} sx={{mb: 4}}>
                {podium.map((player, i) => (
                    <Grid item xs={12} sm={4} key={player.player_id}>
                        <Card sx={{bgcolor: i === 0 ? 'gold' : i === 1 ? 'silver' : '#cd7f32', color: 'black'}}>
                            <CardContent sx={{textAlign: 'center'}}>
                                <Typography variant="h4">{["🥇", "🥈", "🥉"][i]}</Typography>
                                <Typography variant="h6">{player.players.name}</Typography>
                                <Typography variant="subtitle1">Elo: {player.elo}</Typography>
                                <Typography variant="caption">W {player.wins} / L {player.losses}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper elevation={3}>
                <Table size="small">
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
