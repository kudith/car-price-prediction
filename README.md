# Car Price Prediction Project

Disclaimer: This project was developed as a Final Project for the Data Science course. It is intended for educational purposes only.

## Overview

This project provides an end-to-end solution for predicting car prices based on vehicle specifications. It utilizes a Linear Regression model trained on historical car sales data to provide estimated market values.

## Project Structure

The repository is organized into four main components:

- [colab/](https://colab.research.google.com/drive/1jW3XulM4pnXyzBEbwOdJeKih0gSjROee?usp=sharing): Contains the Jupyter Notebook used for Exploratory Data Analysis (EDA), feature engineering, and model training.
- dataset/: Contains the source data (Car_sales.xls) used for training the model.
- src/: The backend service built with FastAPI. This component loads the trained model and provides a RESTful API for predictions, featuring API key security and rate limiting.
- car-predict-app/: The frontend user interface built with Next.js and TypeScript. This application allows users to input car details and receive price estimates in a modern, responsive dashboard.

## Getting Started

To explore or run the project, please refer to the documentation in the subdirectories:

1. Data Science Workflow: See the [Google Colab Notebook](https://colab.research.google.com/drive/1jW3XulM4pnXyzBEbwOdJeKih0gSjROee?usp=sharing) for the model development process.
2. Backend API: See src/README.md for server setup and API documentation.
3. Frontend Application: See car-predict-app/README.md for web interface setup.

## Technical Stack

- Data Science: Python, Pandas, NumPy, Scikit-Learn, Joblib.
- Backend: FastAPI, Pydantic, SlowAPI.
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Shadcn/UI.
- Deployment: Docker, Docker Compose.
