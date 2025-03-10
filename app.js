const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


// avvio del server sulla porta specificata
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
});
