FROM python:3.13 as builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends g++ gcc libcairo2-dev libgdal-dev libjpeg-dev zlib1g-dev libwebp-dev libmagic-dev libgl1 libpq5 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

RUN curl https://sh.rustup.rs -sSf | bash -s -- -y
ENV PATH="/root/.cargo/bin:$PATH"

COPY requirements.txt .
RUN python -m venv /opt/venv
ENV VIRTUAL_ENV="/opt/venv/"
ENV PATH="/opt/venv/bin:$PATH"
RUN . /opt/venv/bin/activate
RUN pip install uv
RUN uv pip install -r requirements.txt

# final stage
FROM python:3.13-slim
RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends libcairo2 libgl1 libglib2.0-0 libmagic1 libgdal32 && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /usr/share/doc /usr/share/man

COPY --from=builder /opt/venv /opt/venv

ENV VIRTUAL_ENV="/opt/venv/"
ENV PATH="/opt/venv/bin:$PATH"
ENV LD_LIBRARY_PATH="/usr/local/lib"

WORKDIR /app/
ADD . /app/

EXPOSE 8000
EXPOSE 2000

ENV DJANGO_SETTINGS_MODULE=routechoices.settings
RUN cp ./.env.dev ./.env
RUN DATABASE_URL="sqlite://:memory:" python manage.py collectstatic --noinput
ADD wait-for-it.sh /wait-for-it.sh
RUN chmod 755 /wait-for-it.sh
