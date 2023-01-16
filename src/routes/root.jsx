import { useEffect } from "react";
import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit} from "react-router-dom";
import { getContacts, createContact } from "../contactFacade";


export async function loader({ request}) {
  // filters requests based on input from search field. 
  // It is implemented here rather than in the action method because it is triggered from the form field with role="search" which makes a get request and not from a post (which would trigger the action method)
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}

export async function action() {
  const contact = await createContact();
  // return { contact };
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit(); // creates a submit function that can be used to submit the form
  // To show a spinner on searching.
  const searching = navigation.location && new URLSearchParams(navigation.location.search).has( "q"); //if the url has a q parameter, set to true

  // When using the backbotton, the search field is not updated with the search term. This is a workaround to update the search field with the search term from the url
  useEffect(() => {
    // We could use a controlled component here, but we'll end up with more complexity for the same behavior. We don't control the URL, the user does with the back/forward buttons. There would be more synchronization points with a controlled component.
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <div>
          </div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                console.log("currentTarget", event.currentTarget);
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, { // if not first search replace the current url on the history stack rather than adding to it again and agaain.
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite" ></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive
                        ? "active"
                        : isPending
                          ? "pending"
                          : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      {/* Below we check the navigation state to see if we're loading and then if loading we blur out the detail view, so users know not to interact with it. */}
      <div id="detail"
       className={
        navigation.state === "loading" ? "loading" : ""
      }
      >
        <Outlet />
      </div>
    </>
  );
}