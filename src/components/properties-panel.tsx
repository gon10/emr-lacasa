import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormElement, FormElementOption } from "../../types/form-builder";

interface PropertiesPanelProps {
  element: FormElement | null;
  onUpdate: (element: FormElement) => void;
}

export function PropertiesPanel({ element, onUpdate }: PropertiesPanelProps) {
  if (!element) {
    return (
      <div className="w-[300px] border-r p-4">
        <p className="text-center text-muted-foreground">
          Select an element to edit its properties
        </p>
      </div>
    );
  }

  const handleAddOption = () => {
    const newOption: FormElementOption = {
      id: crypto.randomUUID(),
      label: `Option ${(element.options?.length || 0) + 1}`,
      value: `option-${(element.options?.length || 0) + 1}`,
    };

    onUpdate({
      ...element,
      options: [...(element.options || []), newOption],
    });
  };

  const handleUpdateOption = (optionId: string, label: string) => {
    onUpdate({
      ...element,
      options: element.options?.map((opt) =>
        opt.id === optionId
          ? { ...opt, label, value: label.toLowerCase().replace(/\s+/g, "-") }
          : opt
      ),
    });
  };

  const handleDeleteOption = (optionId: string) => {
    onUpdate({
      ...element,
      options: element.options?.filter((opt) => opt.id !== optionId),
    });
  };

  return (
    <div className="w-[300px] border-r p-4">
      <h3 className="mb-4 font-semibold">{element.type} properties</h3>
      <Tabs defaultValue="general">
        <TabsList className="w-full">
          <TabsTrigger value="general" className="flex-1">
            General
          </TabsTrigger>
          <TabsTrigger value="options" className="flex-1">
            Options
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex-1">
            Advanced
          </TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="space-y-4">
          <div className="space-y-2">
            <Label>Field label</Label>
            <Input
              value={element.label}
              onChange={(e) => onUpdate({ ...element, label: e.target.value })}
              placeholder="Type a label"
            />
          </div>
          <div className="space-y-2">
            <Label>Sublabel</Label>
            <Input
              value={element.sublabel}
              onChange={(e) =>
                onUpdate({ ...element, sublabel: e.target.value })
              }
              placeholder="Type a sublabel"
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Required</Label>
            <Switch
              checked={element.required}
              onCheckedChange={(checked) =>
                onUpdate({ ...element, required: checked })
              }
            />
          </div>
        </TabsContent>
        <TabsContent value="options" className="space-y-4">
          {(element.type === "dropdown" ||
            element.type === "radio-group" ||
            element.type === "checkbox-group") && (
            <>
              <div className="space-y-2">
                <Label>Width</Label>
                <div className="flex gap-2">
                  <Button
                    variant={
                      element.width === "fixed" ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => onUpdate({ ...element, width: "fixed" })}
                  >
                    Fixed
                  </Button>
                  <Button
                    variant={element.width === "auto" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => onUpdate({ ...element, width: "auto" })}
                  >
                    Auto
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Options</Label>
                <div className="space-y-2">
                  {element.options?.map((option) => (
                    <div key={option.id} className="flex gap-2">
                      <Input
                        value={option.label}
                        onChange={(e) =>
                          handleUpdateOption(option.id, e.target.value)
                        }
                        placeholder="Option label"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteOption(option.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleAddOption}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Option
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Predefined options</Label>
                <Select
                  value={element.predefinedOptions}
                  onValueChange={(value) =>
                    onUpdate({ ...element, predefinedOptions: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="countries">Countries</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="currencies">Currencies</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Default value</Label>
                <Select
                  value={element.defaultValue}
                  onValueChange={(value) =>
                    onUpdate({ ...element, defaultValue: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="None" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {element.options?.map((option) => (
                      <SelectItem key={option.id} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <Label>Show text in empty option</Label>
                <Switch
                  checked={element.showEmptyOption}
                  onCheckedChange={(checked) =>
                    onUpdate({ ...element, showEmptyOption: checked })
                  }
                />
              </div>
            </>
          )}
        </TabsContent>
        <TabsContent value="advanced" className="space-y-4">
          <div className="space-y-2">
            <Label>Validation</Label>
            {element.type === "email" && (
              <div className="text-sm text-muted-foreground">
                Email validation is automatically applied
              </div>
            )}
            {(element.type === "short-text" ||
              element.type === "long-text") && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label>Min length</Label>
                    <Input
                      type="number"
                      value={element.validation?.minLength || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...element,
                          validation: {
                            ...element.validation,
                            minLength: parseInt(e.target.value) || undefined,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Max length</Label>
                    <Input
                      type="number"
                      value={element.validation?.maxLength || ""}
                      onChange={(e) =>
                        onUpdate({
                          ...element,
                          validation: {
                            ...element.validation,
                            maxLength: parseInt(e.target.value) || undefined,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </>
            )}
            {element.type === "number" && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-2">
                  <Label>Min value</Label>
                  <Input
                    type="number"
                    value={element.validation?.min || ""}
                    onChange={(e) =>
                      onUpdate({
                        ...element,
                        validation: {
                          ...element.validation,
                          min: parseInt(e.target.value) || undefined,
                        },
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Max value</Label>
                  <Input
                    type="number"
                    value={element.validation?.max || ""}
                    onChange={(e) =>
                      onUpdate({
                        ...element,
                        validation: {
                          ...element.validation,
                          max: parseInt(e.target.value) || undefined,
                        },
                      })
                    }
                  />
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
