import React from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

export default function Leaderboard({ players }) {
    return (
        <div>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell 
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main',
                                borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Rank
                        </TableCell>
                        <TableCell 
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main',
                                borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Name
                        </TableCell>
                        <TableCell 
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main',
                                borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                            }}
                        >
                            Elo
                        </TableCell>
                        <TableCell 
                            sx={{ 
                                fontWeight: 700,
                                color: 'primary.main',
                                borderBottom: '2px solid rgba(99, 102, 241, 0.3)',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem',
                                letterSpacing: '0.5px'
                            }}
                        >
                            W/L
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {players.map((player, index) => (
                        <TableRow 
                            key={player.player_id}
                            sx={{
                                '&:hover': {
                                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                },
                                borderBottom: '1px solid rgba(99, 102, 241, 0.1)',
                            }}
                        >
                            <TableCell 
                                sx={{ 
                                    fontWeight: 600,
                                    color: index < 3 ? 'primary.main' : 'text.primary',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${player.rank}`}
                            </TableCell>
                            <TableCell 
                                sx={{ 
                                    fontWeight: 500,
                                    color: 'text.primary',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {player.players.name}
                            </TableCell>
                            <TableCell 
                                sx={{ 
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {player.elo}
                            </TableCell>
                            <TableCell 
                                sx={{ 
                                    fontWeight: 500,
                                    color: 'text.secondary',
                                    fontSize: '0.85rem'
                                }}
                            >
                                {player.wins}/{player.losses}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
