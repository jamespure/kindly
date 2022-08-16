require("dotenv").config();

const encodedPassword = encodeURIComponent(process.env.PASSWORD as string);
export const config = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: `mongodb+srv://${process.env.USERNAME}:${encodedPassword}@cluster0.lw9gwv7.mongodb.net/kindly
?retryWrites=true&w=majority`,
  },
  auth: {
    token_secret: process.env.TOKEN_SECRET,
  },
};
