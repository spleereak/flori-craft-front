import { DeliveryZoneType } from "@/src/pages/order/model/order.store";

export interface DeliveryZoneSelectProps {
  value: DeliveryZoneType;
  onChange: (value: DeliveryZoneType) => void;
  className?: string;
}
