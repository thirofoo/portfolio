FROM golang:1.19.1-alpine

WORKDIR /back
COPY ./back/go.mod ./back/go.sum ./
RUN go mod download