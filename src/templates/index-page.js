import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { Helmet } from "react-helmet"
import Layout from '../components/Layout'
import SupportBanner from '../components/SupportBanner'
import Header from '../components/Header'
import HeaderVideo from '../components/HeaderVideo'
import metadata from '../content/site-metadata.json'
import Mainpitch from '../components/Mainpitch'
import SecondaryMainpitch from '../components/SecondaryMainpitch'
import Features from '../components/Features'
import NewsletterSubscribe from '../components/NewsletterSubscribe'

export const IndexPageTemplate = ({
  seo,
  header,
  mainpitch,
  secondarymainpitch,
  features
}) => (
    <div>
      {seo &&
        <Helmet title={seo.title ? seo.title : metadata.siteMetadata.title} titleTemplate={metadata.siteMetadata.titleTemplate}>
          {seo.description && <meta name="description" content={seo.description} />}
          {seo.image && seo.url && <meta name="image" content={`${seo.url}${seo.image.publicURL}`} />}
          {seo.url && <meta property="og:url" content={seo.url} />}
          {seo.title && <meta property="og:title" content={seo.title} />}
          {seo.description && (
            <meta property="og:description" content={seo.description} />
          )}
          {seo.image && seo.url && <meta property="og:image" content={`${seo.url}${seo.image.publicURL}`} />}
          <meta name="twitter:card" content="summary" />
          {seo.twitterUsername && (
            <meta name="twitter:creator" content={seo.twitterUsername} />
          )}
          {seo.title && <meta name="twitter:title" content={seo.title} />}
          {seo.description && (
            <meta name="twitter:description" content={seo.description} />
          )}
          {seo.image && seo.url && <meta name="twitter:image" content={`${seo.url}${seo.image.publicURL}`} />}
        </Helmet>
      }
      {/*<Header title={header.title} subTitle={header.subTitle} image={header.image} buttons={header.buttons} display={header.display} />*/}
      <HeaderVideo />
      <Mainpitch mainpitch={mainpitch} />
      <Features features={features} />   
    </div>
  )

IndexPageTemplate.propTypes = {
  seo: PropTypes.object,
  header: PropTypes.object,
  mainpitch: PropTypes.object,
  secondarymainpitch: PropTypes.object,
  features: PropTypes.object,
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate
        seo={frontmatter.seo}
        header={frontmatter.header}
        mainpitch={frontmatter.mainpitch}
        secondarymainpitch={frontmatter.secondarymainpitch}
        features={frontmatter.features}
      />
      <NewsletterSubscribe />
      <SupportBanner />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default IndexPage

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        seo {
          title
          description
          url
          image {
            childImageSharp {
              fluid(maxWidth: 640, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
            publicURL            
          }
          twitterUsername
        }
        header {
          display
          title
          subTitle {
            text
          }          
          buttons {
            text
            link
          }
        }                
        mainpitch {
          display
          title          
          description {
            text
          }
        }               
        secondarymainpitch {
          display
          title          
          description {
            text
          }
        }
        features {
          display
          title
          rows {            
            title
            text
          }
        }
      }
    }
  }
`
