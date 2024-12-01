import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormElement, FormData } from "../../types/form-builder";

interface FormPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: FormData;
}

function PreviewElement({ element }: { element: FormElement }) {
  switch (element.type) {
    case "heading":
      return <h2 className="text-2xl font-bold">{element.label}</h2>;
    case "fullname":
    case "email":
    case "address":
    case "phone":
    case "short-text":
    case "number":
    case "url":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <Input
            type={element.type === "number" ? "number" : "text"}
            placeholder={`Enter ${element.label.toLowerCase()}`}
          />
          {element.sublabel && (
            <p className="text-sm text-muted-foreground">{element.sublabel}</p>
          )}
        </div>
      );
    case "long-text":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <Textarea placeholder={`Enter ${element.label.toLowerCase()}`} />
          {element.sublabel && (
            <p className="text-sm text-muted-foreground">{element.sublabel}</p>
          )}
        </div>
      );
    case "date":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <Input type="date" />
          {element.sublabel && (
            <p className="text-sm text-muted-foreground">{element.sublabel}</p>
          )}
        </div>
      );
    case "dropdown":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {element.options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {element.sublabel && (
            <p className="text-sm text-muted-foreground">{element.sublabel}</p>
          )}
        </div>
      );
    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox id={element.id} />
          <Label htmlFor={element.id}>{element.label}</Label>
        </div>
      );
    case "checkbox-group":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <div className="space-y-2">
            {element.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
      );
    case "radio":
    case "radio-group":
      return (
        <div className="space-y-2">
          <Label>{element.label}</Label>
          <RadioGroup>
            {element.options?.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={option.id} />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      );
    default:
      return null;
  }
}

export function FormPreviewModal({
  isOpen,
  onClose,
  formData,
}: FormPreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{formData.heading || "Form Preview"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {formData.subtitle && (
            <p className="text-sm text-muted-foreground">{formData.subtitle}</p>
          )}
          {formData.elements.map((element) => (
            <PreviewElement key={element.id} element={element} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
