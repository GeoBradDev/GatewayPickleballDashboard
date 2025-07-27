import React, {useEffect, useState} from 'react';
import {Paper, Typography} from '@mui/material';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {supabase} from '../lib/supabaseClient';

export default function EloChart({week}) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchEloHistory = async () => {
            const {data, error} = await supabase
                .from('weekly_rankings')
                .select('week, elo, players(name)')
                .order('week', {ascending: true});

            if (error) {
                console.error('Error fetching elo history:', error.message);
                return;
            }

            const playerHistory = {};
            data.forEach(entry => {
                const name = entry.players.name;
                if (!playerHistory[name]) playerHistory[name] = [];
                playerHistory[name].push({week: entry.week, elo: entry.elo});
            });

            const formatted = [];
            const maxWeeks = Math.max(...data.map(d => d.week));
            for (let w = 0; w <= maxWeeks; w++) {
                const entry = {week: w};
                Object.keys(playerHistory).forEach(name => {
                    const found = playerHistory[name].find(p => p.week === w);
                    entry[name] = found ? found.elo : null;
                });
                formatted.push(entry);
            }

            setChartData(formatted);
        };

        fetchEloHistory();
    }, [week]);

    return (
        <Paper elevation={3} sx={{p: 2, mt: 4}}>
            <Typography variant="h6" gutterBottom>Elo Over Time</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <XAxis dataKey="week"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {chartData.length > 0 &&
                        Object.keys(chartData[0])
                            .filter(k => k !== 'week')
                            .map((key, idx) => (
                                <Line key={key} type="monotone" dataKey={key}
                                      stroke={`hsl(${(idx * 40) % 360}, 70%, 50%)`}/>
                            ))}
                </LineChart>
            </ResponsiveContainer>
        </Paper>
    );
}
