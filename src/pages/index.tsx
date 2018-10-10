import React from 'react';
import { graphql } from 'gatsby';
import Index from '../templates/index';
import path from 'path';

const findNodes = (keyToFind, props, valueToFind = null) => {
  if (typeof valueToFind === 'string') {
    return props.data.allMarkdownRemark.edges.filter(
      (edge) => edge.node.frontmatter[keyToFind] === valueToFind,
    ).map(edge => {
      return {
        ...edge.node,
        ...edge.node.frontmatter,
      };
    });
  } else {
    return props.data.allMarkdownRemark.edges.filter(
      (edge) => path.basename(edge.node.fileAbsolutePath) === keyToFind,
    );
  }
};

const findNode = (keyToFind, props) => {
  const elements = findNodes(keyToFind, props);
  return elements[0].node;
};

export default (props) => {
  // Basename is the top level, should have sections
  // Use sections to pull out sub content in order
  const rootNode = findNode('index.md', props);
  const aboutUs = findNode('about_us.md', props);
  const approach = findNode('approach.md', props);
  const services = findNodes('group', props, 'Services');
  const caseStudiesIntro = findNode('case_studies.md', props);
  const caseStudies = findNodes('group', props, 'CaseStudies');

  const hocProps = {
    subtitle: rootNode.frontmatter.subtitle,
    title: rootNode.frontmatter.title,
    intro: rootNode.htmlAst,
    aboutUs: aboutUs.htmlAst,
    approach: approach.htmlAst,
    services,
    caseStudiesIntro: caseStudiesIntro.htmlAst,
    caseStudies,
    ...props,
  };

  return <Index {...hocProps} />;
};

export const pageQuery = graphql`
  query pageQuery {
    site {
      siteMetadata {
        name
        title
        description
      }
    }
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/index/" } }) {
      edges {
        node {
          htmlAst
          frontmatter {
            title
            subtitle
            group
          }
          fileAbsolutePath
        }
      }
    }
  }
`;
