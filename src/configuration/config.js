import chalk from "chalk";
import multer from "multer";
import { config } from "dotenv";
import { connect } from "mongoose";

config();
export const DBConnection = async () => {
  try {
    await connect(process.env.MONGO_URL);
    console.log(
      chalk.hex("#fff").italic(" 𝔐𝔬𝔫𝔤𝔬𝔇𝔅 𝔦𝔰 𝔠𝔬𝔫𝔫𝔢𝔠𝔱𝔢𝔡 𝔰𝔲𝔠𝔠𝔢𝔰𝔰𝔣𝔲𝔩𝔩𝔶 ")
    );
  } catch (error) {
    console.log(
      chalk.hex("#ff5252").italic(`MongoDB error catch error: 💥💥💥� ${error}`)
    );
  }
};

export const catchErr = (data, a) => {
  return `Internal server error in ${data} API, ${a} controller`;
};

export const fromData = multer().none();
