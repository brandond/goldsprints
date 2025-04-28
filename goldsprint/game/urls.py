from django.urls import re_path

from . import api
from . import views

urlpatterns = [
    re_path(r'^$', views.menu, name='menu'),
    re_path(r'^free-ride/$', views.free_ride, name='free-ride'),
    re_path(r'^race/new/$', views.new_race, name='new-race'),
    re_path(r'^race/(?P<pk>[0-9]+)/$', views.start_race, name='start-race'),

    re_path(r'^event/new/$', views.new_event, name='new-event'),
    re_path(r'^event/(?P<pk>[0-9]+)/add-first-round/$', views.add_first_round, name='add-first-round'),
    re_path(r'^event/(?P<pk>[0-9]+)/race/(?P<race_pk>[0-9]+)/$', views.event_race, name='event-race'),
    re_path(r'^event/(?P<pk>[0-9]+)/scores/$', views.round_scores, name='round-scores'),

    re_path(r'^api/race-(?P<pk>[0-9]+)/$', api.save_race_results, name='save-race-results')
]
