import { Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { FormElement } from "../../types/form-builder";

interface FormElementProps {
  element: FormElement;
  onEdit: () => void;
  onDelete: () => void;
}

export function FormElementRenderer({
  element,
  onEdit,
  onDelete,
}: FormElementProps) {
  const renderElement = () => {
    switch (element.type) {
      case "heading":
        return <h2 className="text-2xl font-bold">{element.label}</h2>;
      case "fullname":
      case "email":
      case "address":
      case "phone":
      case "short-text":
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Input placeholder={`Enter ${element.label.toLowerCase()}`} />
          </div>
        );
      case "long-text":
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Textarea placeholder={`Enter ${element.label.toLowerCase()}`} />
          </div>
        );
      case "date":
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <Input type="date" />
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
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
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
              <div className="flex items-center space-x-2">
                <Checkbox id={`${element.id}-1`} />
                <Label htmlFor={`${element.id}-1`}>Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id={`${element.id}-2`} />
                <Label htmlFor={`${element.id}-2`}>Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id={`${element.id}-3`} />
                <Label htmlFor={`${element.id}-3`}>Option 3</Label>
              </div>
            </div>
          </div>
        );
      case "radio":
      case "radio-group":
        return (
          <div className="space-y-2">
            <Label>{element.label}</Label>
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id={`${element.id}-1`} />
                <Label htmlFor={`${element.id}-1`}>Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id={`${element.id}-2`} />
                <Label htmlFor={`${element.id}-2`}>Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id={`${element.id}-3`} />
                <Label htmlFor={`${element.id}-3`}>Option 3</Label>
              </div>
            </RadioGroup>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative rounded-md border p-4 hover:bg-accent">
      {renderElement()}
      <div className="absolute right-2 top-2 flex gap-1">
        <Button variant="ghost" size="icon" onClick={onEdit}>
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
