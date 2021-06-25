import { graphql } from "gatsby";
import React from "react";
import PageHeading from "../components/heading";
import Layout from "../components/layout";
import SEO from "../components/seo";

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "blog" } }
    ) {
      frontmatter {
        title
        date
        author
      }
      html
      timeToRead
    }
  }
`;

const Blog = (props) => {
  return (
    <Layout
      frontmatter={props.data.markdownRemark.frontmatter}
      timeToRead={props.data.markdownRemark.timeToRead}
    >
      <SEO title={props.data.markdownRemark.frontmatter.title} />
      <PageHeading title={props.data.markdownRemark.frontmatter.title} />
      <div
        className="mt-5 max-w-screen-sm mx-auto prose md:prose-lg dark:prose-dark prose-quoteless"
        dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}
      ></div>
      <div className="mt-5 max-w-screen-md mx-auto"></div>
    </Layout>
  );
};

export default Blog;
