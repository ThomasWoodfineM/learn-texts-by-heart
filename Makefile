# Makefile for running the frontend

# Variables
FRONTEND_DIR = frontend

# Phony targets
.PHONY: all install start stop clean

# Default target
all: install start

# Install dependencies for the frontend
install:
	@echo "Installing frontend dependencies..."
	cd $(FRONTEND_DIR) && npm install

# Start the frontend
start:
	@echo "Starting frontend..."
	cd $(FRONTEND_DIR) && npm start

# Stop the frontend
stop:
	@echo "Stopping frontend..."
	@-pkill -f "node.*react-scripts"

# Clean up node_modules and build artifacts
clean:
	@echo "Cleaning up..."
	rm -rf $(FRONTEND_DIR)/node_modules
	rm -rf $(FRONTEND_DIR)/build

# Help target
help:
	@echo "Available targets:"
	@echo "  make install  - Install dependencies for the frontend"
	@echo "  make start    - Start the frontend"
	@echo "  make stop     - Stop the frontend"
	@echo "  make clean    - Remove node_modules and build artifacts"
	@echo "  make help     - Show this help message"