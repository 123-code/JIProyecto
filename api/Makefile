DB_DOCKER_CONTAINER = rustjosei
install:

# uncomment and indent
	cargo install cargo-edit
	cargo add actix-web
	cargo add actix-cors
	cargo add serde_json
	cargo add serde --features derive
	cargo add chrono --features serde
	cargo add env_logger
	cargo add dotenv
	cargo add uuid --features "serde v4"
	cargo add sqlx --features "runtime-async-std-native-tls postgres chrono uuid"
# SQLX-CLI
	cargo install sqlx-cli


build:
	cargo build

stop_containers:
	@echo "Stopping all containers"
	if [$$(docker ps -q)]; then \
	echo "found and stopped containers";\
	docker stop $$(docker ps -q);\
	else \
	echo "no containers found";\
	fi


create_docker_container:
	docker run --name ${DB_DOCKER_CONTAINER} -P 5432:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=secret  -d postgres:12-alpine

create_postgres_db:
	docker exec -it ${DB_DOCKER_CONTAINER} createdb --username=root --owner=root rustjosei

start_docker_db:
	docker start ${DB_DOCKER_CONTAINER}

run:
	cargo run 

init_docker:
	stop_containers start_docker_db

#start: init_docker run 