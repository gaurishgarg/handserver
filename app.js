const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);

const bodyParser = require('body-parser');
const { FilesetResolver, Hands } = require('@mediapipe/tasks-vision');

app.use(bodyParser.urlencoded({ extended: true }));

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const PORT = 80;
const WS_PORT = 8080;

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

// Expose an endpoint to retrieve the WebSocket server URL
app.get('/websocketurl', (req, res) => {
  const websocketUrl = `ws://${req.hostname}:${WS_PORT}`;
  res.json({ websocketUrl });
});

wss.on('connection', (ws) => {
  console.log('WebSocket connected');

  ws.on('message', (message) => {
    console.log('Received message:', message);

    // Process the received image and return JSON
    // const jsonResponse = {
    //   message: 'Received image successfully.',
    //   image: message // Assuming message is the image data
    // };

    // Send JSON response back to client
    // ws.send(JSON.stringify(jsonResponse));
    const binaryData = Buffer.from("Data from Server", "utf-8");
    ws.send(binaryData, { binary: true });

  });

  ws.on('close', () => {
    console.log('WebSocket disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`HTTP server is listening on port ${PORT}`);
});







// async function detectHands(imageData) {
//     try {
//         // Resolve model file path
//         const modelPath = './'; // Replace with the actual path to your model directory
//         const vision = await FilesetResolver.forVisionTasks(modelPath);

//         // Create hand detection object
//         const handLandmarker = await Hands.HandLandmarker.create(vision, {
//             handDetectorOptions: {
//                 modelPath: 'hand_landmarker.task' // Specify the model file
//             }
//         });

//         // Process image
//         const result = await handLandmarker.process(imageData);

//         return result;
//     } catch (error) {
//         console.error('Error detecting hands:', error);
//         throw error;
//     }
// }

// app.post('/unitydetecthands', async (req, res) => {
//     try {
//         const imageData = req.body;
//         const detectionResult = await detectHands(imageData);

//         // Send back detection result
//         res.json({ result: detectionResult });
//     } catch (error) {
//         console.error('Error detecting hands:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// const image =
// const handLandmarkerResult = handLandmarker.detect(image);



module.exports = app;