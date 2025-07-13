#!/bin/bash

if ! docker info >/dev/null 2>&1; then
  echo "Docker not initiated. Launching ..."
  open -a Docker

  # Waiting for Docker
  while ! docker info >/dev/null 2>&1; do
    echo "Waiting for Docker ..."
    sleep 2
  done
  echo "Docker launched"
fi

# Build image
docker build -t topdonation .

# Export image do souboru
docker save -o ~/Downloads/topdonation.tar topdonation

# Upload tar na server
rsync -avzP -e "ssh -i ~/.ssh/id_topdonation" ~/Downloads/topdonation.tar root@194.182.84.177:/root/app/topdonation.tar

# Smazání lokálního taru
rm -rf ~/Downloads/topdonation.tar