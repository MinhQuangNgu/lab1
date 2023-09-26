import mongoose from 'mongoose';

async function dbConnect() {
    await mongodbConnect();

}
async function mongodbConnect() {
    mongoose
        .connect(process.env.MONGODB)
        .then((res) => {
            console.log("connected to database");
        })
        .catch((err) => {
            console.log(`your error :${err}`);
        });
}

export default dbConnect;

