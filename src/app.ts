import express from "express"
import cors from"cors"

const app=express()

// security middlewares
app.use(cors({origin:process.env.CORS_ORIGIN as string ,methods:process.env.CORS_METHODS as string ,}))

// common middlewares
app.use(express.json({limit:"16kb"}))
app.use(express.static("public"))

// import routes
import healthCheckRouter from "./routes/healthCheck.routes"
import createUserRouter from "./routes/createUser.routes"
import { errorHandler } from "./middlewares/error.middlewares"

// routes
app.use("/api/v1/healthCheck",healthCheckRouter)
app.use("/api/v1/user",createUserRouter)

// import protected routes
// protected routes


app.use(errorHandler)
export {app}