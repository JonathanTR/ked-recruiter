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
  vim

# Copy App Files
RUN mkdir /app
WORKDIR /app
COPY . /app

# RGeo gem must be reinstalled in order to find its dependencies
RUN gem uninstall --force 'rgeo' && gem install 'rgeo'

# Set up
RUN bundle install
ENTRYPOINT ["bundle", "exec"]
CMD rails server
