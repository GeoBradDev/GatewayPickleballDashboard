import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function StatCard({ title, value, change }) {
    const isPositive = change && parseFloat(change) >= 0;

    return (
        <Card
            sx={{
                height: '100%',
                background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 107, 53, 0.05) 100%)',
                border: '1px solid rgba(0, 217, 255, 0.3)',
                borderRadius: 4,
                backdropFilter: 'blur(20px)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #00d9ff 0%, #ff6b35 100%)',
                },
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 60px rgba(0, 217, 255, 0.2)',
                    border: '1px solid rgba(0, 217, 255, 0.5)',
                    background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.15) 0%, rgba(255, 107, 53, 0.1) 100%)',
                },
            }}
        >
            <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Typography 
                    variant="overline" 
                    color="text.secondary" 
                    sx={{ 
                        fontWeight: 700,
                        letterSpacing: '1.5px',
                        fontSize: '0.7rem',
                        mb: 2,
                        display: 'block'
                    }}
                >
                    {title}
                </Typography>

                <Box>
                    <Typography 
                        variant="h3" 
                        sx={{ 
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', sm: '3rem' },
                            background: 'linear-gradient(135deg, #00d9ff 0%, #ff6b35 100%)',
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            lineHeight: 1,
                            mb: 1
                        }}
                    >
                        {value}
                    </Typography>

                    {change !== undefined && (
                        <Box
                            display="flex"
                            alignItems="center"
                            color={isPositive ? 'success.main' : 'error.main'}
                        >
                            {isPositive ? (
                                <ArrowUpwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                            ) : (
                                <ArrowDownwardIcon fontSize="small" sx={{ mr: 0.5 }} />
                            )}
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {change}
                            </Typography>
                        </Box>
                    )}
                </Box>
            </CardContent>
        </Card>
    );
}
