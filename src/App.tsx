import React, { useState } from "react";

const App: React.FC = () => {
    const [ip, setIp] = useState("");
    const [result, setResult] = useState<string[]>([]);
    
    // 按下 Enter 键时调用
    const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && ip.trim() !== "") {
            event.preventDefault();
            try {
                // 使用 Vercel API 路由作为代理
                const response = await fetch(`/api/proxy?ip=${ip}`);
                const data = await response.json();
                setResult(data.result || ["No data received"]);
            } catch (error) {
                setResult(["Error fetching data"]);
            }
        }
    };

    // 点击按钮时调用
    const handleSearchClick = async () => {
        if (ip.trim() !== "") {
            try {
                // 使用 Vercel API 路由作为代理
                const response = await fetch(`/api/proxy?ip=${ip}`);
                const data = await response.json();
                setResult(data.result || ["No data received"]);
            } catch (error) {
                setResult(["Error fetching data"]);
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white shadow-md rounded-xl w-full max-w-2xl p-6 flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">MTR Routetrace</h1>
                
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Enter IP address"
                        value={ip}
                        onChange={(e) => setIp(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="border border-gray-300 rounded-md p-3 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSearchClick}
                        className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Enter
                    </button>
                </div>

                {result.length > 0 && (
                    <div className="mt-6 p-4 bg-black text-white border border-gray-200 rounded-md">
                        <h2 className="text-xl font-semibold mb-3">Results:</h2>
                        <pre className="font-mono whitespace-pre-wrap">{result.join("\n")}</pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default App;

