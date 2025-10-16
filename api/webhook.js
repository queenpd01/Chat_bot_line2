import { middleware, Client } from "@line/bot-sdk";

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const events = req.body.events || [];

      for (const event of events) {
        if (event.type === "message" && event.message.type === "text") {
          await client.replyMessage(event.replyToken, {
            type: "text",
            text: `คุณพิมพ์ว่า: ${event.message.text}`,
          });
        }
      }

      res.status(200).json({ message: "OK" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
