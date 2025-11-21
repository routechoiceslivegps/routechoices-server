FROM python:3.14 AS builder

WORKDIR /app

COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /usr/local/bin/

ENV PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1


RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends g++ gcc libcairo2-dev libgdal-dev libjpeg-dev zlib1g-dev libwebp-dev libmagic-dev libgl1 libpq5 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

RUN curl https://sh.rustup.rs -sSf | sh -s -- -y

RUN uv venv /opt/venv
ENV VIRTUAL_ENV="/opt/venv/" \
    PATH="/opt/venv/bin:/root/.cargo/bin:$PATH"

RUN . /opt/venv/bin/activate

COPY requirements.txt .

RUN uv pip install -r requirements.txt

# final stage
FROM python:3.14-slim AS final
RUN adduser --uid 1001 --disabled-password --gecos '' --no-create-home app
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends curl libcairo2 libgl1 libglib2.0-0 libmagic1 libgdal36 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

COPY --from=builder /opt/venv /opt/venv

ENV VIRTUAL_ENV="/opt/venv/"
ENV PATH="/opt/venv/bin:$PATH"
ENV LD_LIBRARY_PATH="/usr/local/lib"

WORKDIR /app

COPY .env.dev ./.env
ADD . /app/

EXPOSE 8000
EXPOSE 2000

ENV DJANGO_SETTINGS_MODULE=routechoices.settings

RUN DATABASE_URL="sqlite://:memory:" python manage.py collectstatic --noinput

ENV NODE_VERSION=25.2.1
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN "/root/.nvm/versions/node/v${NODE_VERSION}/bin/npm" install --global pnpm
RUN pnpm install -C jstools
#RUN chown -R app:app /app
#USER app
