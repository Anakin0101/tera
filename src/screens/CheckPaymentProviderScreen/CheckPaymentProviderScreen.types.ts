// Define the type for each item in the array
export interface SubscriberFieldValue {
  id: number;
  value: string;
  key?: string;
}

// Define the type for the array
export type SubscriberFieldsValue = Array<SubscriberFieldValue>;
