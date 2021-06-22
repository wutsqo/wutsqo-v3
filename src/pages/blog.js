import * as React from "react";
import SEO from "../components/seo";
import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";
import PageHeading from "../components/heading";

const Blog = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "blog" } } }) {
        edges {
          node {
            frontmatter {
              title
              date
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
      {/* {data.allMarkdownRemark.edges.map((edge) => {
        return (
          <div className="max-w-screen-md mx-auto">
            <Link to={`/${edge.node.fields.slug}`}>
              <h4>{edge.node.frontmatter.title}</h4>
            </Link>
          </div>
        );
      })} */}
      <SEO title="Blog" />
      <PageHeading title="Blog" />
    </Layout>
  );
};

export default Blog;
