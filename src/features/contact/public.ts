/**
 * Public surface of the `contact` shared feature.
 * Other features may import only from this module — keeps the surface unpluggable.
 */
export { ContactForm } from "./components/contact-form";
export { ContactFormDrawer } from "./components/contact-form-drawer";
export type { ContactSourceId } from "./constants/contact-form";
