import React, { useEffect, useState } from 'react';
import {Grid, CssBaseline, Container, Typography, Box, Paper, Switch, FormControlLabel} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StatCard from '../components/StatCard';
import EloChart from '../components/EloChart';
import Podium from '../components/Podium';
import MostImprovedChart from '../components/MostImprovedChart';
import WinLossPieCharts from '../components/WinLossChart';
import Leaderboard from '../components/Leaderboard';
import MVPOfWeek from '../components/MVPOfWeek';
import { supabase } from '../lib/supabaseClient';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#0a0a0f',
            paper: '#12121a',
        },
        primary: {
            main: '#00d9ff',
            light: '#33e0ff',
            dark: '#0099cc',
        },
        secondary: {
            main: '#ff6b35',
            light: '#ff8c5c',
            dark: '#cc4a1e',
        },
        success: {
            main: '#00ff88',
        },
        error: {
            main: '#ff4757',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
        grey: {
            800: '#1a1a24',
            900: '#0f0f15',
        },
    },
    typography: {
        fontFamily: '"Poppins", "Inter", "Roboto", sans-serif',
        h3: {
            fontWeight: 800,
            letterSpacing: '-0.03em',
            fontSize: '2.5rem',
        },
        h4: {
            fontWeight: 700,
            letterSpacing: '-0.02em',
            fontSize: '2rem',
        },
        h5: {
            fontWeight: 600,
            letterSpacing: '-0.01em',
            fontSize: '1.5rem',
        },
        h6: {
            fontWeight: 600,
            fontSize: '1.25rem',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        body2: {
            fontSize: '0.875rem',
            lineHeight: 1.5,
        },
    },
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    backgroundColor: '#12121a',
                    border: '1px solid rgba(0, 217, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 16,
                    background: 'linear-gradient(145deg, #12121a 0%, #1a1a2e 100%)',
                    border: '1px solid rgba(0, 217, 255, 0.15)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                },
            },
        },
    },
    shape: {
        borderRadius: 16,
    },
});

