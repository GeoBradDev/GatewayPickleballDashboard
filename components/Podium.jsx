import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

export default function Podium({ players }) {
    const colors = [
        { bg: 'linear-gradient(135deg, #ffd700 0%, #ffed4a 100%)', text: '#000' },
        { bg: 'linear-gradient(135deg, #c0c0c0 0%, #e5e7eb 100%)', text: '#000' },
        { bg: 'linear-gradient(135deg, #cd7f32 0%, #f59e0b 100%)', text: '#fff' }
    ];

    return (
        <Grid container spacing={2} sx={{ mb: 2, justifyContent: 'center' }}>
            {players.map((player, i) => (
                <Grid item xs={12} sm={4} md={4} key={player.player_id}>
                    <Card 
                        sx={{ 
                            background: colors[i]?.bg || 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            color: colors[i]?.text || '#fff',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                            borderRadius: 3,
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            transform: i === 0 ? 'scale(1.05)' : 'scale(1)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: i === 0 ? 'scale(1.08)' : 'scale(1.03)',
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4)',
                            }
                        }}
                    >
                        <CardContent sx={{ textAlign: 'center', py: 3 }}>
                            <Typography variant="h3" sx={{ mb: 1, fontSize: '3rem' }}>
                                {["🥇", "🥈", "🥉"][i]}
                            </Typography>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    fontWeight: 700, 
                                    mb: 1,
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                                }}
                            >
                                {player.players.name}
                            </Typography>
                            <Typography 
                                variant="subtitle1" 
                                sx={{ 
                                    fontWeight: 600, 
                                    mb: 0.5,
                                    fontSize: '1.1rem'
                                }}
                            >
                                Elo: {player.elo}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 500,
                                    opacity: 0.9
                                }}
                            >
                                {player.wins}W - {player.losses}L
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}