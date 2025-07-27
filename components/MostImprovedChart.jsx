import React, {useEffect, useState} from 'react';
import {Paper, Typography} from '@mui/material';
import {BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList} from 'recharts';
import {supabase} from '../src/lib/supabaseClient';

export default function MostImprovedChart({week}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (week < 1) return;

        const fetchImprovement = async () => {
            const {data, error} = await supabase
                .rpc('most_improved', {week}); // RPC functions take an object of arguments

            if (error) {
                console.error('Error fetching most improved:', error.message);
                return;
            }

            setData(data);
        };

        fetchImprovement();
    }, [week]);

    return (
        <Paper elevation={3} sx={{p: 2, mt: 4}}>
            <Typography variant="h6" gutterBottom>📊 Most Improved (Week {week})</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart layout="vertical" data={data} margin={{left: 30}}>
                    <XAxis type="number"/>
                    <YAxis dataKey="name" type="category"/>
                    <Tooltip/>
                    <Bar dataKey="improvement" fill="#4caf50">
                        <LabelList dataKey="improvement" position="right"/>
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Paper>
    );
}