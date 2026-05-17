from fastapi.testclient import TestClient


def test_get_manufacturers(client: TestClient) -> None:
    response = client.get("/api/v1/manufacturers")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["manufacturers"], list)
    assert len(data["manufacturers"]) > 0
    assert "Toyota" in data["manufacturers"]


def test_get_vehicle_types(client: TestClient) -> None:
    response = client.get("/api/v1/vehicle-types")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert isinstance(data["vehicle_types"], list)
    assert len(data["vehicle_types"]) > 0
    assert "Car" in data["vehicle_types"]


def test_get_model_info(client: TestClient) -> None:
    response = client.get("/api/v1/info")
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert "data" in data
    model_info = data["data"]
    assert "name" in model_info
    assert "type" in model_info
    assert "version" in model_info
    assert "library_versions" in model_info
    assert "file_info" in model_info
    assert "features" in model_info
    assert "feature_importance" in model_info
    assert "parameters" in model_info
    assert "pipeline_steps" in model_info
    assert "manufacturers" in model_info
    assert "vehicle_types" in model_info
    assert isinstance(model_info["features"], list)
    assert len(model_info["features"]) == 10
