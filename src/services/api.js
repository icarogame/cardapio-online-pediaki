
import * as auth from './api/auth';
import * as products from './api/products';
import * as orders from './api/orders';
import * as users from './api/users';
import * as company from './api/company';
import * as customers from './api/customers';

export {
  auth,
  products,
  orders,
  users,
  company,
  customers
};

// Re-exporting all functions for backward compatibility if needed,
// but encouraging direct use of modular imports.
export const {
  checkSlugAvailability,
  signup,
} = auth;

export const {
  getMenuItems,
  createProduct,
  updateProduct,
  deleteProduct,
} = products;

export const {
  createOrder,
  getOrders,
  updateOrderStatus,
} = orders;

export const {
  createUser
} = users;

export const {
  getCompanySettings,
  updateCompanySettings,
} = company;

export const {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} = customers;
