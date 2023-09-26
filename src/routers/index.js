import studentRouter from "./student.js";

function appRouter(app){
    app.use('/students',studentRouter);
}
export default appRouter;