import { app } from './app';
const PORT = process.env.PORT || 9810;

app.listen(PORT, () => console.log(`Started server http://localhost:${PORT}`));