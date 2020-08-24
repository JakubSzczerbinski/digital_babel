
.PHONY: binary container clean

F2D_JAR := firrtl2digitaljs.jar

$(BIN_DIR)/$(F2D_JAR): $(F2D_JAR)
	cp $(F2D_JAR) $(BIN_DIR)

firrtl2digitaljs: 
	git clone https://github.com/JakubSzczerbinski/firrtl2digitaljs.git

binary: $(BIN_DIR)/$(F2D_JAR)

$(F2D_JAR): firrtl2digitaljs
	@$(MAKE) -C firrtl2digitaljs firrtl2digitaljs.jar
	cp firrtl2digitaljs/firrtl2digitaljs.jar $(F2D_JAR)

container: $(F2D_JAR)
	docker build --build-arg F2D_PATH=./$(F2D_JAR) -t szczerbi/firrtl2digitaljs -f Dockerfile.release .
	docker push szczerbi/firrtl2digitaljs:latest

clean:
	rm -rf $(F2D_JAR) $(BIN_DIR)/$(F2D_JAR) firrtl2digitaljs
