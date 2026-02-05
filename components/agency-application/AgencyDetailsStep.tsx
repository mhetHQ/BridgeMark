"use client";

import { useState, useCallback } from "react";
import { useApplication } from "@/lib/context/ApplicationContext";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  categoryOptions,
  industryOptions,
  locationOptions,
  teamSizeOptions,
} from "@/lib/validators/agencySchema";

interface FormInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
}

function FormInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  error,
  maxLength,
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white dark:text-white light:text-gray-900">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full bg-white/5 dark:bg-white/5 light:bg-black/5 border rounded-xl px-4 py-3 text-white dark:text-white light:text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/10 dark:border-white/10 light:border-black/10 focus:border-primary/50 focus:ring-primary/50"
        }`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength}
        </p>
      )}
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
  required?: boolean;
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
  required,
  error,
  maxLength,
  rows = 4,
}: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white dark:text-white light:text-gray-900">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={`w-full bg-white/5 dark:bg-white/5 light:bg-black/5 border rounded-lg px-4 py-3 text-white dark:text-white light:text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-1 transition-all resize-none ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/10 dark:border-white/10 light:border-black/10 focus:border-primary/50 focus:ring-primary/50"
        }`}
      />
      {maxLength && (
        <p className="text-xs text-gray-500 text-right">
          {value.length}/{maxLength}
        </p>
      )}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
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
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-semibold text-white dark:text-white light:text-gray-900">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none bg-white/5 dark:bg-white/5 light:bg-black/5 border rounded-xl px-4 py-3 text-white dark:text-white light:text-gray-900 focus:outline-none focus:ring-1 transition-all cursor-pointer ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/50"
            : "border-white/10 dark:border-white/10 light:border-black/10 focus:border-primary/50 focus:ring-primary/50"
        } ${!value ? "text-gray-500" : ""}`}
      >
        <option value="" className="bg-black dark:bg-black light:bg-white">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-black dark:bg-black light:bg-white text-white dark:text-white light:text-gray-900">
            {option}
          </option>
        ))}
      </select>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface MultiSelectProps {
  label: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  maxItems?: number;
  required?: boolean;
  error?: string;
}

function MultiSelect({
  label,
  options,
  selected,
  onChange,
  maxItems = 6,
  required,
  error,
}: MultiSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else if (selected.length < maxItems) {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-white dark:text-white light:text-gray-900">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
        <span className="text-gray-500 font-normal ml-2">
          ({selected.length}/{maxItems})
        </span>
      </label>
      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggleOption(option)}
              disabled={!isSelected && selected.length >= maxItems}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary text-black"
                  : "bg-white/5 dark:bg-white/5 light:bg-black/5 text-gray-300 dark:text-gray-300 light:text-gray-600 border border-white/10 dark:border-white/10 light:border-black/10 hover:bg-white/10 dark:hover:bg-white/10 light:hover:bg-black/10 hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface ImageUploadProps {
  label: string;
  endpoint: "agencyLogo" | "agencyCover";
  value?: string;
  onChange: (url: string) => void;
}

function ImageUpload({ label, endpoint, value, onChange }: ImageUploadProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-white dark:text-white light:text-gray-900">{label}</label>
      {value ? (
        <div className="relative group">
          <img
            src={value}
            alt={label}
            className={`rounded-xl object-cover border border-white/10 ${
              endpoint === "agencyLogo" ? "w-24 h-24" : "w-full h-40"
            }`}
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      ) : (
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res?.[0]) {
              onChange(res[0].ufsUrl);
            }
          }}
          onUploadError={(error: Error) => {
            console.error("Upload error:", error);
          }}
          className="ut-button:bg-primary ut-button:text-black ut-button:hover:bg-primary/90 ut-label:text-gray-400 ut-allowed-content:text-gray-500 border-white/10 bg-white/5"
        />
      )}
    </div>
  );
}

export function AgencyDetailsStep() {
  const { formData, updateAgencyDetails, setCurrentStep, validateStep } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const data = formData.agencyDetails;

  const handleChange = useCallback(
    (field: string, value: string | string[]) => {
      updateAgencyDetails({ [field]: value });
      // Clear error when field is updated
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [updateAgencyDetails, errors]
  );

  const handleNext = () => {
    const validation = validateStep(1);
    if (validation.valid) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(validation.errors);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Agency Details</h2>
        <p className="text-gray-400">Tell us about your agency and what makes you unique.</p>
      </div>

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Agency Name"
            name="name"
            value={data.name}
            onChange={(v) => handleChange("name", v)}
            placeholder="e.g., Neon Strategies"
            required
            error={errors.name}
            maxLength={100}
          />
          <FormInput
            label="Email Address"
            name="email"
            type="email"
            value={data.email}
            onChange={(v) => handleChange("email", v)}
            placeholder="hello@agency.com"
            required
            error={errors.email}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            value={data.phone || ""}
            onChange={(v) => handleChange("phone", v)}
            placeholder="+1 (555) 000-0000"
          />
          <FormInput
            label="Website"
            name="website"
            type="url"
            value={data.website || ""}
            onChange={(v) => handleChange("website", v)}
            placeholder="https://agency.com"
          />
        </div>

        {/* Tagline */}
        <FormInput
          label="Tagline"
          name="description"
          value={data.description}
          onChange={(v) => handleChange("description", v)}
          placeholder="e.g., Specializing in Web3 Marketing"
          required
          error={errors.description}
          maxLength={150}
        />

        {/* About */}
        <FormTextarea
          label="About Your Agency"
          name="longDescription"
          value={data.longDescription}
          onChange={(v) => handleChange("longDescription", v)}
          placeholder="Tell potential clients about your agency, your mission, and what sets you apart..."
          required
          error={errors.longDescription}
          maxLength={2000}
          rows={6}
        />

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUpload
            label="Agency Logo"
            endpoint="agencyLogo"
            value={data.logo}
            onChange={(url) => handleChange("logo", url)}
          />
          <ImageUpload
            label="Cover Image"
            endpoint="agencyCover"
            value={data.coverImage}
            onChange={(url) => handleChange("coverImage", url)}
          />
        </div>

        {/* Location & Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Location"
            name="location"
            value={data.location}
            onChange={(v) => handleChange("location", v)}
            options={locationOptions}
            placeholder="Select location"
            required
            error={errors.location}
          />
          <FormInput
            label="Year Founded"
            name="founded"
            value={data.founded}
            onChange={(v) => handleChange("founded", v)}
            placeholder="e.g., 2020"
            required
            error={errors.founded}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormSelect
            label="Team Size"
            name="teamSize"
            value={data.teamSize}
            onChange={(v) => handleChange("teamSize", v)}
            options={teamSizeOptions}
            placeholder="Select team size"
            required
            error={errors.teamSize}
          />
          <FormSelect
            label="Primary Category"
            name="category"
            value={data.category}
            onChange={(v) => handleChange("category", v)}
            options={categoryOptions}
            placeholder="Select category"
            required
            error={errors.category}
          />
        </div>

        {/* Industries */}
        <MultiSelect
          label="Target Industries"
          options={industryOptions}
          selected={data.industries}
          onChange={(v) => handleChange("industries", v)}
          maxItems={6}
          required
          error={errors.industries}
        />

        {/* Navigation */}
        <div className="flex justify-end pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-black font-bold rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
          >
            Continue to Portfolio
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
