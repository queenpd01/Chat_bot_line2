import { Client } from "@line/bot-sdk";

const client = new Client({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
});

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const events = req.body.events;

      // วนลูปทุกข้อความที่ได้รับจากผู้ใช้
      for (const event of events) {
        if (event.type === "message" && event.message.type === "text") {
          const userText = event.message.text;

          // ตัวอย่างตอบกลับข้อความธรรมดา
          await client.replyMessage(event.replyToken, {
            type: "text",
            text: `คุณพิมพ์ว่า: ${userText}`,
          });
        }
      }

      res.status(200).send("OK");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
}
