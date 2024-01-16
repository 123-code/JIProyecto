use actix_web::{get,web, App, HttpServer, HttpResponse, Result, error::ResponseError};
use tokio_postgres::{NoTls, Client, Error as PgError};
use actix_web::dev::Server;
use std::net::TcpListener;
use std::fmt;
use std::sync::{Arc, Mutex};
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

async fn handle_connection() -> Result<Client, MyError> {
    let database_url = "postgres://dcdgubry:gpmuDY2lu01owW7RBHBIh3sq1TDkbBL6@mahmud.db.elephantsql.com/dcdgubry";
    let (client, connection) = tokio_postgres::connect(database_url, NoTls).await?;
    
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {}", e);
        } else {
            println!("Connected to db");
        }
    });

    Ok(client)
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

#[get("/users/")]
pub async fn run(listener: TcpListener) -> Result<Server, std::io::Error> {
    let db_client = Arc::new(Mutex::new(handle_connection().await));

    let server = HttpServer::new(move|| {
        App::new()
           .app_data(web::Data::new(db_client.clone())) 
            .route("/", web::get().to(app_works))
            .route("/data", web::get().to(get_data))
    })
    .listen(listener)?
    .run();

    Ok(server)
}
