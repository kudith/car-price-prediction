/**
 * Static website configuration.
 * All static content, URLs, and metadata are centralized here.
 */

export const SITE_CONFIG = {
  name: "CarPredict",
  tagline: "Data-Driven Vehicle Valuation",
  description:
    "A vehicle price prediction system developed as a Final Project for the Data Science course, leveraging Linear Regression and CRISP-DM.",
  author: "Data Science - Final Project",
  url: "/",
} as const

export const MODEL_METRICS = {
  totalData: 155,
  modelingData: 155,
  totalFeatures: 10,
  model: "Linear Regression",
  rmse: 6.692,
  r2Score: 0.792,
  topSellingCar: "Ford F-Series",
  topSellingValue: 540.561,
} as const

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Predict", href: "/predict" },
] as const

export const DATASET_HIGHLIGHTS = [
  {
    label: "Total Records",
    value: "155",
    unit: "rows",
    description: "Total number of vehicle samples within the dataset",
    icon: "database",
  },
  {
    label: "Feature Count",
    value: "10",
    unit: "columns",
    description: "Available vehicle specification attributes",
    icon: "layers",
  },
  {
    label: "Model RMSE",
    value: "6.692",
    unit: "k USD",
    description: "Root Mean Square Error of the predictive model",
    icon: "target",
  },
  {
    label: "R² Score",
    value: "0.792",
    unit: "",
    description: "Model accounts for 79.2% of vehicle price variance",
    icon: "trending-up",
  },
] as const

export const INSIGHT_CARDS = [
  {
    title: "Top-Selling Vehicle",
    value: "Ford F-Series",
    meta: "540,561 units sold",
    description:
      "The Ford F-Series dominates the market with the highest sales volume across the entire dataset.",
    icon: "trophy",
  },
  {
    title: "Predictive Model",
    value: "Linear Regression",
    meta: "Scikit-learn",
    description:
      "A linear regression model trained on 80% of the data and evaluated against a 20% validation split.",
    icon: "brain",
  },
  {
    title: "Analytical Framework",
    value: "CRISP-DM",
    meta: "6-Stage Methodology",
    description:
      "The analysis strictly follows the CRISP-DM framework, spanning from business understanding to model evaluation.",
    icon: "workflow",
  },
] as const
