"use client";

import { useState, useCallback } from "react";
import { useApplication } from "@/lib/context/ApplicationContext";
import { UploadDropzone } from "@/lib/uploadthing";
import type { PortfolioData } from "@/lib/validators/agencySchema";

interface TagInputProps {
  label: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
  required?: boolean;
  error?: string;
}

function TagInput({
  label,
  tags,
  onChange,
  placeholder = "Type and press Enter...",
  maxTags = 8,
  required,
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (tags.length < maxTags && !tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-white">
        {label}
        {required && <span className="text-secondary-accent ml-1">*</span>}
        <span className="text-gray-500 font-normal ml-2">
          ({tags.length}/{maxTags})
        </span>
      </label>
      <div
        className={`bg-white/[0.03] border  p-3 focus-within:ring-1 transition-all ${
          error
            ? "border-red-500 focus-within:ring-red-500/50"
            : "border-white/[0.06] focus-within:border-primary/50 focus-within:ring-primary/50"
        }`}
      >
        <div className="flex flex-wrap gap-2 mb-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/20 text-primary  text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="hover:text-white  transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3.5 h-3.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length >= maxTags ? `Maximum ${maxTags} items` : placeholder}
          disabled={tags.length >= maxTags}
          className="w-full bg-transparent text-white placeholder:text-gray-500 focus:outline-none disabled:opacity-50"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

interface CaseStudy {
  title: string;
  description: string;
  result: string;
  image?: string;
  link?: string;
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
  onUpdate: (index: number, data: Partial<CaseStudy>) => void;
  onRemove: (index: number) => void;
}

function CaseStudyCard({ caseStudy, index, onUpdate, onRemove }: CaseStudyCardProps) {
  return (
    <div className="border border-white/[0.06] p-5 space-y-4 relative group">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-3 right-3 p-1.5  bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="pr-8">
        <input
          type="text"
          value={caseStudy.title}
          onChange={(e) => onUpdate(index, { title: e.target.value })}
          placeholder="Project Title"
          className="w-full bg-transparent text-white font-semibold text-lg placeholder:text-gray-500 focus:outline-none border-b border-transparent focus:border-primary/50 pb-1"
        />
      </div>

      <textarea
        value={caseStudy.description}
        onChange={(e) => onUpdate(index, { description: e.target.value })}
        placeholder="Brief project description..."
        rows={2}
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 resize-none text-sm"
      />

      <input
        type="text"
        value={caseStudy.result}
        onChange={(e) => onUpdate(index, { result: e.target.value })}
        placeholder="Key result (e.g., 300% increase in conversions)"
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-primary font-semibold placeholder:text-gray-500 focus:outline-none focus:border-primary/50 text-sm"
      />

      <div className="flex gap-3">
        <input
          type="url"
          value={caseStudy.link || ""}
          onChange={(e) => onUpdate(index, { link: e.target.value })}
          placeholder="Project URL (optional)"
          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary/50 text-sm"
        />
        {caseStudy.image ? (
          <div className="relative w-16 h-10 rounded-lg overflow-hidden">
            <img
              src={caseStudy.image}
              alt="Case study"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onUpdate(index, { image: "" })}
              className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 text-white"
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
          <label className="flex items-center justify-center w-16 h-10 bg-white/[0.03] border border-white/[0.06] rounded-lg cursor-pointer hover:bg-white/[0.06] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        )}
      </div>
    </div>
  );
}

interface Testimonial {
  quote: string;
  author: string;
  company: string;
  image?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
  onUpdate: (index: number, data: Partial<Testimonial>) => void;
  onRemove: (index: number) => void;
}

function TestimonialCard({ testimonial, index, onUpdate, onRemove }: TestimonialCardProps) {
  return (
    <div className="border border-white/[0.06] p-5 space-y-4 relative group">
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="absolute top-3 right-3 p-1.5  bg-red-500/20 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/30"
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

      <textarea
        value={testimonial.quote}
        onChange={(e) => onUpdate(index, { quote: e.target.value })}
        placeholder="Client testimonial..."
        rows={3}
        className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-secondary-accent/50 resize-none"
      />

      <div className="flex gap-3">
        <input
          type="text"
          value={testimonial.author}
          onChange={(e) => onUpdate(index, { author: e.target.value })}
          placeholder="Author name"
          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-secondary-accent/50 text-sm"
        />
        <input
          type="text"
          value={testimonial.company}
          onChange={(e) => onUpdate(index, { company: e.target.value })}
          placeholder="Company"
          className="flex-1 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:border-secondary-accent/50 text-sm"
        />
      </div>
    </div>
  );
}

export function PortfolioStep() {
  const { formData, updatePortfolio, setCurrentStep, validateStep } = useApplication();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const data = formData.portfolio;

  const handleChange = useCallback(
    <K extends keyof PortfolioData>(field: K, value: PortfolioData[K]) => {
      updatePortfolio({ [field]: value });
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [updatePortfolio, errors]
  );

  const addCaseStudy = () => {
    if ((data.caseStudies?.length ?? 0) < 6) {
      handleChange("caseStudies", [
        ...data.caseStudies,
        { title: "", description: "", result: "", image: "", link: "" },
      ]);
    }
  };

  const updateCaseStudy = (index: number, updates: Partial<CaseStudy>) => {
    const newCaseStudies = [...data.caseStudies];
    newCaseStudies[index] = { ...newCaseStudies[index], ...updates };
    handleChange("caseStudies", newCaseStudies);
  };

  const removeCaseStudy = (index: number) => {
    handleChange(
      "caseStudies",
      data.caseStudies.filter((_, i) => i !== index)
    );
  };

  const addTestimonial = () => {
    if ((data.testimonials?.length ?? 0) < 3) {
      handleChange("testimonials", [
        ...(data.testimonials || []),
        { quote: "", author: "", company: "", image: "" },
      ]);
    }
  };

  const updateTestimonial = (index: number, updates: Partial<Testimonial>) => {
    const newTestimonials = [...(data.testimonials || [])];
    newTestimonials[index] = { ...newTestimonials[index], ...updates };
    handleChange("testimonials", newTestimonials);
  };

  const removeTestimonial = (index: number) => {
    handleChange(
      "testimonials",
      (data.testimonials || []).filter((_, i) => i !== index)
    );
  };

  const handleNext = () => {
    const validation = validateStep(2);
    if (validation.valid) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setErrors(validation.errors);
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="border border-white/[0.06] p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Portfolio & Services</h2>
        <p className="text-gray-400">Showcase your expertise and past work to attract the right clients.</p>
      </div>

      <div className="space-y-10">
        {/* Specialties */}
        <TagInput
          label="Specialties"
          tags={data.specialties}
          onChange={(tags) => handleChange("specialties", tags)}
          placeholder="e.g., DeFi Marketing, NFT Launches..."
          maxTags={8}
          required
          error={errors.specialties}
        />

        {/* Services */}
        <TagInput
          label="Services Offered"
          tags={data.services}
          onChange={(tags) => handleChange("services", tags)}
          placeholder="e.g., Content Strategy, SEO Audit..."
          maxTags={10}
          required
          error={errors.services}
        />

        {/* Case Studies */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-white">
                Case Studies
                <span className="text-gray-500 font-normal ml-2">
                  ({data.caseStudies.length}/6)
                </span>
              </label>
              <p className="text-gray-500 text-sm mt-1">
                Showcase your best work with measurable results
              </p>
            </div>
            <button
              type="button"
              onClick={addCaseStudy}
              disabled={data.caseStudies.length >= 6}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full hover:bg-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add Case Study
            </button>
          </div>

          {data.caseStudies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.caseStudies.map((caseStudy, index) => (
                <CaseStudyCard
                  key={index}
                  caseStudy={caseStudy}
                  index={index}
                  onUpdate={updateCaseStudy}
                  onRemove={removeCaseStudy}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/20  p-8 text-center">
              <p className="text-gray-500 text-sm">
                No case studies yet. Add your best work to showcase your expertise.
              </p>
            </div>
          )}
        </div>

        {/* Portfolio Images */}
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-white">
            Portfolio Gallery
            <span className="text-gray-500 font-normal ml-2">(Optional)</span>
          </label>
          <UploadDropzone
            endpoint="portfolioImages"
            onClientUploadComplete={(res) => {
              if (res) {
                const newImages = res.map((file) => file.ufsUrl);
                handleChange("portfolioImages", [
                  ...(data.portfolioImages || []),
                  ...newImages,
                ]);
              }
            }}
            onUploadError={(error: Error) => {
              console.error("Upload error:", error);
            }}
            className="ut-button:bg-secondary-accent ut-button:text-white ut-button:hover:bg-secondary-accent/90 ut-label:text-gray-400 ut-allowed-content:text-gray-500 border-white/[0.06] bg-white/5"
          />
          {data.portfolioImages && data.portfolioImages.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {data.portfolioImages.map((image, index) => (
                <div key={index} className="relative group w-24 h-24">
                  <img
                    src={image}
                    alt={`Portfolio ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleChange(
                        "portfolioImages",
                        data.portfolioImages?.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 text-white"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Testimonials */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-semibold text-white">
                Client Testimonials
                <span className="text-gray-500 font-normal ml-2">
                  ({data.testimonials?.length ?? 0}/3)
                </span>
              </label>
              <p className="text-gray-500 text-sm mt-1">
                Add testimonials from satisfied clients
              </p>
            </div>
            <button
              type="button"
              onClick={addTestimonial}
              disabled={(data.testimonials?.length ?? 0) >= 3}
              className="flex items-center gap-2 px-4 py-2 bg-secondary-accent/20 text-secondary-accent rounded-full hover:bg-secondary-accent/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Add Testimonial
            </button>
          </div>

          {data.testimonials && data.testimonials.length > 0 ? (
            <div className="space-y-4">
              {data.testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                  onUpdate={updateTestimonial}
                  onRemove={removeTestimonial}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-white/20  p-8 text-center">
              <p className="text-gray-500 text-sm">
                No testimonials yet. Add client feedback to build trust.
              </p>
            </div>
          )}
        </div>

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
            Continue to Pricing
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




