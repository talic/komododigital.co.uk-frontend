import React from 'react';
import { graphql } from 'gatsby';
import CleanSourceURL from '../utils/clean-source-url';
import Blog from '../templates/blog';

export default (props) => {
  const source_url = props.data.allWordpressPost.edges[0].node.featured_media
    ? props.data.allWordpressPost.edges[0].node.featured_media.source_url
    : null;
  let imageSource = '';

  if (source_url) {
    imageSource = CleanSourceURL(source_url);
  }

  const html = CleanSourceURL(props.data.allWordpressPost.edges[0].node.content);

  const hocProps = {
    html,
    imageSource,
    ...props,
  };

  return <Blog {...hocProps} />;
};

export const blogQuery = graphql`
  query blogQuery($slug: String) {
    site {
      siteMetadata {
        name
        title
        description
      }
    }
    allWordpressPost(limit: 1, filter: { slug: { eq: $slug } }) {
      edges {
        node {
          status
          slug
          title
          date
          content
          featured_media {
            source_url
          }
        }
      }
    }
  }
`;
