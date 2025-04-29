#!/usr/bin/bash
echo -e 'save ""\ndatabases 1' | redis-server - &
python3 manage.py runserver --noreload 0.0.0.0:8000 &
python3 manage.py runworker command &
wait
