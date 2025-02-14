import { json, type MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { client } from "~/utils/directus.server"

export const meta: MetaFunction = () => {
  return [
    { title: "Remix & Directus" },
    { name: "description", content: "Potential Stack" },
  ]
}

type Post = {
  id: string
  title: string
  slug: string
}

export const loader = async () => {
  const data = await client.query(`
    query {
      posts {
        id
        title
        slug
      }
    }
  `)
  return json({ posts: data.posts })
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>()

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only">Remix</span>
          </h1>
          <div className="h-[144px] w-[434px]">
            <img
              src="/logo-light.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
            <img
              src="/logo-dark.png"
              alt="Remix"
              className="hidden w-full dark:block"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Directus Pizza Posts
          </p>
          <ul>
            {posts.map(({ id, title, slug }: Post) => (
              <li key={id}>
                <Link
                  className="group flex items-center gap-3 self-stretch p-3 leading-normal text-blue-700 hover:underline dark:text-blue-500"
                  to={`/posts/${slug}`}
                  prefetch="intent"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
