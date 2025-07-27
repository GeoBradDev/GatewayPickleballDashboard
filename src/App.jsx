import React, { useEffect, useState } from 'react';
import {Grid, CssBaseline, Container, Typography, Box, Paper, Switch, FormControlLabel} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import StatCard from '../components/StatCard';
import EloChart from '../components/EloChart';
import Podium from '../components/Podium';
import MostImprovedChart from '../components/MostImprovedChart';
import WinLossPieCharts from '../components/WinLossChart';
import Leaderboard from '../components/Leaderboard';
import { supabase } from './lib/supabaseClient';

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
    const [week] = useState(0);
    const [femaleOnly, setFemaleOnly] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const { data, error } = await supabase
                .from('weekly_rankings')
                .select('player_id, rank, elo, wins, losses, players(name, female)')
                .eq('week', week)
                .order('rank');

            if (!error) setPlayers(data);
        };

        fetchData();
    }, [week]);

    // Filter players based on female toggle
    const filteredPlayers = femaleOnly 
        ? players.filter(player => player.players?.female === true)
        : players;
    
    const top10 = filteredPlayers.slice(0, 10);
    const podium = filteredPlayers.slice(0, 3);

    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh', 
                width: '100vw',
                margin: 0,
                padding: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'radial-gradient(ellipse at top, #0f1419 0%, #0a0a0f 50%, #000005 100%)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'radial-gradient(circle at 20% 20%, rgba(0, 217, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                    pointerEvents: 'none',
                }
            }}>
                <Box sx={{
                    px: { xs: 3, sm: 4, md: 6 }, 
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
                            Pickleball League Dashboard
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
                <Grid container spacing={{ xs: 3, sm: 4 }} mb={8}>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Total Players" value={filteredPlayers.length} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <StatCard title="Matches Played" value="0" />
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

                {/* Podium */}
                <Box mb={8}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            mb: 4, 
                            color: 'text.primary',
                            fontWeight: 700,
                            textAlign: 'center',
                            '&::before': {
                                content: '"🏆"',
                                fontSize: '3rem',
                                display: 'block',
                                mb: 2,
                            }
                        }}
                    >
                        Champions Podium
                    </Typography>
                    <Paper 
                        elevation={0} 
                        sx={{ 
                            p: 4, 
                            borderRadius: 4,
                            background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                            border: '1px solid rgba(0, 217, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        <Podium players={podium} />
                    </Paper>
                </Box>

                {/* Main Content Grid */}
                <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
                    {/* Left Column */}
                    <Grid item xs={12} lg={8}>
                        {/* Elo Chart */}
                        <Box mb={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3, 
                                    color: 'text.primary',
                                    fontWeight: 700,
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    '&::before': {
                                        content: '"📈"',
                                        fontSize: '2rem',
                                    }
                                }}
                            >
                                Performance Analytics
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

                        {/* Most Improved */}
                        <Box mb={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3, 
                                    color: 'text.primary',
                                    fontWeight: 700,
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    '&::before': {
                                        content: '"📊"',
                                        fontSize: '2rem',
                                    }
                                }}
                            >
                                Rising Stars (Week {week})
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

                        {/* W/L Pie Charts */}
                        <Box mb={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3, 
                                    color: 'text.primary',
                                    fontWeight: 700,
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    '&::before': {
                                        content: '"🥧"',
                                        fontSize: '2rem',
                                    }
                                }}
                            >
                                Win/Loss Breakdown
                            </Typography>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: 4, 
                                    minHeight: 350,
                                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                    border: '1px solid rgba(0, 217, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <WinLossPieCharts players={podium} />
                            </Paper>
                        </Box>
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} lg={4}>
                        {/* Leaderboard */}
                        <Box mb={6}>
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    mb: 3, 
                                    color: 'text.primary',
                                    fontWeight: 700,
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    gap: 2,
                                    '&::before': {
                                        content: '"📋"',
                                        fontSize: '2rem',
                                    }
                                }}
                            >
                                Elite Rankings
                            </Typography>
                            <Paper 
                                elevation={0} 
                                sx={{ 
                                    p: 4, 
                                    borderRadius: 4, 
                                    minHeight: 700,
                                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.05) 0%, rgba(255, 107, 53, 0.02) 100%)',
                                    border: '1px solid rgba(0, 217, 255, 0.1)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <Leaderboard players={top10} />
                            </Paper>
                        </Box>
                    </Grid>
                </Grid>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
