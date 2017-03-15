FROM rails:onbuild
MAINTAINER jonathan.d.reilly@gmail.com

# Include linux dependencies for RGeo
RUN apt-get update -qq && apt-get install -y \
  build-essential \
  curl \
  libgdal-dev \
  libgeos-dev \
  libgeos++-dev \
  libpq-dev \
  libproj-dev \
  lsof \
  vim

# Copy App Files
RUN mkdir /app
WORKDIR /app
COPY . /app

# Setup Client
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash -
RUN apt-get install -y nodejs
RUN cd /app/client && npm config set registry http://registry.npmjs.org/ && npm install

# RGeo gem must be reinstalled in order to find its dependencies
RUN gem uninstall --force 'rgeo' && gem install 'rgeo'

# Set up
RUN bundle install
CMD rails server
