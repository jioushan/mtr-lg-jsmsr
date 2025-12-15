import React, { useState } from "react";
import "./App.css";
import ThemeToggle from "./components/ThemeToggle.tsx";

type QueryType = 'mtr' | 'ping' | 'traceroute' | 'bgp';

const App: React.FC = () => {
  const [ip, setIp] = useState("");
  const [queryType, setQueryType] = useState<QueryType>('mtr');
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (ip.trim() === "") return;
    setLoading(true);
    try {
      let url = "";
      switch (queryType) {
        case 'mtr':
          url = `https://mtr.api.jsmsr.eu.org/mtr?ip=${ip}`;
          break;
        case 'ping':
          url = `https://domian.com?ip=${ip}`; // 待實現
          break;
        case 'traceroute':
          url = `https://domian.com/traceroute?ip=${ip}`; // 待實現
          break;
        case 'bgp':
          url = `https://domian.com/bgp?ip=${ip}`; // 待實現
          break;
      }

      const response = await fetch(url);
      const data = await response.json();
      setResult(data.result || ["No data received"]);
    } catch {
      setResult(["Error fetching data"]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchData();
    }
  };

  const handleSearchClick = () => fetchData();

  const getQueryTypeLabel = (type: QueryType) => {
    switch (type) {
      case 'mtr': return 'mtr';
      case 'ping': return 'ping';
      case 'traceroute': return 'rraceroute';
      case 'bgp': return 'BGP Route show';
    }
  };

  return (
    <div
      className="min-h-screen px-3 py-4 sm:px-6 sm:py-6 lg:px-8 transition-all duration-300 flex flex-col"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
      }}
    >
      <div className="flex-1 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1
            className="text-2xl sm:text-3xl lg:text-4xl font-bold"
            style={{ color: 'var(--text-accent)' }}
          >
            LookingGlass
          </h1>
          <ThemeToggle />
        </div>

        {/* Main Content */}
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-4 sm:gap-6">
          {/* Left Panel - Input */}
          <div
            className="glass p-4 sm:p-6 rounded-2xl shadow-xl order-2 xl:order-1"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--bg-glass-border)',
              boxShadow: 'var(--shadow-primary) 0 8px 32px',
            }}
          >
            <h2
              className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4"
              style={{ color: 'var(--text-accent)' }}
            >
              Network Tools
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Query Type
                </label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <select
                    value={queryType}
                    onChange={(e) => setQueryType(e.target.value as QueryType)}
                    className="glass flex-1 p-3 sm:p-4 rounded-xl border-none outline-none transition-all duration-200 text-sm sm:text-base"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-secondary) 0 4px 16px inset',
                    }}
                  >
                    <option value="mtr">mtr</option>
                    <option value="ping">ping</option>
                    <option value="traceroute">traceroute</option>
                    <option value="bgp">BGP Route show</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter IP address or hostname"
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="glass flex-1 p-3 sm:p-4 rounded-xl border-none outline-none transition-all duration-200 text-sm sm:text-base"
                    style={{
                      background: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      boxShadow: 'var(--shadow-secondary) 0 4px 16px inset',
                    }}
                  />
                </div>
                <button
                  onClick={handleSearchClick}
                  disabled={loading}
                  className="glass w-full sm:w-auto sm:px-6 py-3 sm:py-4 mt-3 rounded-xl font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-primary)',
                    boxShadow: 'var(--shadow-primary) 0 4px 16px',
                  }}
                >
                  {loading ? "Querying..." : "Query"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          {(loading || result.length > 0) && (
            <div
              className="glass p-4 sm:p-6 rounded-2xl shadow-xl order-1 xl:order-2"
              style={{
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid var(--bg-glass-border)',
                boxShadow: 'var(--shadow-primary) 0 8px 32px',
              }}
            >
              <h2
                className="text-lg sm:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4"
                style={{ color: 'var(--text-accent)' }}
              >
                Results - {getQueryTypeLabel(queryType)}
              </h2>
              <div className="h-full">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-48 sm:h-64">
                    <div
                      className="animate-spin h-8 w-8 sm:h-12 sm:w-12 border-4 rounded-full mb-4"
                      style={{
                        borderColor: 'var(--border-primary)',
                        borderTopColor: 'var(--text-accent)',
                      }}
                    ></div>
                    <span
                      className="text-base sm:text-lg text-center"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Querying...
                    </span>
                  </div>
                ) : (
                  <div
                    className="rounded-xl p-3 sm:p-4 overflow-auto max-h-64 sm:max-h-80 lg:max-h-96"
                    style={{
                      background: 'var(--bg-tertiary)',
                      boxShadow: 'var(--shadow-secondary) 0 4px 16px inset',
                    }}
                  >
                    <pre
                      className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed break-all sm:break-normal"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {result.join("\n")}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer
        className="mt-8 sm:mt-12 py-4 sm:py-6"
        style={{ borderTop: '1px solid var(--border-primary)' }}
      >
        <div className="text-center max-w-7xl mx-auto px-3 sm:px-6">
          <p
            className="text-xs sm:text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            © 2025 All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

