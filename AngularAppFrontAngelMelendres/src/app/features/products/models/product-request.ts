export interface CreateProductRequest {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}

export interface UpdateProductRequest {
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
