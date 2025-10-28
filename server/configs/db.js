import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "blogbot";

const connectDB = async () => {
  try {
    let finalURI = MONGODB_URI;

    if (!MONGODB_URI.includes(`/${DB_NAME}`)) {
      if (MONGODB_URI.includes("?")) {
        const [base, query] = MONGODB_URI.split("?");
        finalURI = `${base}${DB_NAME}?${query}`;
      } else {
        finalURI = `${MONGODB_URI}/${DB_NAME}`;
      }
    }

    mongoose.connection.on("connected", () => console.log("✅ Database Connected"));
    await mongoose.connect(finalURI);

  } catch (error) {
    console.log("❌ Database connection error:", error.message);
  }
};

export default connectDB;
