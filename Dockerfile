FROM ubuntu:18.04

RUN apt update
RUN apt upgrade -y
RUN apt install curl -y

# Install nvm and node 12
# We switch to interactive shell and then back so we can use source and install nvm
# Docker/Bash yells at you but hasn't been a problem
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
RUN source /root/.bashrc && nvm install 12 && nvm use 12
SHELL ["/bin/bash", "--login", "-c"]

