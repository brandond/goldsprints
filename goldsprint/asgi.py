"""
ASGI config for goldsprint project.

It exposes the ASGI callable as a module-level variable named ``application``.
"""

import os

from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from channels.routing import ChannelNameRouter, ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator

from .urls import websocket_urlpatterns
from .workers import SerialDataWorker

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "goldsprint.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": AllowedHostsOriginValidator(AuthMiddlewareStack(URLRouter(websocket_urlpatterns))),
        "channel": ChannelNameRouter({'command': SerialDataWorker.as_asgi()}),
    }
)
