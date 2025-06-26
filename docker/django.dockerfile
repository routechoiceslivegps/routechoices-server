FROM python:3.13 as builder

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

ENV PYTHONUNBUFFERED 1 \
    UV_COMPILE_BYTECODE 1

COPY requirements.txt .

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends g++ gcc libcairo2-dev libgdal-dev libjpeg-dev zlib1g-dev libwebp-dev libmagic-dev libgl1 libpq5 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

RUN uv venv /opt/venv
ENV VIRTUAL_ENV="/opt/venv/" \
    PATH="/opt/venv/bin:/root/.cargo/bin:$PATH"

RUN . /opt/venv/bin/activate

RUN uv pip install -r requirements.txt

# final stage
FROM python:3.13-slim as final
RUN adduser --disabled-password --gecos '' --no-create-home app
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends libcairo2 libgl1 libglib2.0-0 libmagic1 libgdal32 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

COPY --from=builder /opt/venv /opt/venv

ENV VIRTUAL_ENV="/opt/venv/"
ENV PATH="/opt/venv/bin:$PATH"
ENV LD_LIBRARY_PATH="/usr/local/lib"

WORKDIR /app
RUN chown -R app:app /app

COPY .env.dev ./.env
ADD . /app/

EXPOSE 8000
EXPOSE 2000

ENV DJANGO_SETTINGS_MODULE=routechoices.settings

USER app
RUN DATABASE_URL="sqlite://:memory:" python manage.py collectstatic --noinput
