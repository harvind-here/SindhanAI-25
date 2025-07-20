import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeamScore {
  teamName: string;
  track: string;
  score: number;
  rank: number;
}

const ScoreBoard = () => {
  const [scores, setScores] = useState<TeamScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<string>('all');

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLiWph2hddj93yiDu-5lOtxird_VvWikmeTIxhHDmz0oKsZJo2E9iXanwQ9qj4IpCzUHnbhUjBnQ6r3kE7MafuOWysEBWj65zMw0Q8VQTpC6GyihMTvzJkkBo5MLgTOi4cxFZPR6nMa9svZRdt2e7b8Xiw0Z6nTn-oIeBoGCfsgaiad2E8Xwpuj8xERZhqO2GTY5l3vrNvkE3TJ9vzWZazHs2DfPJfPCO3k1pqopVkDhewG492XBWd8xFY9OgO3S-1WjOMtd0Sg3qQKz4ttdUT2TyOeEGQ&lib=MKCnJYcwgmqj6bLpjyV-L9PyrmWlyq2ZW');
        if (!response.ok) throw new Error('Failed to fetch scores');
        const data = await response.json();
        setScores(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load scores');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const filteredScores = selectedTrack === 'all' 
    ? scores 
    : scores.filter(score => score.track === selectedTrack);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-500 text-xl">Error: {error}</div>
    </div>
  );

  return (
    <section id="scores" className="py-24 bg-[#050a18] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Live Scores
            </span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Track the performance of teams in real-time across different tracks
          </p>
        </motion.div>

        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setSelectedTrack('all')}
            className={`px-4 py-2 rounded-full ${
              selectedTrack === 'all' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-gray-700 hover:bg-gray-600'
            } transition-all duration-300`}
          >
            All Tracks
          </button>
          {['AI', 'IoT', 'App Development'].map(track => (
            <button
              key={track}
              onClick={() => setSelectedTrack(track)}
              className={`px-4 py-2 rounded-full ${
                selectedTrack === track 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                  : 'bg-gray-700 hover:bg-gray-600'
              } transition-all duration-300`}
            >
              {track}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredScores.map((team, index) => (
            <motion.div
              key={team.teamName}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1b2131] p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{team.teamName}</h3>
                <span className="text-sm px-3 py-1 rounded-full bg-gray-700">
                  {team.track}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-400">Score</p>
                  <p className="text-2xl font-bold text-purple-500">{team.score}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rank</p>
                  <p className="text-2xl font-bold text-pink-500">#{team.rank}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScoreBoard;