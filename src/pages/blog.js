import * as React from "react";
import SEO from "../components/seo";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import PageHeading from "../components/heading";
import FadeWhenVisible from "../components/animation/fadewhenvisible";

const PostCard = ({ title, date, slug, minutesRead, excerpt, color }) => {
  return (
    <div
      className="w-full h-full p-8 text-center flex flex-col justify-between"
      style={{ backgroundColor: color }}
    >
      <h1 className="text-4xl text-black dark:text-white">{title}</h1>
      <p className="italic">{excerpt}</p>
      <p className="text-base text-black dark:text-white">
        {date} &nbsp; • &nbsp; {minutesRead} min read &nbsp; • &nbsp;{" "}
        <Link to={`/${slug}`} className="underline">
          read more
        </Link>
      </p>
    </div>
  );
};

const Blog = () => {
  const colors = ["#EDAE49", "#D1495B", "#00798C"];
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: { fields: { collection: { eq: "blog" } } }
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            frontmatter {
              title
              date(formatString: "DD MMM YYYY")
              excerpt
            }
            excerpt
            fields {
              slug
            }
            timeToRead
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Posts" />
      <PageHeading title="Posts" />
      <div className="w-full mx-auto gap-1 px-4 grid grid-cols-1 md:grid-cols-2 justify-between">
        {data.allMarkdownRemark.edges.map((edge, i) => {
          return (
            <div className="w-full h-56">
              <FadeWhenVisible>
                <PostCard
                  title={edge.node.frontmatter.title}
                  date={edge.node.frontmatter.date}
                  slug={edge.node.fields.slug}
                  minutesRead={edge.node.timeToRead}
                  excerpt={edge.node.frontmatter.excerpt || edge.node.excerpt}
                  color={colors[i % colors.length]}
                />
              </FadeWhenVisible>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Blog;
