import { revalidatePath } from "next/cache";
import { db } from "@/db/client"
import { usersTable } from "@/db/schemas"
import { eq, desc } from "drizzle-orm";
import { z } from "zod";


async function getUsers() {
  "use server";
  const rows = await db
    .select()
    .from(usersTable)
    .orderBy(desc(usersTable.id));
  return rows;
}

const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  age: z.coerce.number().int().min(0, "Age must be >= 0"),
  email: z.string().email("Invalid email"),
});

export async function createUser(formData: FormData) {
  "use server";
  const data = {
    name: (formData.get("name") ?? "").toString(),
    age: formData.get("age"),
    email: (formData.get("email") ?? "").toString(),
  };

  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await db.insert(usersTable).values(parsed.data);
  revalidatePath("/users");
}

export async function updateUser(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  const data = {
    name: (formData.get("name") ?? "").toString(),
    age: formData.get("age"),
    email: (formData.get("email") ?? "").toString(),
  };

  if (!Number.isInteger(id)) return;

  const parsed = userSchema.safeParse(data);
  if (!parsed.success) {
    console.error(parsed.error.flatten().fieldErrors);
    return;
  }

  await db
    .update(usersTable)
    .set(parsed.data)
    .where(eq(usersTable.id, id));

  revalidatePath("/users");
}

export async function deleteUser(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await db.delete(usersTable).where(eq(usersTable.id, id));
  revalidatePath("/users");
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Users</h1>
        <p className="text-sm text-gray-500">
          Create, update, and delete users from <code>users_table</code>.
        </p>
      </header>

      {/* Create */}
      <section className="rounded-2xl border p-4 space-y-3">
        <h2 className="font-medium">Create user</h2>
        <form action={createUser} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <input
            name="name"
            placeholder="Name"
            className="col-span-1 rounded-lg border p-2"
            required
          />
          <input
            name="age"
            type="number"
            placeholder="Age"
            className="col-span-1 rounded-lg border p-2"
            required
            min={0}
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="col-span-1 rounded-lg border p-2"
            required
          />
          <button
            type="submit"
            className="col-span-1 rounded-lg border bg-black text-white p-2 hover:opacity-90"
          >
            Create
          </button>
        </form>
      </section>

      {/* Table */}
      <section className="rounded-2xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Age</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td className="p-3 text-gray-500" colSpan={5}>
                  No users yet.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  {/* Inline edit form per row */}
                  <td className="p-3">
                    <form action={updateUser} className="flex gap-2 items-center">
                      <input type="hidden" name="id" value={u.id} />
                      <input
                        name="name"
                        defaultValue={u.name ?? ""}
                        className="w-40 rounded-lg border p-1"
                        required
                      />
                      <input
                        name="age"
                        type="number"
                        defaultValue={u.age ?? 0}
                        className="w-20 rounded-lg border p-1"
                        required
                        min={0}
                      />
                      <input
                        name="email"
                        type="email"
                        defaultValue={u.email ?? ""}
                        className="w-56 rounded-lg border p-1"
                        required
                      />
                      <button
                        type="submit"
                        className="rounded-lg border bg-blue-600 text-white px-3 py-1 hover:opacity-90"
                        title="Save"
                      >
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="p-3"></td>
                  <td className="p-3"></td>
                  <td className="p-3">
                    <form action={deleteUser}>
                      <input type="hidden" name="id" value={u.id} />
                      <button
                        type="submit"
                        className="rounded-lg border bg-red-600 text-white px-3 py-1 hover:opacity-90"
                        title="Delete"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
