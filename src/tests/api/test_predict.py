def test_predict_requires_api_key(client):
    response = client.post("/api/v1/predict", json={})

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid or missing API key."


def test_predict_success(client):
    payload = {
        "Manufacturer": "Toyota",
        "Vehicle_type": "Sedan",
        "Engine_size": 2.5,
        "Horsepower": 180,
        "Wheelbase": 109,
        "Width": 70,
        "Length": 184,
        "Curb_weight": 3200,
        "Fuel_capacity": 14,
        "Fuel_efficiency": 28,
    }

    response = client.post(
        "/api/v1/predict",
        json=payload,
        headers={"X-API-Key": "test-api-key"},
    )

    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["data"]["predicted_price"] == 19.07
    assert "explanation" in body["data"]
    assert "summary" in body["data"]["explanation"]
    assert "feature_contributions" in body["data"]["explanation"]


def test_predict_validation_error(client):
    payload = {
        "Manufacturer": "Toyota",
        "Vehicle_type": "Sedan",
        "Horsepower": 180,
        "Wheelbase": 109,
        "Width": 70,
        "Length": 184,
        "Curb_weight": 3200,
        "Fuel_capacity": 14,
        "Fuel_efficiency": 28,
    }

    response = client.post(
        "/api/v1/predict",
        json=payload,
        headers={"X-API-Key": "test-api-key"},
    )

    assert response.status_code == 400
    body = response.json()
    assert body["success"] is False
    assert body["message"] == "Bad request. Validation failed."
