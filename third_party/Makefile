
.PHONY: binaries containers

MAKE_DIR := $(PWD)
BIN_DIR := $(MAKE_DIR)/bin

export BIN_DIR

binaries:
	mkdir -p $(BIN_DIR)
	@$(MAKE) -C firrtl2digitaljs -f firrtl2digitaljs.mk binary

containers:
	@$(MAKE) -C chisel -f chisel.mk container
	@$(MAKE) -C firrtl2digitaljs -f firrtl2digitaljs.mk container

clean:
	@$(MAKE) -C chisel -f chisel.mk clean
	@$(MAKE) -C firrtl2digitaljs -f firrtl2digitaljs.mk clean
	rm -rf $(BIN_DIR)
	