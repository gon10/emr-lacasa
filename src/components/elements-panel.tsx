"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
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
  MoreVertical,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const elements = [
  { type: "heading", icon: Heading, label: "Heading" },
  { type: "fullname", icon: Type, label: "Full name" },
  { type: "email", icon: Mail, label: "Email" },
  { type: "address", icon: MapPin, label: "Address" },
  { type: "phone", icon: Phone, label: "Phone" },
  { type: "date", icon: Calendar, label: "Date picker" },
];

const basicElements = [
  { type: "short-text", icon: Type, label: "Short text" },
  { type: "long-text", icon: AlignLeft, label: "Long text" },
  { type: "number", icon: Hash, label: "Number" },
  { type: "url", icon: Link, label: "URL" },
  { type: "file", icon: Upload, label: "File upload" },
  { type: "tab-control", icon: Rows, label: "Tab control" },
  { type: "dropdown", icon: List, label: "Dropdown" },
  { type: "card", icon: CreditCard, label: "Credit card" },
  { type: "price", icon: DollarSign, label: "Price" },
  { type: "percentage", icon: Percent, label: "Percentage" },
  { type: "rating", icon: Star, label: "Rating" },
  { type: "rich-text", icon: FileText, label: "Rich text" },
];

interface DraggableElementProps {
  type: string;
  icon: LucideIcon;
  label: string;
}

function DraggableElement({ type, icon: Icon, label }: DraggableElementProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `element-${type}`,
    data: {
      type,
      label,
      iconName: Icon.name,
    },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center justify-between rounded-md bg-accent/40 p-2 text-sm",
        isDragging && "opacity-50"
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      <Button variant="ghost" size="icon" className="h-6 w-6">
        <MoreVertical className="h-4 w-4" />
      </Button>
    </div>
  );
}

export function ElementsPanel() {
  return (
    <div className="w-[300px] border-l p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold">Elements</h3>
      </div>
      <div className="space-y-6">
        <div className="space-y-2">
          {elements.map((element) => (
            <DraggableElement key={element.type} {...element} />
          ))}
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Basic elements</h4>
          <div className="space-y-2">
            {basicElements.map((element) => (
              <DraggableElement key={element.type} {...element} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Buttons</h4>
          <div className="mb-2 flex gap-2">
            <Button size="sm" variant="default">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="outline">
              Tertiary
            </Button>
          </div>
          <div className="space-y-2">
            <DraggableElement
              type="checkbox"
              icon={CheckSquare}
              label="Checkbox"
            />
            <DraggableElement
              type="checkbox-group"
              icon={Square}
              label="Checkbox group"
            />
            <DraggableElement type="radio" icon={Circle} label="Radio" />
            <DraggableElement
              type="radio-group"
              icon={Circle}
              label="Radio group"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
