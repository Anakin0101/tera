export interface TariffCardProps {
  cardTypeName: string;
  commissionMnth?: string;
  commissionYr?: string;
  icon: string;
  status?: boolean;
  id?: string;
  pending?: boolean;
  noData?: boolean;
  applyOverlay?: boolean;
}
