#!/usr/bin/env bash

docker build -t e2e-test -f ./Dockerfile .
docker run -t -d e2e-test
