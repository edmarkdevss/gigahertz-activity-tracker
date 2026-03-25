import { Check } from "lucide-react";
import { useState } from "react";

interface Ingredient {
  id: string;
  name: string;
  amount: string;
}

interface IngredientChecklistProps {
  ingredients: Ingredient[];
}

export function IngredientChecklist({ ingredients }: IngredientChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const completedCount = checkedItems.size;
  const totalCount = ingredients.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <span className="text-sm text-gray-500">
          {completedCount}/{totalCount} checked
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="bg-green-500 h-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="space-y-3">
        {ingredients.map((ingredient) => (
          <label
            key={ingredient.id}
            className="flex items-start gap-3 cursor-pointer group hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <div
              className={`flex items-center justify-center w-5 h-5 rounded border-2 mt-0.5 flex-shrink-0 transition-all ${
                checkedItems.has(ingredient.id)
                  ? "bg-green-500 border-green-500"
                  : "border-gray-300 group-hover:border-green-400"
              }`}
            >
              {checkedItems.has(ingredient.id) && (
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              )}
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={checkedItems.has(ingredient.id)}
              onChange={() => toggleItem(ingredient.id)}
            />
            <div className="flex-1">
              <span
                className={`block ${
                  checkedItems.has(ingredient.id)
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                <span className="font-medium">{ingredient.amount}</span> {ingredient.name}
              </span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
