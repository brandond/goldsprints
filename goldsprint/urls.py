from django.urls import include, re_path
from django.contrib import admin

from .game.urls import urlpatterns as game_urls

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),
    re_path(r'', include((game_urls, 'game'), namespace='game')),
]
