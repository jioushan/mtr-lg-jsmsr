// api/proxy.js
export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    const backendUrl = `https://mtr.api.jsmsr.eu.org/mtr?ip=${ip}`; // HTTPS 后端
    console.log(`Fetching data from backend: ${backendUrl}`);

    const response = await fetch(backendUrl);
    console.log('Backend response status:', response.status);

    // 如果响应不是 2xx，则报错
    if (!response.ok) {
      const errorData = await response.text();
      console.log('Error from backend:', errorData);
      return res.status(500).json({ error: "Error fetching data from backend", details: errorData });
    }

    const data = await response.json();
    console.log('Backend data received:', data);  // 输出后端返回的数据
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error during fetch:", error);
    return res.status(500).json({ error: "Error fetching data from backend", details: error.message });
  }
}
