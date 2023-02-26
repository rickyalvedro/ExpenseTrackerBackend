const path = require("path");
const fs = require("fs");

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
// const helmet = require("helmet");
// const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");

// get config vars
dotenv.config();

const sequelize = require("./util/database");
const User = require("./models/users");
const Expense = require("./models/expenses");
const Order = require("./models/orders");
const Forgotpassword = require("./models/forgotpassword");

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");
const premiumFeatureRoutes = require("./routes/premiumFeature");
const resetPasswordRoutes = require("./routes/resetpassword");

// const accessLogStream = fs.createWriteStream(
//   path.join(__dirname, "access.log"),
//   { flags: "a" }
// );

// app.use(helmet());
// app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/expense", expenseRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/premium", premiumFeatureRoutes);
app.use("/password", resetPasswordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
