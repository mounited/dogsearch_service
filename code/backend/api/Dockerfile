FROM debian:11.1

RUN apt-get update && apt-get install -y \
  python3 \
  python3-pip \
  python3-pymongo \
  && rm -rf /var/apt/lists/*

COPY . /app

WORKDIR /app

RUN pip3 install -r requirements.txt

ENV HOST 0.0.0.0
ENV PORT 80

CMD ["python3", "-m", "dogsearch.api"]
