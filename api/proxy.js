export default async function handler(req, res) {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required" });
  }

  try {
    const backendUrl = `https://mtr.api.jsmsr.eu.org:4001/mtr?ip=${ip}`;
    console.log(`Fetching data from: ${backendUrl}`);

    const response = await fetch(backendUrl);
    const data = await response.json();

    if (response.ok) {
      return res.status(200).json(data);
    } else {
      console.error("Error from backend:", data);
      return res.status(500).json({ error: "Error fetching data from backend" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Error fetching data from backend" });
  }
}

