export interface TariffCardProps {
  cardTypeName: string;
  commissionMnth?: number;
  commissionYr?: number;
  icon: string;
  status?: boolean;
  id?: string;
  pending?: boolean;
  noData?: boolean;
  applyOverlay?: boolean;
  onPress?: () => void;
}
