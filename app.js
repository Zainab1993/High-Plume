const express = require("express");
const app = express();
const productRoutes = require("./api/routes/products");
const registerRoutes = require("./api/routes/user");
const loginRoutes = require("./api/routes/userLogin");
const customerRoutes = require("./api/routes/customerLogin");
const startupRoutes = require("./api/routes/loan");
const businessRoutes = require("./api/routes/business");
const financialRoutes = require("./api/routes/financial");
const questionsRoutes = require("./api/routes/questionsTable");
const createCategoryRoutes = require("./api/routes/categoryInfo");
const startupQuestionsRoutes = require("./api/routes/startupQuestions");
const businessQuestionsRoutes = require("./api/routes/businessQuestions");
const financialQuestionsRoutes = require("./api/routes/financialQuestions");
const savedStartupQuestionsRoutes = require("./api/routes/savedStartupQuestions");
const savedBusinessQuestionsRoutes = require("./api/routes/savedBusinessQuestions");
const savedFinancialQuestionsRoutes = require("./api/routes/savedFinancialQuestions");
const customerRegisterRoutes = require("./api/routes/customerRegister");
const individualInformationRoutes = require("./api/routes/individualInformation");
const savedIndividualInfoRoutes = require("./api/routes/savedIndividualInfo");
const assetRoutes = require("./api/routes/asset");
const liabilitiesRoutes = require("./api/routes/liabilities");
const savedAssetRoutes = require("./api/routes/savedAsset");
const savedLiabilitiesRoutes = require("./api/routes/savedLiabilities");
const annualIncomeRoutes = require("./api/routes/annualIncome");
const savedAnnualIncomeRoutes = require("./api/routes/savedAnnualIncome");
const annualExpendituresRoutes = require("./api/routes/annualExpenditures");
const savedAnnualExpendituresRoutes = require("./api/routes/savedAnnualExpenditures");
const contingentLiabilitiesRoutes = require("./api/routes/contingentLiabilities");
const savedContingentLiabilitiesRoutes = require("./api/routes/savedContingentLiabilities");
const createSectionRoutes = require("./api/routes/createSection");
const sectionTemplateRoutes = require("./api/routes/SectionQuestion");
const savedSectionQuestionRoutes = require("./api/routes/savedTemplateQuestion");
const categoryRoutes = require("./api/routes/category");
const selectedSectionQuestionRoutes = require("./api/routes/selectedSectionQuestion");
const selectedCategoryQuestionRoutes = require("./api/routes/selectedCategoryQuestion");
const filteredSectionQuestionRoutes = require("./api/routes/filteredSectionQuestion");
const createTemplateRoutes = require("./api/routes/createTemplate");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var cors = require("cors");
var session = require("express-session");

app.use(cors());
mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb://highplume:" +
      process.env.MONGO_ALTAS_PW +
      "localhost:27017/admin",
    {
      useMongoClient: true
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
const db = mongoose.connection;

app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const path = require(“path”);
app.use(express.static(path.join(__dirname, “client/build”)));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes);

app.use("/user", registerRoutes);
app.use("/userLogin", loginRoutes);
app.use("/customerLogin", customerRoutes);
app.use("/customerStartupQuestions", startupRoutes);
app.use("/customerBusinessQuestions", businessRoutes);
app.use("/customerFinancialQuestions", financialRoutes);
app.use("/addQuestions", questionsRoutes);
app.use("/createCategory", createCategoryRoutes);
app.use("/category", categoryRoutes);
app.use("/startupQuestions", startupQuestionsRoutes);
app.use("/businessQuestions", businessQuestionsRoutes);
app.use("/financialQuestions", financialQuestionsRoutes);
app.use("/savedStartupQuestions", savedStartupQuestionsRoutes);
app.use("/savedBusinessQuestions", savedBusinessQuestionsRoutes);
app.use("/savedFinancialQuestions", savedFinancialQuestionsRoutes);
app.use("/customerRegister", customerRegisterRoutes);
app.use("/individualInformation", individualInformationRoutes);
app.use("/savedIndividualInfo", savedIndividualInfoRoutes);
app.use("/liabilities", liabilitiesRoutes);
app.use("/asset", assetRoutes);
app.use("/savedAsset", savedAssetRoutes);
app.use("/savedLiabilities", savedLiabilitiesRoutes);
app.use("/annualIncome", annualIncomeRoutes);
app.use("/savedAnnualIncome", savedAnnualIncomeRoutes);
app.use("/annualExpenditures", annualExpendituresRoutes);
app.use("/savedAnnualExpenditures", savedAnnualExpendituresRoutes);
app.use("/contingentLiabilities", contingentLiabilitiesRoutes);
app.use("/savedContingentLiabilities", savedContingentLiabilitiesRoutes);
app.use("/createSection", createSectionRoutes);
app.use("/sectionTemplate", sectionTemplateRoutes);
app.use("/savedSectionQuestion", savedSectionQuestionRoutes);
app.use("/selectedSectionQuestion", selectedSectionQuestionRoutes);
app.use("/selectedCategoryQuestion", selectedCategoryQuestionRoutes);
app.use("/filteredSectionQuestion", filteredSectionQuestionRoutes);
app.use("/createTemplate", createTemplateRoutes);
app.use((req, res, next) => {
  const error = new Error("not Found in app.js line 46");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});
module.exports = app;
