import { API } from "config/api";
import http from "config/http";
import { OrderBy, QueryParam } from "type";

class ProductService {
    public getProducts(page: number, limit: number, orderBy?: OrderBy[]) {
        const params: QueryParam = { page, limit };
        if (orderBy) {
            params.orderBy = orderBy;
        }
        return http.get(API.PRODUCT.PRODUCTS, {
            params,
        });
    }

    public count() {
        return http.get(API.PRODUCT.PRODUCTS + "/count");
    }
}
export default new ProductService();
