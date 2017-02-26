FROM rails:onbuild
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev curl libgeos-dev libgeos++-dev libgdal-dev libproj-dev
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install
RUN gem uninstall --force 'rgeo' && gem install 'rgeo'
ADD . /app
CMD rails server -e production
