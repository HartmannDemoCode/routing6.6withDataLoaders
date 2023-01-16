# Final Frontend Template for react apps with JS
- Followed this tutorial: https://reactrouter.com/en/main/start/tutorial
## Installed
- `npm install react-router-dom localforage match-sorter sort-by`

## React Router 
Version > 6.4  
### Loaders
- Loads data before we render the component
- Then no need for useEffect to load data
- 
 
### Files
- `main.jsx` - Main file with `createBrowserRouter` and all the routes
- `index.css` - Main css file 
- `index.html` - Main html file: DO NOT TOUCH
- `contactFacade.js` - Facade for contacts with methods for CRUD operations.
- `error-page.jsx` - General Error page component used inside `main.jsx` that uses hook: useRouteError() to get any error from the routes.
- `routes:`
  - `root.jsx` - The base page component from which all other pages are rendered through Outlet. This page contains the navbar, the new button and the search field.
  - `contact.jsx` - Contact page component export both Contact (default) and loader: `getContact(params.contactId);` from the contactFacade.
  - `index.jsx` - Index page component used as a child to Root component if nothing else is rendered (the default page).
  - `edit.jsx` - Edit page component export both EditContact Form (default) and action `updateContact(contact);` from the contactFacade.
  - `destroy.jsx` - Destroy page component only export action `deleteContact(contactId);` from the contactFacade. And then does a redirect to the index page.# repo auto created
