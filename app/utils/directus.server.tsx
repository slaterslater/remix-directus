import { createDirectus, graphql } from "@directus/sdk"

export const client = createDirectus("https://directus.pizza").with(graphql())
