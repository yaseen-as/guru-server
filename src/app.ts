import express from "express"
import cors from"cors"

const app=express()

// security middlewares
app.use(cors({origin:process.env.CORS_ORIGIN as string ,methods:process.env.CORS_METHODS as string ,}))

// common middlewares
app.use(express.json({limit:"16kb"}))

// import routes
import healthCheckRouter from "./routes/healthCheck.routes"


// routes
app.use("/api/v1/healthCheck",healthCheckRouter)


// import protected routes
// protected routes


export {app}