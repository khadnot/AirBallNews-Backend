// Server for Air Ball News!!

import app from './app.js';
import { PORT } from './config.js'

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}!`)
});