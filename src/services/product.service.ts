import { API } from "config/api";
import http from "config/http";
import { Product } from "model/Product";
import { OrderBy, QueryParam } from "type";

class ProductService {
    public async getProducts(page: number, limit: number, orderBy?: OrderBy[]) {
        const params: QueryParam = { page, limit };
        if (orderBy) {
            params.orderBy = orderBy;
        }
        const response = await http.get(API.PRODUCT.PRODUCTS, {
            params
        });
        const items = response.data.items as Product[];
        items.forEach((item, index) => (item.no = page * limit + index + 1));
        return { items, count: response.data.count };
    }

    public count() {
        return http.get(API.PRODUCT.PRODUCTS + "/count");
    }
}
export default new ProductService();
