FROM vidlito_base_python

# Run pre-install scripts
COPY install_scripts/install-postgres-tools.sh /app/install_scripts/
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    bash /app/install_scripts/install-postgres-tools.sh

# Copy each library
COPY libs/jazzoo /app/libs/jazzoo

# Install the service
COPY services/vidlito_be /app/src
RUN --mount=type=cache,target=/root/.cache/uv \
    uv pip install --system --break-system-packages -e /app/src -r /app/src/requirements.txt

# Django writes its log file here (see app/settings/base/sections/logging.py)
RUN mkdir -p /app/log

WORKDIR /app/src
