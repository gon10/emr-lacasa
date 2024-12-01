"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ElementsPanel } from "@/components/elements-panel";
import { PropertiesPanel } from "@/components/properties-panel";
import { FormElementRenderer } from "@/components/form-elements";
import { FormPreviewModal } from "@/components/form-preview-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Droppable } from "@/components/droppable";
import { FormElement, FormData } from "../../../types/form-builder";

export default function FormBuilder() {
  const [formData, setFormData] = useState<FormData>({
    heading: "",
    subtitle: "",
    elements: [],
  });
  const [selectedElement, setSelectedElement] = useState<FormElement | null>(
    null
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: any) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && over.id === "form-area" && active.data.current) {
      const newElement: FormElement = {
        id: crypto.randomUUID(),
        type: active.data.current.type,
        label: active.data.current.label,
        required: false,
      };

      setFormData((prev) => ({
        ...prev,
        elements: [...prev.elements, newElement],
      }));
    }

    setActiveId(null);
  };

  const handleElementUpdate = (updatedElement: FormElement) => {
    setFormData((prev) => ({
      ...prev,
      elements: prev.elements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      ),
    }));
    setSelectedElement(updatedElement);
  };

  const handleElementDelete = (elementId: string) => {
    setFormData((prev) => ({
      ...prev,
      elements: prev.elements.filter((el) => el.id !== elementId),
    }));
    setSelectedElement(null);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="flex h-screen">
        <PropertiesPanel
          element={selectedElement}
          onUpdate={handleElementUpdate}
        />
        <div className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Form Creator</h1>
              <Button onClick={() => setShowPreview(true)}>
                Show form in modal
              </Button>
            </div>
            <Input
              value={formData.heading}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, heading: e.target.value }))
              }
              className="text-2xl"
              placeholder="Enter heading"
            />
            <Input
              value={formData.subtitle}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
              }
              placeholder="Enter form subtitle"
            />
            <Droppable id="form-area">
              <div className="space-y-4 min-h-[200px] border-2 border-dashed border-gray-300 p-4 rounded-md">
                {formData.elements.map((element) => (
                  <FormElementRenderer
                    key={element.id}
                    element={element}
                    onEdit={() => setSelectedElement(element)}
                    onDelete={() => handleElementDelete(element.id)}
                  />
                ))}
              </div>
            </Droppable>
          </div>
        </div>
        <ElementsPanel />
        <DragOverlay>
          {activeId ? (
            <div className="bg-white shadow-md rounded-md p-2 opacity-80">
              {activeId.replace("element-", "")}
            </div>
          ) : null}
        </DragOverlay>
      </div>
      <FormPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        formData={formData}
      />
    </DndContext>
  );
}
