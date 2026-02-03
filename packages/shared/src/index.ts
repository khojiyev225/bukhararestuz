export type UserRole = "ADMIN" | "MANAGER" | "COURIER" | "CLIENT";

export type OrderStatus = "NEW" | "PREPARING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

export type ReservationStatus = "PENDING" | "CONFIRMED" | "CANCELLED";

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isActive: boolean;
}

export interface OrderItem {
  menuItemId: number;
  quantity: number;
}
