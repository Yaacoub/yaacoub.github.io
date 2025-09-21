# Ruby
# https://jekyllrb.com/docs/installation/#requirements

FROM ruby:3.2.4-alpine



# Jekyll Dependecies

RUN apk update
RUN apk add --no-cache build-base gcc cmake git



# Jekyll

RUN gem update --system
RUN gem update bundler
RUN gem install bundler jekyll



# Git Config

RUN git config --global user.email "yaapete.dev@gmail.com"
RUN git config --global user.name "Peter Yaacoub"