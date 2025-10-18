// For CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// For global CSS imports (no typings)
declare module "*.css";
