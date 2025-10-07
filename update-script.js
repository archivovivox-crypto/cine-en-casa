const fs = require('fs').promises;
const path = require('path');
async function updateDataFile() {
  const dataPath = path.join(__dirname, '..', 'data.json');
  const rawData = await fs.readFile(dataPath, 'utf8');
  const data = JSON.parse(rawData);
  const today = new Date().toISOString().split('T')[0];
  data.meta.last_updated = today;
  data.meta.version = (parseFloat(data.meta.version) + 0.1).toFixed(1);
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
  console.log(✅ Actualizado a v$\{data.meta.version} ($\{today}));
}
updateDataFile().catch(console.error);
