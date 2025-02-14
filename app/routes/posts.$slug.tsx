import { LoaderFunctionArgs } from "@remix-run/node"
import { json, useLoaderData } from "@remix-run/react"
import { client } from "~/utils/directus.server"

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params

  const data = await client.query(
    `
      query ($slug: String!) {
        posts(filter: { slug: { _eq: $slug } }) {
          id
          title
          description
          content
          image {
            filename_download
            description
          }
        }
      }
    `,
    { slug }
  )
  return json({ post: data.posts[0] })
}

export default function PageRoute() {
  const { post } = useLoaderData<typeof loader>()
  const { title, description, content, image } = post

  return (
    <div className="flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-16">
        <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
          {title}
        </h1>
        <p className="max-w-md">{description}</p>
        <img
          src={`https://directus.pizza/assets/${image.filename_download}`}
          alt={image.description}
        />
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className="flex flex-col items-center justify-center max-w-lg scroll gap-4 rounded-3xl border border-gray-200 p-6 dark:border-gray-700"
        />
      </div>
    </div>
  )
}
