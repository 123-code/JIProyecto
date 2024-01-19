use std::env;
use actix_web::{web, App, HttpServer, Responder};
use reqwest::header::{HeaderMap, HeaderValue, AUTHORIZATION};  

#[actix_web::main] 
async fn main() -> std::io::Result<()> {

    //let api_key =  "CG-pDUhHeh4gm6dA1fzPTWkwE3K";//env::var("API_KEY").expect("API Key not set");

    HttpServer::new(|| {
        App::new()
            .route("/coins", web::get().to(get_coins))
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

async fn get_coins() -> impl Responder {

    let mut headers = HeaderMap::new(); 

    headers.insert(
        AUTHORIZATION, 
        HeaderValue::from_str(&format!("Bearer {}",  "CG-pDUhHeh4gm6dA1fzPTWkwE3K")).unwrap()
    );

    let client = reqwest::Client::new();
    let resp = client
        .get("https://api.coingecko.com/api/v3/coins/markets")  
        .headers(headers)
        .send()
        .await
        .unwrap();

    let body = resp.text().await.unwrap();

    web::Json(body)
}

/*use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder,Logger};
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
*/