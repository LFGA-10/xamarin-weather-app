package com.weather

import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import kotlinx.serialization.Serializable

@Serializable
data class WeatherResponse(
    val city: String,
    val temp: Double,
    val condition: String,
    val humidity: Int,
    val windSpeed: Double,
    val feelsLike: Double,
    val forecast: List<ForecastItem>
)

@Serializable
data class ForecastItem(
    val day: String,
    val temp: Double,
    val condition: String
)

fun main() {
    embeddedServer(Netty, port = 8080, host = "0.0.0.0", module = Application::module)
        .start(wait = true)
}

fun Application.module() {
    install(ContentNegotiation) {
        json()
    }
    
    install(CORS) {
        anyHost()
        allowHeader(io.ktor.http.HttpHeaders.ContentType)
    }

    routing {
        get("/") {
            call.respondText("Weather API is running!")
        }

        get("/weather") {
            val city = call.request.queryParameters["city"] ?: "Global"
            
            // In a real app, you'd fetch from OpenWeatherMap here
            val response = WeatherResponse(
                city = city,
                temp = 24.5,
                condition = "Sunny",
                humidity = 48,
                windSpeed = 12.0,
                feelsLike = 26.0,
                forecast = listOf(
                    ForecastItem("Mon", 24.0, "Sunny"),
                    ForecastItem("Tue", 22.5, "Cloudy"),
                    ForecastItem("Wed", 19.0, "Rainy"),
                    ForecastItem("Thu", 21.0, "Sunny"),
                    ForecastItem("Fri", 25.0, "Sunny")
                )
            )
            
            call.respond(response)
        }
    }
}