export default function Dashboard() {
    const [players, setPlayers] = useState([]);
    const [previousWeekPlayers, setPreviousWeekPlayers] = useState([]);
    const [week] = useState(0);
    const [femaleOnly, setFemaleOnly] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            // Fetch current week data
            const { data: currentData, error: currentError } = await supabase
                .from('weekly_rankings')
                .select('player_id, rank, elo, wins, losses, players(name, female)')
                .eq('week', week)
                .order('rank');

            if (!currentError) setPlayers(currentData);

            // Fetch previous week data for MVP calculation
            const { data: previousData, error: previousError } = await supabase
                .from('weekly_rankings')
                .select('player_id, rank, elo, wins, losses, players(name, female)')
                .eq('week', week - 1)
                .order('rank');

            if (!previousError) setPreviousWeekPlayers(previousData);
        };

        fetchData();
    }, [week]);

    // Calculate MVP (player with greatest Elo increase)
    const calculateMVP = () => {
        if (!players.length || !previousWeekPlayers.length) return null;

        let mvpPlayer = null;
        let maxIncrease = 0;

        players.forEach(currentPlayer => {
            const previousPlayer = previousWeekPlayers.find(
                prev => prev.player_id === currentPlayer.player_id
            );

            if (previousPlayer) {
                const eloIncrease = currentPlayer.elo - previousPlayer.elo;
                if (eloIncrease > maxIncrease) {
                    maxIncrease = eloIncrease;
                    mvpPlayer = {
                        ...currentPlayer,
                        eloIncrease: eloIncrease,
                        previousElo: previousPlayer.elo
                    };
                }
            }
        });

        return mvpPlayer;
    };

    // Filter players based on female toggle
    const filteredPlayers = femaleOnly 
        ? players.filter(player => player.players?.female === true)
        : players;
    
    const top10 = filteredPlayers.slice(0, 10);
    const podium = filteredPlayers.slice(0, 3);
    const mvpPlayer = calculateMVP();

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh', 
                width: '100vw',
                background: 'radial-gradient(ellipse at top, #0f1419 0%, #0a0a0f 50%, #000005 100%)',
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 20%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                    zIndex: -1,
                }
            }}>
                <Box sx={{
                    width: '100%',
                    maxWidth: '1400px',
                    px: { xs: 2, sm: 3, md: 4 }, 
                    py: { xs: 3, sm: 4, md: 6 },
                    position: 'relative',
                    zIndex: 1,
                }}>
                {/* Header */}
                <Box sx={{ 
                    mb: 6, 
                    py: 4,
                    px: 4,
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                    borderRadius: 4,
                    border: '1px solid rgba(0, 217, 255, 0.2)',
                    position: 'relative',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 800, 
                                background: 'linear-gradient(135deg, #00d9ff 0%, #ff6b35 100%)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 2,
                                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                                textShadow: '0 0 30px rgba(0, 217, 255, 0.3)',
                            }}
                        >
                            GATEWAY SMASH
                        </Typography>
                        <Typography 
                            variant="h6" 
                            color="text.secondary"
                            sx={{ 
                                fontWeight: 500,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                fontSize: { xs: '0.9rem', sm: '1rem' }
                            }}
                        >
                            St Louis Pickleball League Dashboard
                        </Typography>
                    </Box>
                    
                    {/* Female Filter Switch */}
                    <Box sx={{ 
                        position: 'absolute', 
                        top: 20, 
                        right: 20,
                        display: 'flex',
                        alignItems: 'center',
                        background: 'rgba(18, 18, 26, 0.8)',
                        borderRadius: 3,
                        p: 1.5,
                        border: '1px solid rgba(0, 217, 255, 0.3)',
                    }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={femaleOnly}
                                    onChange={(e) => setFemaleOnly(e.target.checked)}
                                    sx={{
                                        '& .MuiSwitch-switchBase.Mui-checked': {
                                            color: 'primary.main',
                                        },
                                        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                            backgroundColor: 'primary.main',
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography 
                                    variant="body2" 
                                    sx={{ 
                                        color: 'text.primary', 
                                        fontWeight: 600,
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    ♀ Female Only
                                </Typography>
                            }
                            sx={{ m: 0 }}
                        />
                    </Box>
                </Box>

                {/* Stat Cards */}
                <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '1200px' }}>
                        <Grid container spacing={{ xs: 2, sm: 3, md: 4 }} justifyContent="center">
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard title="Total Players" value={filteredPlayers.length} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard 
                                    title="Matches Played" 
                                    value={players.reduce((total, player) => total + (player.matchesPlayed || 0), 0) || 'N/A'} 
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard title="Top Elo" value={filteredPlayers[0]?.elo || 'N/A'} />
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <StatCard
                                    title={femaleOnly ? "Female Players" : "Female %"}
                                    value={femaleOnly 
                                        ? filteredPlayers.length
                                        : `${Math.round(players.filter(p => p.players?.female).length / players.length * 100) || 0}%`
                                    }
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* MVP, Podium, and Win/Loss Section */}
                <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
                        <Grid container spacing={{ xs: 3, sm: 4, md: 6 }} justifyContent="center" alignItems="stretch">
                            {/* MVP of the Week */}
                            <Grid item xs={12} lg={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box mb={3} sx={{ textAlign: 'center' }}>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            mb: 2, 
                                            color: 'text.primary',
                                            fontWeight: 700,
                                            fontSize: { xs: '1.5rem', md: '2rem' }
                                        }}
                                    >
                                        ⭐ Weekly MVP
                                    </Typography>
                                </Box>
                                <Box sx={{ flex: 1, display: 'flex' }}>
                                    <MVPOfWeek mvpPlayer={mvpPlayer} />
                                </Box>
                            </Grid>

                            {/* Podium */}
                            <Grid item xs={12} lg={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box mb={3} sx={{ textAlign: 'center' }}>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            mb: 2, 
                                            color: 'text.primary',
                                            fontWeight: 700,
                                            fontSize: { xs: '1.5rem', md: '2rem' }
                                        }}
                                    >
                                        🏆 Champions Podium
                                    </Typography>
                                </Box>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                        border: '1px solid rgba(0, 217, 255, 0.1)',
                                        backdropFilter: 'blur(20px)',
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <Podium players={podium} />
                                    </Box>
                                </Paper>
                            </Grid>

                            {/* Win/Loss Breakdown */}
                            <Grid item xs={12} lg={3} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Box mb={3} sx={{ textAlign: 'center' }}>
                                    <Typography 
                                        variant="h4" 
                                        sx={{ 
                                            mb: 2, 
                                            color: 'text.primary',
                                            fontWeight: 700,
                                            fontSize: { xs: '1.5rem', md: '2rem' }
                                        }}
                                    >
                                        Win/Loss Ratios
                                    </Typography>
                                </Box>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 4,
                                        background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                        border: '1px solid rgba(0, 217, 255, 0.1)',
                                        backdropFilter: 'blur(20px)',
                                        flex: 1,
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Box sx={{ width: '100%' }}>
                                        <WinLossPieCharts players={podium} />
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

                {/* Elo Over Time Chart - Full Width */}
                <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                mb: 3, 
                                color: 'text.primary',
                                fontWeight: 700,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: 1,
                                fontSize: { xs: '1.5rem', md: '2rem' }
                            }}
                        >
                            Elo Over Time
                        </Typography>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 4, 
                                borderRadius: 4, 
                                minHeight: 400,
                                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                border: '1px solid rgba(0, 217, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <EloChart week={week} />
                        </Paper>
                    </Box>
                </Box>

                {/* Rising Stars Chart - Full Width */}
                <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '1400px' }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                mb: 3, 
                                color: 'text.primary',
                                fontWeight: 700,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: 1,
                                fontSize: { xs: '1.5rem', md: '2rem' }
                            }}
                        >
                            Top 10 Improving Players
                        </Typography>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 4, 
                                borderRadius: 4, 
                                minHeight: 400,
                                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                border: '1px solid rgba(0, 217, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <MostImprovedChart week={week} />
                        </Paper>
                    </Box>
                </Box>

                {/* Leaderboard Section */}
                <Box mb={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{ width: '100%', maxWidth: '600px' }}>
                        <Typography 
                            variant="h4" 
                            sx={{ 
                                mb: 3, 
                                color: 'text.primary',
                                fontWeight: 700,
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center',
                                gap: 1,
                                fontSize: { xs: '1.5rem', md: '2rem' }
                            }}
                        >
                            Elite Rankings
                        </Typography>
                        <Paper 
                            elevation={0} 
                            sx={{ 
                                p: 4, 
                                borderRadius: 4, 
                                minHeight: 600,
                                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                border: '1px solid rgba(0, 217, 255, 0.1)',
                                backdropFilter: 'blur(20px)',
                            }}
                        >
                            <Leaderboard players={top10} />
                        </Paper>
                    </Box>
                </Box>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
