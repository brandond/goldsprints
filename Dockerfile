FROM node:22 as install
RUN apt-get update && apt-get install -y python3-pip

FROM install as build
WORKDIR /src
COPY . .
ENV NODE_ENV=development
RUN npm install && \
     npm run build
RUN npm cache clean --force && \
     rm -rf node_modules

FROM build as release
RUN PIP_BREAK_SYSTEM_PACKAGES=1 pip3 install -r requirements.txt
RUN python3 manage.py migrate
EXPOSE 8000 
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
