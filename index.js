import express from "express";
import { Client, middleware } from "@line/bot-sdk";

const app = express();

const config = {
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new Client(config);

app.post("/webhook", middleware(config), async (req, res) => {
  const events = req.body.events;
  for (const event of events) {
    if (event.type === "message" && event.message.type === "text") {
      const text = event.message.text;

      if (text === "เมนู") {
        const flexMessage = {
          type: "flex",
          altText: "เมนูหลัก",
          contents: {
            type: "bubble",
            hero: {
              type: "image",
              url: "https://picsum.photos/600/300",
              size: "full",
              aspectRatio: "20:13",
              aspectMode: "cover",
            },
            body: {
              type: "box",
              layout: "vertical",
              contents: [
                { type: "text", text: "เมนูหลัก 🍱", weight: "bold", size: "xl" },
                { type: "text", text: "เลือกคำสั่งได้เลย 👇", wrap: true },
              ],
            },
            footer: {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "button",
                  style: "primary",
                  color: "#00B900",
                  action: { type: "message", label: "สุ่มรูปหมา 🐶", text: "หมา" },
                },
              ],
            },
          },
        };
        await client.replyMessage(event.replyToken, flexMessage);
      } else if (text === "หมา") {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: "https://dog.ceo/api/breeds/image/random",
        });
      } else {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: "พิมพ์ 'เมนู' เพื่อเริ่มดู Flex Message 📱",
        });
      }
    }
  }
  res.sendStatus(200);
});

app.get("/", (req, res) => res.send("LINE Flex Bot is running ✅"));
app.listen(3000, () => console.log("Server running on port 3000"));
