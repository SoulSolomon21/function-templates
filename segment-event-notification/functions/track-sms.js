exports.handler = async function(context, event, callback) {
  const client = context.getTwilioClient();

  if(event.type === 'track' && event.event === context.SEGMENT_EVENT) {
    console.info(`Received a Segment track event named "${context.SEGMENT_EVENT}"`);

    let body = `The Segment event "${event.event}" occurred.`;

    if (event.properties && Object.keys(event.properties).length > 0) {
      body += '\n\n';

      for (const [key, value] of Object.entries(event.properties)) {
        body += `${key}: ${value}\n`;
      }
    }

    await client.messages.create({
      to: context.MY_PHONE_NUMBER,
      from: context.TWILIO_PHONE_NUMBER,
      body,
    });
  }

  callback(null, {});
};
