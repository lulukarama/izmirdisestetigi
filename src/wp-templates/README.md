
# WordPress Template Components

This directory contains components that correspond to WordPress template parts:

- Header (Navbar) - Maps to header.php
- Footer - Maps to footer.php
- Single Post - Maps to single.php
- Archive - Maps to archive.php
- Page - Maps to page.php
- Sidebar - Maps to sidebar.php

When converting to WordPress, each component should be translated to its appropriate WordPress template file.

## Conversion Notes:

1. Dynamic content areas should be replaced with WordPress template tags
2. React components will need to be converted to PHP/HTML
3. React Router links should become WordPress navigation links
4. State management should be replaced with WordPress functions
5. Tailwind CSS classes can generally be preserved in a WordPress theme with the Tailwind CSS plugin

## Component to Template Mapping:

- Layout.tsx → base theme structure (header.php + footer.php)
- BlogPage.tsx → archive.php / index.php 
- BlogPost.tsx → single.php
- Index.tsx content → front-page.php / home.php
- BlogSidebar.tsx → sidebar.php

This organization makes it easier to identify which React components map to WordPress template parts.
