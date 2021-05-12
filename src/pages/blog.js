import * as React from "react";

import { graphql, Link, useStaticQuery } from "gatsby";
import Layout from "../components/layout";

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
      <p className="text-4xl max-w-screen-md text-center mx-auto">
        Coming Soon
      </p>
    </Layout>
  );
};

export default Blog;
