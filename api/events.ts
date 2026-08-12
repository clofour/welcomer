import { App, ExpressReceiver } from "@slack/bolt";

const receiver = new ExpressReceiver({
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
    processBeforeResponse: true,
})

const app = new App({
    token: process.env.SLACK_BOT_TOKEN!,
    receiver: receiver,
})

app.event("member_joined_channel", async ({ event, client }) => {
    const channel = event.channel;

    if (event.channel == process.env.CHANNEL_ID!) {
        await client.chat.postMessage({
            channel: channel,
            text: "Hi",
        })
    }
})

export default receiver.app;