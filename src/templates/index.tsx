import React from 'react';
import rehypeReact from 'rehype-react';
import Layout from '../components/layout';
import VCard from '../components/vcard';
import CaseStudy from '../components/casestudy';
import QuadGrid from '../components/quadgrid';
import PortfolioGrid from '../components/portfoliogrid';
import GridItem from '../components/griditem';
import StandardItem from '../components/standarditem';
import ContentSection from '../components/contentsection';
import ContentImage from '../components/contentimage';
import BlogGrid from "../components/bloggrid";
import BlogPost from '../components/blogpost';
import SeeMoreButton from '../components/seemorebutton';
import ContactSection from '../components/contactsection';
import ContactForm from '../components/contactform';

import images from "../utils/images";

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

/**
 * Note, the interfaces below will eventually exist in their own
 * components, but for now are fine here.
 */
interface Insight {
  node: any;
}

 interface Service {
  title: string;
  image: any;
  htmlAst: any;
}

interface CaseStudy {
  title: string;
  subtitle: string;
  link: string;
  htmlAst: any;
  image: string;
}

interface IndexPageProps {
  services: Service[];
  caseStudies: CaseStudy[];
  insights: Insight[];
  subtitle: string;
  title: string;
  intro: any;
  aboutUsIntro: any;
  approachIntro: any;
  caseStudiesIntro: any;
  clientPortfoliosIntro: any;
  insightsIntro: any;
  contactsIntro: any;
  data?: any;
}

export default (props: IndexPageProps) => {
  return (
    <Layout data={props.data} >
      <ContentSection title={props.title} subtitle={props.subtitle} invert background="#000000" paddingTop={200} paddingBottom={200}>
        {renderAst(props.intro)}
      </ContentSection>
      <ContentSection title="About Us">
        {renderAst(props.aboutUsIntro)}
      </ContentSection>
      <ContentImage>
        <img src={require("../images/illustration.png")} alt={"Komodo at work"} />
      </ContentImage>
      <ContentSection title="Approach">
        {renderAst(props.approachIntro)}
      </ContentSection>
      <QuadGrid>
        {props.services.map((service) => {
          return (
            <GridItem key={service.title} title={service.title} image={images[`images/approach/${service.title}.png`]}>
              {renderAst(service.htmlAst)}
            </GridItem>
          );
        })}
      </QuadGrid>
      <ContentSection title="Case Studies">
        {renderAst(props.caseStudiesIntro)}
      </ContentSection>
      {props.caseStudies.map((study) => {
        return (
          <CaseStudy
            key={study.title}
            subtitle={study.subtitle}
            title={study.title}
            link={study.link}
            image={images[study.image]}
          >
            {renderAst(study.htmlAst)}
          </CaseStudy>
        );
      })}
      <SeeMoreButton title="See More Work" />
      <ContentSection title="Client Portfolio" paddingTop={0} paddingBottom={40}>
        {renderAst(props.clientPortfoliosIntro)}
      </ContentSection>
      <PortfolioGrid>
        <StandardItem imgsrc={require("../images/portfolio/CoP.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/DB.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/elanders@2x.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/gichd.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/HTL.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/ISG.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/ITV.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/Legrand.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/logo-space-group.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/Newcastle Uni.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/Northumbria uni.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/Northumbria-police logo@2x.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/onward-logo.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/Orchard.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/streetstream.png")} link="/About" />
        <StandardItem imgsrc={require("../images/portfolio/ThingCo.png")} link="/About" />
      </PortfolioGrid>
      <ContentSection title="Insights">
        {renderAst(props.insightsIntro)}
      </ContentSection>
      <BlogGrid>
      {props.insights.map((insight) => {
        return <BlogPost key={insight.node.title} slug={insight.node.slug} title={insight.node.title} image={insight.node.imageSource} />;
      })}
      </BlogGrid>
      <SeeMoreButton title="See More Insights" link={"/blog-list"} />
      <ContentSection background="#FFFFFF">
        {renderAst(props.contactsIntro)}
      </ContentSection>
      <ContactSection>
        <VCard avatar={require("../images/avatar.png")} jobtitle="Commercial Director" name="Armin Talic" email="story@vcard.com" />
        <VCard avatar={require("../images/avatar.png")} jobtitle="Director" name="Matt Moran" email="story@vcard.com" />
        <ContactForm />
      </ContactSection>
    </Layout>
  );
};
