from channels.generic.websocket import AsyncWebsocketConsumer

class PlayerDataConsumer(AsyncWebsocketConsumer):
    groups = ['stream']

    async def connect(self):
        await self.channel_layer.send('command', {'type': 'viewer.connect', 'name': self.channel_name})
        await self.accept()

    async def game_data(self, event):
        await self.send(event['state'])
