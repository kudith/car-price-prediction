# Car Price Prediction API

A modular FastAPI service that provides car price estimates based on a trained machine learning model (Linear Regression). This service includes features like API key authentication, rate limiting, and comprehensive metadata endpoints.

## Features

- **Machine Learning Integration**: Serves a Linear Regression model exported as `car_price_model.pkl`.
- **Metadata Discovery**: Dynamic endpoints to retrieve supported manufacturers, vehicle types, and model technical details.
- **Security**: Endpoint protection using `X-API-Key` header validation.
- **Rate Limiting**: Integrated `slowapi` to prevent abuse (Default: 30 req/min, Predict: 10 req/min).
- **Comprehensive Documentation**: Interactive Swagger UI with detailed request/response examples.
- **Deployment Ready**: Includes `Dockerfile` and `docker-compose.yml` for containerized environments.

## Project Structure

```text
src/
├── app/
│   ├── api/             # API route definitions and dependencies
│   ├── core/            # Configuration, security, and rate limiting
│   ├── schemas/         # Pydantic models for validation
│   ├── services/        # Business logic and ML model management
│   └── main.py          # FastAPI application entry point
├── models/              # Trained ML model artifacts (.pkl)
├── tests/               # Unit, integration, and API tests
├── Dockerfile           # Docker image definition
└── docker-compose.yml   # Multi-container orchestration
```

## Getting Started

### Prerequisites

- Python 3.10+
- Docker (optional)

### Local Installation

1. **Clone the repository** and navigate to the `src` directory.
2. **Create a virtual environment**:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```
4. **Configure environment**:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your `API_KEY`.

### Running the Server

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`.

## API Endpoints

| Method | Path                    | Description                         | Auth    |
| :----- | :---------------------- | :---------------------------------- | :------ |
| `GET`  | `/`                     | Root status and documentation links | No      |
| `GET`  | `/api/v1/health`        | Service health check                | No      |
| `GET`  | `/api/v1/info`          | Detailed model metadata and metrics | No      |
| `GET`  | `/api/v1/manufacturers` | List of supported car manufacturers | No      |
| `GET`  | `/api/v1/vehicle-types` | List of supported vehicle types     | No      |
| `POST` | `/api/v1/predict`       | Generate car price prediction       | **Yes** |

## Authentication

Protected endpoints require the `X-API-Key` header.

```bash
curl -X POST http://localhost:8000/api/v1/predict \
  -H "X-API-Key: your_api_key_here" \
  -H "Content-Type: application/json" \
  -d '{
    "Manufacturer": "Toyota",
    "Vehicle_type": "Passenger",
    "Engine_size": 2.5,
    "Horsepower": 180,
    "Wheelbase": 109.0,
    "Width": 70.0,
    "Length": 184.0,
    "Curb_weight": 3.2,
    "Fuel_capacity": 14.0,
    "Fuel_efficiency": 28.0
  }'
```

## Docker Usage

### Build and Run

```bash
docker build -t car-price-api .
docker run --rm -p 8000:8000 --env-file .env car-price-api
```

### Docker Compose

```bash
docker-compose up --build
```

## Testing

Run the test suite using `pytest`:

```bash
pytest
```

To run with coverage:

```bash
pytest --cov=app tests/
```

## OpenAPI Documentation

Once the server is running, you can access the interactive documentation:

- **Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)
- **ReDoc**: [http://localhost:8000/redoc](http://localhost:8000/redoc)
