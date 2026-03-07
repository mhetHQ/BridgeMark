"use client";

import { useState, useCallback } from "react";
import { useApplication } from "@/lib/context/ApplicationContext";
import {
  budgetOptions,
  pricingModelOptions,
} from "@/lib/validators/agencySchema";

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[] | { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  error?: string;
}

function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select...",
  required,
  error,
}: FormSelectProps) {
  const isObjectOptions = options.length > 0 && typeof options[0] === "object";

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-white/[0.03] border  px-4 py-3 text-white focus:outline-none focus:ring-1 transition-all cursor-pointer ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/[0.06] focus:border-primary/50 focus:ring-primary/50"
        } ${!value ? "text-gray-500" : ""}`}
      >
        <option value="" className="bg-[#0a0a0a]">
          {placeholder}
        </option>
        {isObjectOptions
          ? (options as { value: string; label: string }[]).map((option) => (
              <option key={option.value} value={option.value} className="bg-[#0a0a0a] text-white">
                {option.label}
              </option>
            ))
          : (options as string[]).map((option) => (
              <option key={option} value={option} className="bg-[#0a0a0a] text-white">
                {option}
              </option>
            ))}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  maxLength?: number;
  rows?: number;
}

function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`w-full bg-white/[0.03] border  px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all resize-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/[0.06] focus:border-primary/50 focus:ring-primary/50"
        }`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value?.length || 0}/{maxLength}
        </p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-white/[0.03] border  px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/[0.06] focus:border-primary/50 focus:ring-primary/50"
        }`}
      />
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

const pricingModelInfo: Record<string, { description: string; fields: string[] }> = {
  project: {
    description: "Charge a fixed fee per project based on scope and deliverables",
    fields: ["projectRange"],
  },
  retainer: {
    description: "Monthly recurring fee for ongoing services and support",
    fields: ["retainerRange"],
  },
  hourly: {
    description: "Bill clients based on hours worked at a specified rate",
    fields: ["hourlyRate"],
  },
  performance: {
    description: "Compensation tied to results and performance metrics",
    fields: ["customPricing"],
  },
  hybrid: {
    description: "Combination of different pricing models based on client needs",
    fields: ["customPricing"],
  },
};

export function PricingStep() {
  const { formData, updatePricing, setCurrentStep, validateStep } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const data = formData.pricing;

  const handleChange = useCallback(
    (field: string, value: string) => {
      updatePricing({ [field]: value });
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [updatePricing, errors]
  );

  const handleNext = () => {
    const validation = validateStep(3);
    if (validation.valid) {
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(validation.errors);
    }
  };

  const handleBack = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedModelInfo = data.pricingModel ? pricingModelInfo[data.pricingModel] : null;

  return (
    <div className="border border-white/[0.06] p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Pricing</h2>
        <p className="text-gray-400">Set your pricing structure and budget expectations.</p>
      </div>

      <div className="space-y-8">
        {/* Budget Range */}
        <div className="p-6 bg-white/[0.02]  border border-white/[0.06]">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-primary"
            >
              <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
              <path
                fillRule="evenodd"
                d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z"
                clipRule="evenodd"
              />
            </svg>
            Project Budget Range
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            What&apos;s the typical budget range for projects you work on?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormSelect
              label="Minimum Budget"
              name="minBudget"
              value={data.minBudget}
              onChange={(v) => handleChange("minBudget", v)}
              options={budgetOptions}
              placeholder="Select minimum"
              required
              error={errors.minBudget}
            />
            <FormSelect
              label="Maximum Budget"
              name="maxBudget"
              value={data.maxBudget || ""}
              onChange={(v) => handleChange("maxBudget", v)}
              options={budgetOptions}
              placeholder="Select maximum (optional)"
            />
          </div>
        </div>

        {/* Pricing Model */}
        <div className="space-y-4">
          <FormSelect
            label="Pricing Model"
            name="pricingModel"
            value={data.pricingModel}
            onChange={(v) => handleChange("pricingModel", v)}
            options={pricingModelOptions}
            placeholder="Select pricing model"
            required
            error={errors.pricingModel}
          />

          {selectedModelInfo && (
            <div className="p-4 bg-white/[0.03]  border border-white/[0.06]">
              <p className="text-gray-400 text-sm mb-4">{selectedModelInfo.description}</p>

              {selectedModelInfo.fields.includes("hourlyRate") && (
                <FormInput
                  label="Hourly Rate"
                  name="hourlyRate"
                  value={data.hourlyRate || ""}
                  onChange={(v) => handleChange("hourlyRate", v)}
                  placeholder="e.g., $150 - $300/hour"
                  error={errors.hourlyRate}
                />
              )}

              {selectedModelInfo.fields.includes("retainerRange") && (
                <FormInput
                  label="Monthly Retainer Range"
                  name="retainerRange"
                  value={data.retainerRange || ""}
                  onChange={(v) => handleChange("retainerRange", v)}
                  placeholder="e.g., $5,000 - $20,000/month"
                  error={errors.retainerRange}
                />
              )}

              {selectedModelInfo.fields.includes("projectRange") && (
                <FormInput
                  label="Typical Project Range"
                  name="projectRange"
                  value={data.projectRange || ""}
                  onChange={(v) => handleChange("projectRange", v)}
                  placeholder="e.g., $10,000 - $50,000 per project"
                  error={errors.projectRange}
                />
              )}

              {selectedModelInfo.fields.includes("customPricing") && (
                <FormTextarea
                  label="Pricing Details"
                  name="customPricing"
                  value={data.customPricing || ""}
                  onChange={(v) => handleChange("customPricing", v)}
                  placeholder="Describe your pricing structure, including any performance metrics, success fees, or other relevant details..."
                  maxLength={500}
                  rows={3}
                  error={errors.customPricing}
                />
              )}
            </div>
          )}
        </div>

        {/* Custom Notes */}
        <FormTextarea
          label="Additional Pricing Notes"
          name="customPricing"
          value={data.customPricing || ""}
          onChange={(v) => handleChange("customPricing", v)}
          placeholder="Any additional information about your pricing, payment terms, or flexibility..."
          maxLength={500}
          rows={3}
        />

        {/* Pricing Summary */}
        {data.minBudget && data.pricingModel && (
          <div className="p-6 bg-white/[0.02]  border border-white/[0.06]">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Pricing Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Minimum Project Budget</span>
                <span className="text-white font-bold">{data.minBudget}+</span>
              </div>
              {data.maxBudget && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Maximum Project Budget</span>
                  <span className="text-white font-bold">{data.maxBudget}</span>
                </div>
              )}
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Pricing Model</span>
                <span className="text-primary font-semibold">
                  {pricingModelOptions.find((p) => p.value === data.pricingModel)?.label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6 border-t border-white/[0.06]">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-2 rounded-full px-6 py-3 bg-white/[0.03] text-white font-semibold  hover:bg-white/[0.06] transition-all border border-white/[0.06]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"
                clipRule="evenodd"
              />
            </svg>
            Back
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 rounded-full px-8 py-4 bg-white text-black font-semibold hover:bg-gray-200 transition-all"
          >
            Continue to Payment
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}




