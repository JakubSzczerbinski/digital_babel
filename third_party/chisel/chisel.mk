
.PHONY: container clean

container: build.sbt Main.scala Dockerfile
	docker build -t szczerbi/sbt_chisel -f ./Dockerfile .
	docker push szczerbi/sbt_chisel:latest

clean:
