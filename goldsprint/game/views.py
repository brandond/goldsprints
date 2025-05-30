from django.conf import settings
from django.urls import reverse
from django.shortcuts import redirect, get_object_or_404
from django.template.response import TemplateResponse

from .forms import EventForm, FirstRoundFormset, RaceForm
from .models import Race, Event


def menu(request):
    last_event = Event.objects.last()
    ctx = {'last_event': last_event}
    return TemplateResponse(request, 'menu.html', ctx)


def free_ride(request):
    ctx = {'mode': settings.MODE_FREE_RIDE}
    return TemplateResponse(request, 'race.html', ctx)


def new_race(request):
    race = Race()
    form = RaceForm(request.POST or None, instance=race)
    if form.is_valid():
        race = form.save()
        return redirect('game:start-race', pk=race.pk)
    return TemplateResponse(request, 'new_race.html', {'form': form})


def start_race(request, pk):
    race = get_object_or_404(Race, pk=pk)
    ctx = {
        'race': race,
        'player_a': race.player_a,
        'player_b': race.player_b,
        'mode': settings.MODE_RACE
    }
    return TemplateResponse(request, 'race.html', ctx)


def new_event(request):
    event = Event()
    form = EventForm(request.POST or None, instance=event)
    if form.is_valid():
        event = form.save()
        return redirect('game:add-first-round', pk=event.pk)
    return TemplateResponse(request, 'new_event.html', {'form': form})


def add_first_round(request, pk):
    event = get_object_or_404(Event, pk=pk)
    formset = FirstRoundFormset(request.POST or None, instance=event)
    if formset.is_valid():
        formset.save()
        return redirect('game:add-first-round', pk=event.pk)

    next_race = event.first_round.first()
    if next_race:
        next_race_url = event.get_race_url(next_race)
    else:
        next_race_url = None
    ctx = {'formset': formset, 'event': event, 'next_race_url': next_race_url}
    return TemplateResponse(request, 'new_round.html', ctx)


def event_race(request, pk, race_pk):
    event = get_object_or_404(Event, pk=pk)
    this_race = get_object_or_404(Race, pk=race_pk)
    races = list(event.first_round.all())

    this_race_index = 0
    for i, race in enumerate(races):
        if race == this_race:
            this_race_index = i

    if this_race_index == 0:
        prev_race = None
        prev_race_url = reverse('game:add-first-round', kwargs={'pk': event.pk})
    else:
        try:
            prev_race = races[this_race_index - 1]
            prev_race_url = event.get_race_url(prev_race)
        except IndexError:
            prev_race = None
            prev_race_url = reverse('game:add-first-round', kwargs={'pk': event.pk})

    try:
        next_race = races[this_race_index + 1]
        next_race_url = event.get_race_url(next_race)
    except IndexError:
        next_race = None
        next_race_url = reverse('game:add-first-round', kwargs={'pk': event.pk})

    ctx = {
        'race': this_race,
        'player_a': this_race.player_a,
        'player_b': this_race.player_b,
        'mode': settings.MODE_RACE,
        'next_race_url': next_race_url,
        'prev_race_url': prev_race_url
    }
    return TemplateResponse(request, 'race.html', ctx)


def round_scores(request, pk):
    event = get_object_or_404(Event, pk=pk)
    races = event.first_round.exclude(
        race_time_a__isnull=True).exclude(race_time_b__isnull=True)

    best_times = {}
    for race in races:
        if not race.player_a in best_times or best_times[race.player_a] < race.race_time_a:
            best_times[race.player_a] = race.race_time_a
        if not race.player_b in best_times or best_times[race.player_b] < race.race_time_b:
            best_times[race.player_b] = race.race_time_b

    scores = [(player, best_time) for player, best_time in best_times.items()]
    scores = sorted(scores, key=lambda score: score[1])
    ctx = {'scores': scores, 'event': event}
    return TemplateResponse(request, 'scores.html', ctx)
