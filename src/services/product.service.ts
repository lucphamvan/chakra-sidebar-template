import { API } from "config/api";
import http from "config/http";
import { isEmpty } from "lodash";
import { Product, ProductCreateInput, ProductUpdateInput } from "model/Product";
import { OrderBy, QueryParam } from "type";

class ProductService {
    public async getProducts(page: number, limit: number, orderBy?: OrderBy[], search?: string) {
        const params: QueryParam = { page, limit, search };

        if (!isEmpty(orderBy)) {
            params.orderBy = orderBy;
        } else {
            params.orderBy = [{ createdAt: "desc" }];
        }

        const response = await http.get(API.PRODUCT.PRODUCTS, {
            params
        });
        const items = response.data.items as Product[];
        items.forEach((item, index) => (item.no = page * limit + index + 1));
        return { items, count: response.data.count };
    }

    public async getProduct(id: string) {
        return http.get(API.PRODUCT.PRODUCTS + "/" + id);
    }

    public count() {
        return http.get(API.PRODUCT.PRODUCTS + "/count");
    }

    public async createProducts(data: ProductCreateInput) {
        return http.post(API.PRODUCT.PRODUCTS, data);
    }

    public async delete(product: Product) {
        return http.delete(API.PRODUCT.PRODUCTS + "/" + product.id);
    }

    public async generateProducts() {
        return http.post("/products/generate");
    }

    public async deleteAllProducts() {
        return http.delete("/products/delete-all");
    }

    public async updateProduct(id: string, data: ProductUpdateInput) {
        return http.put(API.PRODUCT.PRODUCTS + "/" + id, data);
    }
}
export default new ProductService();
