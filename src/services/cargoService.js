import http from "../http-common";

class CargoDataService {
  
  calculate(data) {
    return http.post("/cargo", data);
  }
}

export default new CargoDataService();