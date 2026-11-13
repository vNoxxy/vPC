/** The files of public/documents, listed when the site is built (see the `documents` plugin in vite.config.ts). */
declare module "virtual:documents" {
  const files: { path: string; size: number }[];
  export default files;
}
