import React, {useEffect, useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FinishedIssues } from "../utils/IssueApi";
import type { Issue } from "../type/Interface";

type StatisticsProps = {
    projectId: string;
    projectTitle: string;
};

export const TheBarChart: React.FC<StatisticsProps> = ({ projectId , projectTitle }) => {
    const [data, setData] = useState<Issue[]>([]);
    // fetchar färdiga issues via projectID 
    useEffect (() => {
        async function fetchData(){
            try {
                const issues = await FinishedIssues(projectId);
                setData(issues);
            } catch (error) {
                console.error("failed to fetch data", error)
            }
        }
        fetchData();
    },[projectId]);
    // mappar igenom data-arrayen med issues 
    const chartData = data.map(issue => ({
        issueTitle: issue.issueTitle,
        estimatedTime: issue.avarageEstTime,
        actualTime: issue.actualTime,
    }));

    return (
        <div style={{ width: "100%", height: 400 }}>
            <h2>Statistik för: {projectTitle}</h2>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="issueTitle" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="estimatedTime" fill="#8884d8" name="Estimerad tid" />
                        <Bar dataKey="actualTime" fill="#82ca9d" name="Faktisk tid" />
                    </BarChart>
                </ResponsiveContainer>
        </div>
    );
};
