use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder,Logger};
use sqlx::{PgPool,Postgres,Pool,postgres::PgPoolOptions};
use dotenv::dotenv;

#[actix_web::main]
async fn main()->std::io::Result<()>{
    if std::env::var_os("RUST_LOG").is_none(){
        std::env::set_var("RUST_LOG","actix_web=info");
    }
    dotenv().ok();
    env_logger::init();

    let data_url:String  = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL is not set");

    let pool:Pool<postgres> = match PgPoolOptions::new()
    .max_connections(10)
    .connect(&data_url)
    .await{
        Ok(pool)=>{
            println!("conexioón exitosa");
            pool
        }
        Err(e)=>{
            println!("Error: {}",e);
            std::process::exit(1);
        }
    };
    println!("Servisor iniciado exitosamente");
    HttpServer::new(move || {
        let cors = Cors::default()
        .allow_any_origin()
        .allow_any_method()
        .allowed_headers(
            vec![
                header::CONTENT_TYPE,
                header::AUTHORIZATION,
                header::ACCEPT,

            ]
        );
App::new()
.app_data(actix_web::web::Date::new(AppState{db:pool.clone()}))
.configure(config)
.wrap(cors)
.wrap(Logger::default())

    })
    .bind("127.0.0.1",8080)?
    .run()
    .await;
println!("Servisor comenzado");
}