# Ruby
# https://jekyllrb.com/docs/installation/#requirements

FROM ruby:2.7-alpine3.15



# Jekyll Dependecies

RUN apk update
RUN apk add --no-cache build-base gcc cmake git



# Jekyll

RUN gem update --system
RUN gem update bundler
RUN gem install bundler jekyll
RUN gem bundle install