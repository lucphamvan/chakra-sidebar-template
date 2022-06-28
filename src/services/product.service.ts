import { API } from "config/api";
import http from "config/http";

class ProductService {
    public getProducts(page: number, limit: number) {
        const url = API.PRODUCT.PRODUCTS + `?page=${page}&limit=${limit}`;
        return http.get(url);
    }

    public count() {
        return http.get(API.PRODUCT.PRODUCTS + "/count");
    }
}
export default new ProductService();
