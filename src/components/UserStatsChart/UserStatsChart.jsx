import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './UserStatsChart.scss'
const data = [
  { grade: "5-sinf", users: 100 },
  { grade: "6-sinf", users: 150 },
  { grade: "7-sinf", users: 200 },
  { grade: "8-sinf", users: 180 },
  { grade: "9-sinf", users: 220 },
  { grade: "10-sinf", users: 170 },
  { grade: "11-sinf", users: 140 },
];

export default function UserStatsChart() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8 shadow-lg rounded-2xl p-4 diagram">
      <div>
        <h2 className="text-xl font-bold mb-4 text-center">Sinflar bo‘yicha foydalanuvchilar soni</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="grade" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#00a2ff" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
