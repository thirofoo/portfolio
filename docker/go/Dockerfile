FROM golang:1.25-alpine

WORKDIR /back
COPY ./back/go.mod ./back/go.sum ./
RUN go mod download