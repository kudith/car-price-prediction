# CarPredict — Data-Driven Vehicle Valuation

CarPredict is a high-fidelity vehicle price prediction system developed as a Final Project for the Data Science course. The application leverages a multivariate Linear Regression model trained on historical car sales data to provide accurate, real-time market valuations.

---

## Key Features

- **Searchable Manufacturer Selection**: Effortlessly filter through 30+ automotive brands with an intuitive, real-time search interface.
- **Smart Numerical Inputs**: Interactive sliders and inputs with built-in validation ranges for Engine Size, Horsepower, Fuel Efficiency, and more.
- **Detailed Valuation Analysis**:
  - **Estimated Market Value**: Precise price predictions in thousands of USD.
  - **Confidence Intervals**: Statistical range of accuracy for every prediction.
  - **AI-Driven Insights**: Contextual summaries of why a specific price was generated.
  - **Feature Impact Analysis**: Visual breakdown of which vehicle attributes most influenced the final price.
  - **Market Benchmarks**: Comparison with similar vehicles identified in the historical dataset.
- **Modern Aesthetic**: A minimalist, high-end "Art Gallery" inspired UI built with Next.js, Tailwind CSS, and Framer Motion.
- **Real-time Model Info**: Dynamic "About" page fetching live technical data, feature importance, and environment versions from the model API.

## Tech Stack

### Frontend

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Form Handling**: React Hook Form + Zod

### Backend (Model API)

- **Engine**: Python
- **Model**: Scikit-learn (Linear Regression)
- **Data Processing**: Pandas
- **Serialization**: Joblib

---

## Methodology (CRISP-DM)

The development of this project strictly adhered to the CRISP-DM (Cross-Industry Standard Process for Data Mining) framework:

1. **Business Understanding**: Defining the goal of providing accurate used-car market valuations.
2. **Data Understanding**: Profiling the Car Sales dataset and identifying key price-influencing features.
3. **Data Preparation**: Cleaning, feature selection, and partitioning the dataset (80% Training, 20% Testing).
4. **Modeling**: Fitting a multivariate Linear Regression pipeline using Scikit-learn.
5. **Evaluation**: Validating performance using RMSE (6.692) and R² Score (0.792).
6. **Deployment**: Integrating the trained model into this interactive web interface via a REST API.

---

## Getting Started

### Prerequisites

- Node.js 20+
- Bun (optional, but recommended)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adty/car-predict-app.git
   cd car-predict-app
   ```

2. Install dependencies:

   ```bash
   bun install
   # or
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=your_api_url
   NEXT_PUBLIC_API_KEY=your_api_key
   ```

4. Run the development server:
   ```bash
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Author

Created by Ginanjar Aditiya Prianata as part of the Data Science Final Project.

[GitHub Profile](https://github.com/kudith)

---

## License

This project is licensed under the MIT License.
