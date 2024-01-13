use actix_web::{web, App, HttpServer, HttpResponse, Result, error::ResponseError};
use tokio_postgres::{NoTls, Client, Error as PgError};
use actix_web::dev::Server;
use std::net::TcpListener;
use std::fmt;
use serde::Serialize;

#[derive(Debug)]
enum MyError {
    DatabaseError(PgError),
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Database error: {:?}", self)
    }
}

impl ResponseError for MyError {}

// Implement From<tokio_postgres::Error> for MyError
impl From<PgError> for MyError {
    fn from(error: PgError) -> Self {
        MyError::DatabaseError(error)
    }
}

#[derive(Debug, Serialize)]
struct MyData {
    id: i32,
    name: String,
}

async fn handle_connection() -> Result<(), MyError> {
    let database_url = "postgres://jmxmstkk:OnDiozn31AZq53EolR5FWsKwepL-vMgC@heffalump.db.elephantsql.com/jmxmstkk";
    let (client, connection) = tokio_postgres::connect(database_url, NoTls).await?;
    
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {}", e);
        } else {
            println!("Connected to db");
        }
    });

    Ok(())
}

async fn get_data(db: web::Data<Client>) -> Result<HttpResponse, MyError> {
    let rows = db.query("SELECT * FROM table", &[]).await?;

    let mut data = Vec::new();
    for row in rows {
        let my_data = MyData {
            id: row.get("id"),
            name: row.get("name"),
        };

        data.push(my_data);
    }

    Ok(HttpResponse::Ok().json(data))
}

async fn app_works() -> HttpResponse {
    HttpResponse::Ok().finish()
}

pub async fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    handle_connection().await;

    let server = HttpServer::new(|| {
        App::new()
            .route("/", web::get().to(app_works))
            .route("/data", web::get().to(get_data))
    })
    .listen(listener)?
    .run();

    Ok(server)
}
