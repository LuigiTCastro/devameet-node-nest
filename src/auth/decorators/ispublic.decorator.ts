import { SetMetadata } from "@nestjs/common"; // Sets a behavior within of something.

export const IS_PUBLIC_KEY = 'isPublic';
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true)
// If IsPublic is true, the route is public.
// If IsPublic is false, the route is private.