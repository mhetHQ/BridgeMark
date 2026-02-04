import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Agency logo upload
  agencyLogo: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => {
      // Add auth check here if needed
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Logo uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  // Agency cover image upload
  agencyCover: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Cover uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  // Portfolio images (multiple)
  portfolioImages: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Portfolio image uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  // Case study images
  caseStudyImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Case study image uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),

  // Testimonial author images
  testimonialImage: f({ image: { maxFileSize: "1MB", maxFileCount: 1 } })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Testimonial image uploaded:", file.ufsUrl);
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
