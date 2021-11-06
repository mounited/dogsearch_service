FROM debian:10.11

RUN apt-get update && apt-get install -y \
    python3 \
    python3-venv \
    libgl1-mesa-glx \
    libglib2.0-0 \
    tesseract-ocr \
    tesseract-ocr-rus \
    wget \
    build-essential \
    python3-dev \
    && rm -rf /var/apt/lists/*

ENV VIRTUAL_ENV /venv
RUN python3 -m venv $VIRTUAL_ENV

ENV PATH="${VIRTUAL_ENV}/bin:${PATH}"

RUN pip install --upgrade pip wheel

ENV TF_CPP_MIN_LOG_LEVEL=3

COPY model /model

WORKDIR /model/code

RUN pip install -r requirements.txt

ENV DATA=/model/data

RUN /model/prepare.sh

COPY app /app

WORKDIR /app

RUN pip install -r requirements.txt

CMD ["python", "-m", "dogsearch.worker"]
