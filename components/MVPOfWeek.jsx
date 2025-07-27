import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export default function MVPOfWeek({ mvpPlayer }) {
    if (!mvpPlayer) {
        return (
            <Card
                sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                    border: '1px solid rgba(0, 217, 255, 0.3)',
                    borderRadius: 4,
                    backdropFilter: 'blur(20px)',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h6" color="text.secondary">
                        No MVP data available
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card
            sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)',
                border: '2px solid rgba(255, 215, 0, 0.4)',
                borderRadius: 4,
                backdropFilter: 'blur(20px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #ffd700 0%, #ff6b35 100%)',
                },
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3)',
                    border: '2px solid rgba(255, 215, 0, 0.6)',
                },
            }}
        >
            <CardContent sx={{ p: 4, textAlign: 'center', position: 'relative' }}>
                {/* MVP Crown Icon */}
                <Box sx={{ mb: 3, position: 'relative' }}>
                    <EmojiEventsIcon 
                        sx={{ 
                            fontSize: '4rem', 
                            color: '#ffd700',
                            filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                            animation: 'pulse 2s infinite',
                            '@keyframes pulse': {
                                '0%': {
                                    transform: 'scale(1)',
                                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                                },
                                '50%': {
                                    transform: 'scale(1.05)',
                                    filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.8))',
                                },
                                '100%': {
                                    transform: 'scale(1)',
                                    filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))',
                                },
                            },
                        }} 
                    />
                </Box>

                {/* MVP Title */}
                <Typography 
                    variant="overline" 
                    sx={{ 
                        fontWeight: 800,
                        letterSpacing: '2px',
                        fontSize: '0.8rem',
                        color: '#ffd700',
                        mb: 2,
                        display: 'block'
                    }}
                >
                    MVP OF THE WEEK
                </Typography>

                {/* Player Avatar */}
                <Avatar
                    sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #ffd700 0%, #ff6b35 100%)',
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#000',
                        border: '3px solid rgba(255, 215, 0, 0.3)',
                    }}
                >
                    {mvpPlayer.players?.name?.charAt(0)?.toUpperCase() || '?'}
                </Avatar>

                {/* Player Name */}
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: 700,
                        color: 'text.primary',
                        mb: 2,
                        fontSize: '1.5rem'
                    }}
                >
                    {mvpPlayer.players?.name || 'Unknown Player'}
                </Typography>

                {/* Elo Increase */}
                <Box 
                    sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        gap: 1,
                        mb: 2
                    }}
                >
                    <TrendingUpIcon sx={{ color: '#00ff88', fontSize: '1.5rem' }} />
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontWeight: 800,
                            background: 'linear-gradient(135deg, #00ff88 0%, #00d9ff 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        +{mvpPlayer.eloIncrease}
                    </Typography>
                </Box>

                {/* Current Stats */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-around',
                    pt: 2,
                    borderTop: '1px solid rgba(255, 215, 0, 0.2)'
                }}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Current Elo
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                            {mvpPlayer.elo}
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Rank
                        </Typography>
                        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 700 }}>
                            #{mvpPlayer.rank}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}