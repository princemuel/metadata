import { delimiter } from "@/lib/config";
import { fetchResource } from "@/lib/utils";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import type { APIRoute } from "astro";

const ONE_WEEK_IN_MINUTES = 7 * 24 * 60 * 1;

export const GET: APIRoute = async (context) => {
  const author = "Prince Muel";
  const baseUrl = new URL("/blog", context.site).toString();
  const resource = await fetchResource("posts");

  //https://openlibrary.org/developers/api
  return rss({
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
      media: "http://search.yahoo.com/mrss/",
      dc: "http://purl.org/dc/elements/1.1/",
    },
    title: `${author} ${delimiter} Blog RSS Feed`,
    description:
      "My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of my new posts",
    site: new URL("/", baseUrl),
    items: (resource ?? []).map((item) => {
      return {
        title: item.data.title,
        description: item.data.description,
        categories: item.data.tags,
        pubDate: item.data.publishedAt,
        link: new URL(`/${item.slug}`, baseUrl).toString(),
        commentsUrl: "https://github.com/princemuel/princemuel.com/discussions",
        enclosure: {
          url: new URL(item.data.media?.cover?.src || "", baseUrl).toString(),
          type: `image/${item.data.media?.cover?.format}`,
          length: 0,
        },
        customData: `
        <media:content
          url="${new URL(item.data.media?.cover?.src || "", baseUrl).toString()}"
          type="image/${item.data.media?.cover?.format}"
          width="${item.data.media?.cover?.width ?? "512"}"
          height="${item.data.media?.cover?.height ?? "512"}"
          medium="image"
        />
        <media:description type="plain">
          ${item.data.media?.coverAlt ?? ""}
        </media:description>
    `,
      } satisfies RSSFeedItem;
    }),
    customData: `
    <language>en-US</language>
    <atom:link href="${new URL("/rss.xml", baseUrl)}" rel="self"
      type="application/rss+xml" xmlns:atom="http://www.w3.org/2005/Atom"
      xmlns:content="http://purl.org/rss/1.0/modules/content/"
    />
    <image>
      <url>${new URL("/blogimage_src", baseUrl).toString()}</url>
      <title>${author} ${delimiter} Blog RSS Feed/title>
      <description>
        My Personal Website scaffolded with Astro. If you subscribe to this RSS feed, you will receive updates and summaries of my new posts
      </description>
      <link>${baseUrl}</link>
      <width>142</width>
      <height>116</height>
    </image>
    <lastBuildDate>${new Date().toISOString()}</lastBuildDate>
    <ttl>${ONE_WEEK_IN_MINUTES}</ttl>
    <generator>${context.generator}</generator>
    <dc:creator>${author}</dc:creator>
    `,
    stylesheet: "/styles.xsl",
  });
};
