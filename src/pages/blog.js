import * as React from "react";
import SEO from "../components/seo";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import PageHeading from "../components/heading";
import FadeWhenVisible from "../components/animation/fadewhenvisible";

const PostCard = ({
  title,
  date,
  slug,
  minutesRead,
  excerpt,
  color,
  draft,
}) => {
  return (
    <div
      className="w-full h-full p-8 text-left flex flex-col 
      justify-between rounded border-2 border-pink-200 dark:border-pink-700"
    >
      <h1 className="text-3xl text-black dark:text-white">{title}</h1>
      <p className="text-base text-black dark:text-white">
        {!draft ? (
          <div>
            <Link to={`/${slug}`} className="hover:text-pink-500">
              read more
            </Link>
          </div>
        ) : (
          <div>coming soon</div>
        )}
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
              draft
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
      <div className="max-w-screen-lg mx-auto gap-1 px-4 grid grid-cols-1 md:grid-cols-2 justify-between">
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
                  draft={edge.node.frontmatter.draft}
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
