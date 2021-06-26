import { graphql } from "gatsby";
import React from "react";
import PageHeading from "../components/heading";
import Layout from "../components/layout";
import SEO from "../components/seo";
import { Disqus } from "gatsby-plugin-disqus";

export const query = graphql`
  query($slug: String!) {
    markdownRemark(
      fields: { slug: { eq: $slug }, collection: { eq: "blog" } }
    ) {
      frontmatter {
        title
        date(formatString: "DD MMM YYYY")
        author
        tags
      }
      html
      timeToRead
    }
  }
`;

const Blog = ({ data }) => {
  return (
    <Layout
      frontmatter={data.markdownRemark.frontmatter}
      timeToRead={data.markdownRemark.timeToRead}
    >
      <SEO title={data.markdownRemark.frontmatter.title} />
      <div className="max-w-screen-sm mx-auto pt-12">
        <PageHeading
          title={data.markdownRemark.frontmatter.title}
          align="left"
        />
        <div className="font-light">
          {data.markdownRemark.frontmatter.date}&nbsp;•&nbsp;
          {data.markdownRemark.timeToRead} min read
        </div>
        <hr className="my-4" />
        <div
          className="mt-5 py-8 prose md:prose-lg dark:prose-dark prose-quoteless"
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        ></div>
        <div className="mt-5">
          <Disqus />
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
