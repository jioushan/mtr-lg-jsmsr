// api/proxy.js
export default async function handler(req, res) {
    const { ip } = req.query; // 获取请求中的 ip 参数
    if (!ip) {
        return res.status(400).json({ error: "IP address is required" });
    }

    // 后端的 API 地址
    const apiUrl = `http://mtr.api.jsmsr.eu.org:4001/mtr?ip=${ip}`;

    try {
        // 请求后端 API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching data from API: ${response.statusText}`);
        }

        // 解析返回的数据
        const data = await response.json();
        res.status(200).json(data); // 将数据返回给前端
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Error fetching data from backend" });
    }
}

