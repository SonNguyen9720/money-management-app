# Quickstart: Update Sidebar Navigation

This guide describes how to verify the new sidebar navigation implementation once the tasks are completed.

## Prerequisites

1. Ensure the development server is running (`npm run dev`).
2. You must be authenticated to view the main dashboard layout.

## Verification Steps

### Desktop View

1. Open your browser and navigate to the application (e.g., `http://localhost:5173`).
2. Ensure your browser window width is at least `1024px`.
3. **Verify Removal**: Confirm the top navigation bar is no longer present.
4. **Verify Presence**: Confirm the sidebar is visible on the left side of the screen.
5. **Verify Design**: Compare the sidebar against the Google Stitch "Overview dashboard" mockup. Check for:
   - Light background (`#fbf9f8`).
   - Pill-shaped (`9999px` radius) active state indicator.
   - Correct typography and icons.
6. **Verify Functionality**: Click through the links and ensure the main content area updates correctly and the URL changes.

### Mobile View

1. Resize your browser window to less than `1024px` width, or use responsive design mode in DevTools.
2. **Verify Responsive Behavior**: Confirm the sidebar collapses or hides and is replaced by a mobile-friendly navigation mechanism (e.g., hamburger menu).
3. **Verify Functionality**: Use the mobile navigation to change routes and ensure it functions as expected.
