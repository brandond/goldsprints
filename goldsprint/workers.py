import asyncio
import serial

from serial_asyncio import open_serial_connection
from asgiref.sync import async_to_sync
from channels.consumer import AsyncConsumer

class SerialDataWorker(AsyncConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._serial = None

    async def viewer_connect(self, event):
        print('SerialDataWorker viewer.connect')
        if not self._serial:
            try:
                self._serial, _ = await open_serial_connection(url='/dev/ttyACM0', baudrate=9600)
                print('Connected to serial port')
            except serial.SerialException as e:
                print(f'Failed to connect to serial port: {e}')
                await self.channel_layer.group_send('stream', {'type': 'game.data', 'state': '{}'})
            else:
                asyncio.get_running_loop().create_task(self._read_serial())

    async def _read_serial(self):
        while True:
            try:
                line = await self._serial.readline()
                line = str(line.decode()).strip()
                await self.channel_layer.group_send('stream', {'type': 'game.data', 'state': line})
            except Exception as e:
                print(f'Failed to relay serial data: {e}')
                self._serial = None
                break
