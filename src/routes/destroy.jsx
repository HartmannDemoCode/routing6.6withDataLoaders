import { redirect } from "react-router-dom";
import { deleteContact } from "../contactFacade";

export async function action({ params }) {
  await deleteContact(params.contactId);
  throw new Error("oh dang!");
  return redirect("/");
}