export interface Service {
  id: number;
  name: string;
  icon: React.ReactNode;
  screen?: any;
}

export interface ServiceItemProps {
  onPress: () => void;
  item: any;
}
