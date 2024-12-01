import {
  Heading,
  Type,
  Mail,
  MapPin,
  Phone,
  Calendar,
  AlignLeft,
  Rows,
  List,
  CheckSquare,
  Square,
  Circle,
  Hash,
  Link,
  Upload,
  CreditCard,
  DollarSign,
  Percent,
  Star,
  FileText,
  LucideIcon,
} from "lucide-react";

interface DragOverlayProps {
  iconName: string;
  label: string;
}

const iconMap: Record<string, LucideIcon> = {
  heading: Heading,
  fullname: Type,
  email: Mail,
  address: MapPin,
  phone: Phone,
  date: Calendar,
  "short-text": Type,
  "long-text": AlignLeft,
  number: Hash,
  url: Link,
  file: Upload,
  "tab-control": Rows,
  dropdown: List,
  card: CreditCard,
  price: DollarSign,
  percentage: Percent,
  rating: Star,
  "rich-text": FileText,
  checkbox: CheckSquare,
  "checkbox-group": Square,
  radio: Circle,
  "radio-group": Circle,
};

export function DragOverlayContent({ label, iconName }: DragOverlayProps) {
  const Icon = iconMap[iconName];

  if (!Icon) return null;

  return (
    <>
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </>
  );
}
