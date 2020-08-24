
FROM ubuntu:18.04

RUN apt-get -y update && apt-get install -y curl gnupg2

RUN echo "deb https://dl.bintray.com/sbt/debian /" | tee -a /etc/apt/sources.list.d/sbt.list && \
    curl -sL "https://keyserver.ubuntu.com/pks/lookup?op=get&search=0x2EE0EA64E40A89B84B2DF73499E82A75642AC823" | apt-key add && \
    apt-get -y update && apt-get install -y \
    autoconf \
    bison \
    flex \
    gcc \
    g++ \
    git \
    libprotobuf-dev \
    libnl-route-3-dev \
    libtool \
    make \
    pkg-config \
    protobuf-compiler \
    sbt \
    openjdk-8-jdk

# RUN git clone https://github.com/google/nsjail.git && cd /nsjail && make && mv /nsjail/nsjail /bin && rm -rf -- /nsjail

ADD build.sbt /tmp/build.sbt
ADD Main.scala /tmp/Main.scala

RUN cd tmp && \
    sbt compile && \
    rm target -rf
