import React from 'react';
import rehypeReact from 'rehype-react';
import Layout from '../components/layout';
import Services from '../components/services';
import CaseStudy from '../components/casestudy';
import QuadGrid from '../components/quadgrid';
import GridItem from '../components/griditem';
import ContentSection from '../components/contentsection';
import BlogPost from '../components/blogpost';
import SeeMoreButton from '../components/seemorebutton';
import ContactSection from '../components/contactsection';
import ContactForm from '../components/contactform';

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

export default (props) => {
  return (
    <Layout data={props.data}>
      <div>
        <span>{props.subtitle}</span>
        <ContentSection title={props.title}>{renderAst(props.intro)}</ContentSection>
      </div>
      <ContentSection title="About Us">{renderAst(props.aboutUsIntro)}</ContentSection>
      <ContentSection title="Approach">
        {renderAst(props.approachIntro)}
        <Services>
          {props.services.map((service) => {
            return (
              <GridItem key={service.title} title={service.title}>
                {renderAst(service.htmlAst)}
              </GridItem>
            );
          })}
        </Services>
      </ContentSection>
      <ContentSection title="Case Studies">
        {renderAst(props.caseStudiesIntro)}
        {props.caseStudies.map((study) => {
          return (
            <CaseStudy
              key={study.title}
              subtitle={study.subtitle}
              title={study.title}
              link={study.link}
            >
              {renderAst(study.htmlAst)}
            </CaseStudy>
          );
        })}
        <SeeMoreButton title="See More Work" />
      </ContentSection>
      <ContentSection title="Client Portfolio">
        {renderAst(props.clientPortfoliosIntro)}
        <QuadGrid>
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
          <GridItem />
        </QuadGrid>
      </ContentSection>
      <ContentSection title="Insights">
        {renderAst(props.insightsIntro)}
        <BlogPost />
        <BlogPost />
        <BlogPost />
        <SeeMoreButton title="See More Insights" />
      </ContentSection>
      <ContactSection>
        {renderAst(props.contactsIntro)}
        <ContactForm />
      </ContactSection>
    </Layout>
  );
};
