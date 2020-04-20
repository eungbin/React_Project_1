const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send(`Response Complate`);
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server On : http://localhost:${PORT}/`);
})