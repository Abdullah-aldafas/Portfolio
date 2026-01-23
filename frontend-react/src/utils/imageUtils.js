import API_BASE_URL from '../apiConfig';

/**
 * Helper to get the correct image URL from backend data.
 * Handles:
 * 1. Absolute URLs (http/https)
 * 2. Relative paths (starts with /) -> prepends API_BASE_URL
 * 3. Fallback to image_url (text field)
 * 4. Default placeholder
 * 
 * @param {string|null} imagePath - The 'image' field from API (usually File path)
 * @param {string|null} imageUrl - The 'image_url' field from API (text URL)
 * @returns {string} - The valid image source URL
 */
export const getImageUrl = (imagePath, imageUrl) => {
    // 1. Try the direct image path (uploaded file)
    if (imagePath) {
        // If it's already an absolute URL (http/https), return it
        if (imagePath.startsWith('http') || imagePath.startsWith('https')) {
            return imagePath;
        }

        // If it represents a relative path (starts with /), prepend API_BASE_URL
        // remove trailing slash from base if present to be safe
        const cleanBase = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

        if (imagePath.startsWith('/')) {
            return `${cleanBase}${imagePath}`;
        }

        // If it's just a filename (unlikely properly from DRF but possible), assume /media/ ??
        // Safer to just prepend base
        return `${cleanBase}/${imagePath}`;
    }

    // 2. Fallback to image_url (text field)
    if (imageUrl) {
        return imageUrl;
    }

    // 3. Default placeholder
    return 'https://via.placeholder.com/300?text=No+Image';
};
