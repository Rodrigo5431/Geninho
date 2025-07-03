import axios from "axios";

const API = "http://localhost:8080";

export const api = axios.create({
  baseURL: API,
});

export const changeCouponStatus = async (id, status) => {
  console.log(status, id);

  const response = await api.put(`/coupons/${id}`, { status });
  return response;
};

export const setToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

export const login = async (form) => {
   try {
    const response = await api.post(`/login`, {
        form
    });
    if (response.status === 200) {
        const token = response.headers["authorization"];
        localStorage.setItem("token", token);
    }
    return response;

  } catch (error) {
    console.error(error);
  }

};

export const getUserData = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const registerUser = async (form) => {

try {
  const response = await api.post("/users", form);
  return response;
  
} catch (error) {
  console.log(error);
}
};

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const postInvoice = async (form) => {
  const response = await api.post("/orders", form);
  return response;
};

export const updateProductQuantityById = async (id, quantidade) => {
  const response = await api.get(`/products/${id}`);
  response.data.estoque -= quantidade;
  await api.put(`/products/${id}`, response.data);
};

export const getOrders = async () => {
  const response = await api.get("/orders/me");

  return response.data;
};

export const getStatusRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};
export const updateStatusRestaurants = async (id, status) => {
  const response = await api.put(`/restaurants/${id}`, status);

  return response.data;
};

export const getOrderById = async (orderId) => {
  const response = await api.get(`/orders/${orderId}`);
  return response.data;
};

export const getTodayOrders = async () => {
  const date = new Date();

  let month = date.getMonth() + 1;

  if (month < 10) {
    month = `0${month}`;
  }

  let day = date.getDate() - 2;
  if (day < 10) {
    day = `0${day}`;
  }

  const yesterday = `${date.getFullYear()}-${month}-${day}`;

  const response = await api.get(`/orders/ordersAfter?paramDate=${yesterday}`);
  return response.data;
};

export const registerProduct = async (form) => {
  const formData = new FormData();
  const { file, ...formWithoutFile } = form;

  formData.append(
    "productInserirDTO",
    new Blob([JSON.stringify(formWithoutFile)], { type: "application/json" })
  );

  if (file) {
    formData.append("file", file);
  }

  const response = await api.post("/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

export const updateProduct = (id, form) => {
  const response = api.put(`/products/${id}`, form);
  return response;
};

export const deleteProduct = (id) => {
  const response = api.delete(`/products/${id}`);
  return response;
};

export const updateOrderStatus = async (orderId, orderStatus) => {
  const response = await api.put(`/orders/${orderId}`, {
    orderStatus,
  });
  return response;
};

export const cancelOrder = async (orderId) => {
  const response = await api.put(`/orders/${orderId}`, {
    orderStatus: "CANCELADO",
  });
  return response;
};

export const updateOrderPriority = async (orderId, priority) => {
  const response = await api.put(`/orders/${orderId}`, {
    priority,
  });
  return response;
};

export const getOrdersInBetweenDates = async (beginDate, endDate) => {
  const response = await api.get(
    `/orders/bydate?startDate=${beginDate}&endDate=${endDate}`
  );
  return response;
};

export const registerCoupon = async (form) => {
  const response = await api.post("/coupons", form);
  return response;
};

export const getAllCoupons = async () => {
  const response = await api.get("/coupons");
  return response;
};

export const getCouponByCode = async (coupon, client) => {
  if (!client.name || !client.phone) {
    const response = await api.post(`/coupons/is-valid`, {
      code: coupon,
    });
    return response;
  }
  const response = await api.post(`/coupons/is-valid`, {
    code: coupon,
    client,
  });
  return response;
};

export const deleteCoupon = async (id) => {
  const response = await api.delete(`/coupons/${id}`);
  return response;
};
