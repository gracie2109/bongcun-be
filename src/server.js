import 'dotenv/config';
import app from './app';
import connectMongoDB from './database/mongodb';


const PORT = process.env.PORT || 3004

app.listen(PORT, () => {
	console.log(`[SUCCESS] ::: Server is listening on port: ${PORT}`)
})

// connectSocketIO(server);
connectMongoDB();
