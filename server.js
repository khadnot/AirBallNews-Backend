// Server for Air Ball News!!

import app from './index';
import { PORT } from './config.js'

app.listen(PORT, () => {
    console.log(`Server starting on port ${PORT}!`)
});